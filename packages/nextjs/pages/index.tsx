import type { NextPage } from "next";
import { ethers } from "ethers";
import React,{ useState, useEffect } from "react";
import { WalletIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { 
  useScaffoldContractRead,
  useDeployedContractInfo,
  useScaffoldContractWrite,
  useScaffoldEventSubscriber
} from "~~/hooks/scaffold-eth";
import { useAccount, Chain, useNetwork, useSwitchNetwork } from 'wagmi';
import { PeepsCards } from "~~/components/assets/PeepsCards";
import { Spinner } from "~~/components/Spinner";
import { toast } from "react-hot-toast";
import * as chains from "wagmi/chains";

const Home: NextPage = () => {
  const [isOnlyYoursActive, setIsOnlyYoursActive] = useState(false);
  const [sortingValue, setSortingValue] = useState("All");
  const [ownedTokenIds, setOwnedTokenIds] = useState<any[]>();
  const [peepsOwned, setPeepsOwned] = useState<any[]>();
  const [ownedtokenURIs, setOwnedtokenURIs] = useState<any[]>();

  const {address: signer} = useAccount();
  const { isLoading: isLoadingPeepsContract } = useDeployedContractInfo("Peeps");
  const { chain } = useNetwork();
  const { chains: switchChains, switchNetwork } = useSwitchNetwork();

  const { data: mintingFee } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "mintingFee",
  });

  const { data: peeps } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "getPeeps",
  });

  const { data: owners } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "allOwners",
  });

  const { data: tokenURIs } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "allTokenURI",
  });

  const { data: mintedPeeps } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "getMintedPeeps",
  });

  const { data: funds } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "funds",
    args: [signer],
  });

  const { writeAsync: mint, isLoading: mintLoading } = useScaffoldContractWrite({
    contractName: "Peeps",
    functionName: "mint",
    value: ethers.utils.formatEther(mintingFee?.toString() || 0),
  });

  const { writeAsync: withdrawFunds, isLoading: withdrawFundsLoading } = useScaffoldContractWrite({
    contractName: "Peeps",
    functionName: "withdrawFunds",
  });

  const tokenIds = Array.from({length: peeps?.length || 0}, (_, i) => i + 1);

  const getPeepsAlive = () => {
    let peepsAlive = 0;
    if (!mintedPeeps) return peepsAlive;

    let peep;
    let id;
    const timeNow = Date.now()/1000;
    for (let i=0; i < 20; i++) {
      id = mintedPeeps?.[i].toNumber();
      if (id === 0) continue;
      peep = peeps?.[id-1];
      if (peep?.oldTime === undefined) continue;
      if (timeNow < peep?.oldTime) {
        peepsAlive++;
      }
    }
    return peepsAlive;
  }

  const getEarliestDeath = () => {
    if (!mintedPeeps) return "Loading...";
    let id = mintedPeeps?.[0].toNumber();
    if (id === 0) return "Loading...";
    let peep = peeps?.[id-1];
    let earliestDeath = peep?.oldTime;
    if (earliestDeath === undefined) return "Loading...";
    for (let i=1; i < 20; i++) {
      id = mintedPeeps?.[i].toNumber();
      if (id === 0) continue;
      peep = peeps?.[id-1];
      if (peep?.oldTime === undefined) continue;
      if (earliestDeath > peep?.oldTime) {
        earliestDeath = peep?.oldTime;
      }
    }
    return getTime(earliestDeath);
  }

  const getTime = (time: number) : string => {
    var a = new Date(time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var formattedTime = hour + ':' + min + ':' + sec + ' ' + date + ' ' + month + ' ' + year ;
    return formattedTime;
  };

  const getShortAddress = (addressLong: string) : string => {
    let addressShort = "";
    for (let i = 0; i < 6; i++) {
      addressShort += addressLong[i];
    }
    addressShort += "...";
    for (let i = 38; i < 42; i++) {
      addressShort += addressLong[i];
    }
    return addressShort;
  }

  const toggleRadio = () => {
    setIsOnlyYoursActive(!isOnlyYoursActive);
  };

  useEffect(() => {
    if (!owners || !peeps || !tokenURIs) return;
    let tokenIdsTemp = [];
    let peepsTemp = [];
    let tokenURIsTemp = [];
    const timeNow = Date.now()/1000;
    if (isOnlyYoursActive) {
      for (let i=0; i < owners?.length; i++) {
        if (owners[i] === signer) {
          if (sortingValue === "All") {          
            peepsTemp.push(peeps[i]);
            tokenURIsTemp.push(tokenURIs[i]);
            tokenIdsTemp.push(i+1);
          } else if (
            sortingValue === "Breadable" && 
            peeps[i].kidTime < timeNow && 
            peeps[i].adultTime > timeNow &&
            peeps[i].breedCount < 3) {
              peepsTemp.push(peeps[i]);
              tokenURIsTemp.push(tokenURIs[i]);
              tokenIdsTemp.push(i+1);
          } else if (
            sortingValue === "Kids" && 
            peeps[i].kidTime > timeNow) {
              peepsTemp.push(peeps[i]);
              tokenURIsTemp.push(tokenURIs[i]);
              tokenIdsTemp.push(i+1);
          } else if (
            sortingValue === "Adults" && 
            peeps[i].kidTime < timeNow && 
            peeps[i].adultTime > timeNow) {
              peepsTemp.push(peeps[i]);
              tokenURIsTemp.push(tokenURIs[i]);
              tokenIdsTemp.push(i+1);
          } else if (
            sortingValue === "Old" && 
            peeps[i].adultTime < timeNow && 
            peeps[i].oldTime > timeNow) {
              peepsTemp.push(peeps[i]);
              tokenURIsTemp.push(tokenURIs[i]);
              tokenIdsTemp.push(i+1);
          } else if (
            sortingValue === "Buried" && 
            peeps[i].isBuried) {
              peepsTemp.push(peeps[i]);
              tokenURIsTemp.push(tokenURIs[i]);
              tokenIdsTemp.push(i+1);
          } else if (
            sortingValue === "Dead" && 
            !peeps[i].isBuried && 
            peeps[i].oldTime < timeNow) {
              peepsTemp.push(peeps[i]);
              tokenURIsTemp.push(tokenURIs[i]);
              tokenIdsTemp.push(i+1);
          }
        }
      }
    } else {
      for (let i=0; i < owners?.length; i++) {
        if (
          sortingValue === "Breadable" && 
          peeps[i].kidTime < timeNow && 
          peeps[i].adultTime > timeNow &&
          (peeps[i].breedingAllowed || 
          owners[i] === signer) && 
          peeps[i].breedCount < 3) {
            peepsTemp.push(peeps[i]);
            tokenURIsTemp.push(tokenURIs[i]);
            tokenIdsTemp.push(i+1);
        } else if (
          sortingValue === "Kids" && 
          peeps[i].kidTime > timeNow) {
            peepsTemp.push(peeps[i]);
            tokenURIsTemp.push(tokenURIs[i]);
            tokenIdsTemp.push(i+1);
        } else if (
          sortingValue === "Adults" && 
          peeps[i].kidTime < timeNow && 
          peeps[i].adultTime > timeNow) {
            peepsTemp.push(peeps[i]);
            tokenURIsTemp.push(tokenURIs[i]);
            tokenIdsTemp.push(i+1);
        } else if (
          sortingValue === "Old" && 
          peeps[i].adultTime < timeNow && 
          peeps[i].oldTime > timeNow) {
            peepsTemp.push(peeps[i]);
            tokenURIsTemp.push(tokenURIs[i]);
            tokenIdsTemp.push(i+1);
        } else if (
          sortingValue === "Buried" && 
          peeps[i].isBuried) {
            peepsTemp.push(peeps[i]);
            tokenURIsTemp.push(tokenURIs[i]);
            tokenIdsTemp.push(i+1);
        } else if (
          sortingValue === "Dead" && 
          !peeps[i].isBuried && 
          peeps[i].oldTime < timeNow) {
            peepsTemp.push(peeps[i]);
            tokenURIsTemp.push(tokenURIs[i]);
            tokenIdsTemp.push(i+1);
        }
      }
    }
    setPeepsOwned(peepsTemp);
    setOwnedtokenURIs(tokenURIsTemp);
    setOwnedTokenIds(tokenIdsTemp);
  }, [isLoadingPeepsContract, peeps, signer, isOnlyYoursActive, tokenURIs, sortingValue]);

  useScaffoldEventSubscriber({
    contractName: "Peeps",
    eventName: "Mint",
    listener: (minter, tokenId) => {
      if (minter === signer) {
        toast("Peep #" + tokenId.toString() + " is here!", 
        {
          className: "w-[250px] h-[80px] bg-success rounded-3xl shadow-xl border-green-400 border-2 px-7 py-5",
          icon: "🚀",
          position: "bottom-right",
          style: {
            padding: "20px",
            background: '#7dfa9f',
          }
        })
      }
    },
  });

  useScaffoldEventSubscriber({
    contractName: "Peeps",
    eventName: "NameChanged",
    listener: (sender, tokenId, name) => {
      if (sender === signer) {
        toast(
          "Peep #" + tokenId.toString() + 
          "'s name is now " + name + "!",
        {
          className: "w-[300px] h-[80px] bg-success rounded-3xl shadow-xl border-green-400 border-2 px-7 py-5",
          icon: "👶",
          position: "bottom-right",
          style: {
            padding: "20px",
            background: '#7dfa9f',
          }
        })
      }
    },
  });

  useScaffoldEventSubscriber({
    contractName: "Peeps",
    eventName: "Breed",
    listener: (sender, tokenId1, tokenId2, kidId) => {
      if (sender === signer) {
        toast(
          peeps?.[tokenId1.toNumber()-1].peepName +
          " and " + peeps?.[tokenId2.toNumber()-1].peepName + 
          " made Peep #" + kidId.toString() + "!", 
        {
          className: "w-[300px] h-[80px] bg-success rounded-3xl shadow-xl border-green-400 border-2 px-7 py-5",
          icon: "💕",
          position: "bottom-right",
          style: {
            padding: "20px",
            background: '#7dfa9f',
          }
        })
      }
    },
  });

  useScaffoldEventSubscriber({
    contractName: "Peeps",
    eventName: "GiftHat",
    listener: (sender, giverId, receiverId) => {
      if (sender === signer || 
        owners?.[giverId.toNumber()-1] === signer || 
        owners?.[receiverId.toNumber()-1] === signer
      ) {
        toast(
          peeps?.[giverId.toNumber()-1].peepName +
          " gifted a hat to " + peeps?.[receiverId.toNumber()-1].peepName + "!", 
        {
          className: "w-[300px] h-[80px] bg-success rounded-3xl shadow-xl border-green-400 border-2 px-7 py-5",
          icon: "🎩",
          position: "bottom-right",
          style: {
            padding: "20px",
            background: '#7dfa9f',
          }
        })
      }
    },
  });

  useScaffoldEventSubscriber({
    contractName: "Peeps",
    eventName: "Buried",
    listener: (sender, tokenId) => {
      if (sender === signer) {
        toast(
          "You buried " + peeps?.[tokenId.toNumber()-1].peepName, 
        {
          className: "w-[300px] h-[80px] bg-success rounded-3xl shadow-xl border-green-400 border-2 px-7 py-5",
          icon: "🪦",
          position: "bottom-right",
          style: {
            padding: "20px",
            background: '#7dfa9f',
          }
        })
        return;
      }
      if (owners?.[tokenId.toNumber()-1] === signer) {
        toast(
          getShortAddress(sender) + " buried " + peeps?.[tokenId.toNumber()-1].peepName, 
        {
          className: "w-[330px] h-[80px] bg-success rounded-3xl shadow-xl border-green-400 border-2 px-7 py-5",
          icon: "🪦",
          position: "bottom-right",
          style: {
            padding: "20px",
            background: '#7dfa9f',
          }
        })
      }
    },
  });

  useScaffoldEventSubscriber({
    contractName: "Peeps",
    eventName: "FundsWithdrawn",
    listener: (sender, amount) => {
      if (sender === signer) {
        toast(
          "You withdrew" + ethers.utils.formatEther(amount) + " MATIC!", 
        {
          className: "w-[300px] h-[80px] bg-success rounded-3xl shadow-xl border-green-400 border-2 px-7 py-5",
          icon: "🤑",
          position: "bottom-right",
          style: {
            padding: "20px",
            background: '#7dfa9f',
          }
        })
      }
    },
  });

  return (
    <>
      <MetaHeader/>
      <div className="flex items-center flex-col flex-grow pt-5">
        <h2 className="text-[1.8rem] md:text-[2.5rem] text-center h-16 md:h-20">Mint a unique Peep! <br/>
        They will grow, get old and die!
        </h2>        
        <p className="text-md md:text-xl mt-2 text-center max-w-lg">
          There {getPeepsAlive() === 1 ? "is" : "are"} {getPeepsAlive()} minted peep{getPeepsAlive() === 1 ? "" : "s"} alive. You can mint {20 - getPeepsAlive()} more
        </p>
        {getPeepsAlive() === 20 &&
        (
        <div className="tooltip tooltip-info" data-tip={`The earliest death: ${getEarliestDeath()}`}>
        <button 
          className="btn" 
          disabled={true}
        >           
          mint a Peep for {ethers.utils.formatEther(mintingFee || 0)} MATIC 
        </button>
        </div> 
        )}
        {getPeepsAlive() < 20 &&
        (
        <button 
          className="btn btn-success " 
          disabled={mintLoading || isLoadingPeepsContract}
          onClick={async () => await mint()}
        >           
        {(mintLoading || isLoadingPeepsContract) && (
        <>
          <Spinner/>
        </>
        )}
        {(!mintLoading && !isLoadingPeepsContract) && (
        <>        
          mint a Peep for {ethers.utils.formatEther(mintingFee || 0)} MATIC       
        </>
        )}
        </button>
        )}

        <div className="mb-3 mt-10 justify-center items-center flex flex-row items-start gap-5">
          <input
            type="radio" 
            name="AllOrYours" 
            className="radio flex border-2 border-green-500" 
            value="All" 
            checked={!isOnlyYoursActive}
            onChange={toggleRadio}
          />
          <label>All</label>
          <input 
            type="radio" 
            name="AllOrYours" 
            className="radio flex border-2 border-green-500" 
            value="Yours" 
            checked={isOnlyYoursActive}
            onChange={toggleRadio}
          />
          <label>Yours</label>

          <select
            value={sortingValue}
            onChange={e => setSortingValue(e.target.value)}
            className="select select-bordered bg-primary-500 input-sm w-[120px] flex border-2 border-green-500 focus:outline-none shadow"
          >
          <option value="All">All</option>
          <option value="Breadable">Breadable</option>
          <option value="Kids">Kids</option>
          <option value="Adults">Adults</option>
          <option value="Old">Old</option>
          <option value="Dead">Dead</option>
          <option value="Buried">Buried</option>
          </select>
        </div>        
        
        {!isOnlyYoursActive &&
         sortingValue === "All" &&
        (
        <PeepsCards tokenIds={tokenIds} peepsOwned={peeps} allPeeps={peeps} owners={owners} tokenURIs={tokenURIs} whose="All"/>
        )}

        {!isOnlyYoursActive &&
         sortingValue === "Breadable" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="All breadable"/>
        )}

        {!isOnlyYoursActive &&
         sortingValue === "Kids" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="All kid"/>
        )}

        {!isOnlyYoursActive &&
         sortingValue === "Adults" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="All adult"/>
        )}

        {!isOnlyYoursActive &&
         sortingValue === "Old" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="All old"/>
        )}

        {!isOnlyYoursActive &&
         sortingValue === "Dead" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="All dead"/>
        )}

        {!isOnlyYoursActive &&
         sortingValue === "Buried" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="All buried"/>
        )}

        {isOnlyYoursActive &&
         sortingValue === "All" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="Your"/>
        )}

        {isOnlyYoursActive &&
         sortingValue === "Breadable" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="Your breadable"/>
        )}

        {isOnlyYoursActive &&
         sortingValue === "Kids" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="Your kid"/>
        )}

        {isOnlyYoursActive &&
         sortingValue === "Adults" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="Your adult"/>
        )}

        {isOnlyYoursActive &&
         sortingValue === "Old" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="Your old"/>
        )}

        {isOnlyYoursActive &&
         sortingValue === "Dead" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="Your dead"/>
        )}

        {isOnlyYoursActive &&
         sortingValue === "Buried" &&
        (
        <PeepsCards tokenIds={ownedTokenIds} peepsOwned={peepsOwned} allPeeps={peeps} owners={owners} tokenURIs={ownedtokenURIs} whose="Your buried"/>
        )}   

        {funds &&
        funds.gt(0) &&
        (
        <div>
        <form className="w-[370px] bg-green-300 border-green-400 rounded-3xl shadow-xl p-2 px-7 py-5 mt-10">
        <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Available funds: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {ethers.utils.formatEther(funds)} MATIC
          </span>    

          <div className="mt-3 flex flex-col items-center py-2">
          <button
            type="button"
            disabled={withdrawFundsLoading || isLoadingPeepsContract}             
            onClick={async () => {
              await withdrawFunds();
            }}
            className={"btn btn-success w-1/3 flex items-center"}
          >
            {(withdrawFundsLoading || isLoadingPeepsContract) && (
            <>
              <Spinner/>
            </>
            )}
            {(!withdrawFundsLoading && !isLoadingPeepsContract) && (
              <WalletIcon className="w-8 h-8 mt-0.5"/>
            )} 
          </button>
          </div> 
        </form>
        </div>
        )} 


        
      </div>
    </>
  );
};

export default Home;
