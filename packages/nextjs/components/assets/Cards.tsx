import React, { useState, useEffect } from "react";
import { 
  useScaffoldContractRead,
  useScaffoldContractWrite
} from "~~/hooks/scaffold-eth";
import { useAccount } from 'wagmi';
import { BigNumber, ethers } from "ethers";
import { Spinner } from "~~/components/Spinner";
import { Address, InputBase  } from "~~/components/scaffold-eth";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Modal from 'react-modal';

export enum Status {
  KID = "Kid",
  ADULT = "Adult",
  OLD = "Old",
  DEAD = "Dead",
  BURIED = "Buried",
}

export const Cards = ({index, peeps, svgs, owners, offsetChanged, setOffsetChanged} : any) => {
  const [expanded, setExpanded] = useState(false);
  const [tokenId, setTokenId] = useState(BigNumber.from(0));
  const [partnerTokenId, setPartnerTokenId] = useState("");
  const [newName, setNewName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState([false,false,false]);

  const { data: breedingFee } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "breedingFee",
  });

  const { writeAsync: changeName, isLoading: changeNameLoading } = useScaffoldContractWrite({
    contractName: "Peeps",
    functionName: "changeName",
    args: [BigNumber.from(tokenId), newName],
  });

  const { writeAsync: breed, isLoading: breedLoading } = useScaffoldContractWrite({
    contractName: "Peeps",
    functionName: "breed",
    args: [BigNumber.from(tokenId), 
      partnerTokenId === "" ? BigNumber.from(0) : BigNumber.from(partnerTokenId)],
    value: ethers.utils.formatEther(breedingFee?.toString() || 0),
  });

  const { writeAsync: giftHat, isLoading: giftHatLoading } = useScaffoldContractWrite({
    contractName: "Peeps",
    functionName: "giftHat",
    args: [BigNumber.from(tokenId), 
      partnerTokenId === "" ? BigNumber.from(0) : BigNumber.from(partnerTokenId)],
  });

  const { writeAsync: buryPeep, isLoading: buryPeepLoading } = useScaffoldContractWrite({
    contractName: "Peeps",
    functionName: "buryPeep",
    args: [BigNumber.from(tokenId)],
  });

  const { writeAsync: toggleBreeding, isLoading: toggleBreedingLoading } = useScaffoldContractWrite({
    contractName: "Peeps",
    functionName: "toggleBreeding",
    args: [BigNumber.from(tokenId)],
  });

  const changeExpanding = () => {
    setExpanded(!expanded);
  };

  const getTime = (index: number) : string => {
    if (!peeps) return '';
    let time = 0;

    if (getStatus(index) === Status.KID)
      time = peeps[index].kidTime;
    else if (getStatus(index) === Status.ADULT)
      time = peeps[index].adultTime;
    else if (getStatus(index) === Status.OLD)
      time = peeps[index].oldTime;
    else return "";

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

  const isPlular = (x: number) : string => {
    if (x === 1)
      return "";
    else 
      return "s";
  }

  const getDuration = (index: number) : string => {
    if (!peeps) return '';
    let time = 0;

    if (getStatus(index) === Status.KID)
      time = peeps[index].kidTime;
    else if (getStatus(index) === Status.ADULT)
      time = peeps[index].adultTime;
    else if (getStatus(index) === Status.OLD)
      time = peeps[index].oldTime;
    else return "";

    time -= Math.floor(Date.now()/1000);

    var months = Math.floor(time/2592000);
    time %= 2592000;
    var days = Math.floor(time/86400);
    time %= 86400;
    var hours = Math.floor(time/3600);
    time %= 3600;
    var mins = Math.floor(time/60);
    var secs = time%60;
    var formattedTime = "";
    if (months !== 0) formattedTime += months + " month" + isPlular(months) + " ";
    if (days !== 0) formattedTime += days + " day" + isPlular(days) + " ";
    if (hours !== 0) formattedTime += hours + " hour" + isPlular(hours) + " ";
    if (mins !== 0) formattedTime += mins + " minute" + isPlular(mins) + " ";
    if (secs !== 0) formattedTime += secs + " second" + isPlular(secs);
  
    return formattedTime;
  };

  const getFittingName = (name: string) : string => {
    if (name.length <= 19) return name;
    else {
      return name.substring(0, 10) + "..." + name.substring(name.length - 7);
    }
  };

  const getStatus = (index: number) => {
    if (!peeps[index]) return '';
    const timeNow = Date.now()/1000;
    if (peeps[index].isBuried === true) return Status.BURIED;
    else if (timeNow < peeps[index].kidTime) return Status.KID;
    else if (timeNow < peeps[index].adultTime) return Status.ADULT;
    else if (timeNow < peeps[index].oldTime) return Status.OLD;
    else return Status.DEAD;
  }

  const getNextStage = (index: number) => {
    const timeNow = Date.now()/1000;
    if (peeps[index].isBuried === true) return "";
    else if (timeNow < peeps[index].kidTime) return "Adulthood:";
    else if (timeNow < peeps[index].adultTime) return "Old Age:";
    else if (timeNow < peeps[index].oldTime) return "Death:";
    else return "";
  }

  const getButtonName = (index: number) => {
    if (peeps[index].isBuried === true) return "";
    else if (getStatus(index) === Status.KID) return "Change Name";
    else if (getStatus(index) === Status.ADULT) {
      if (peeps[index].breedCount > 2)
        return "Max kids";
      else
        return "Breed";
    }
    else if (getStatus(index) === Status.OLD) return "Gift Hat";
    else return "Bury";
  }

  const getGrandkids = () => {
    if (!tokenId.toNumber()) return '';
    let grandkids;
    let grandkidsFinal:string[] = [];
    const kids = peeps[tokenId.toNumber()-1].children;
    if (kids.length === 0) return "None";
    for (let i = 0; i < kids.length; i++) {
      grandkids = peeps[kids[i].toNumber()-1].children;
      if (grandkids.length === 0) continue;
      for (let j = 0; j < grandkids.length; j++) {
        if (grandkidsFinal.includes(grandkids[j].toString())) continue;
        else grandkidsFinal.push(grandkids[j].toString());
      }
    }

    return arrayToString(grandkidsFinal);
  }

  const isGrandkid = (id: string) => {
    if (!tokenId.toNumber()) return false;
    let grandkids;
    const kids = peeps[tokenId.toNumber()-1].children;
    if (kids.length === 0) return false;
    for (let i = 0; i < kids.length; i++) {
      grandkids = peeps[kids[i].toNumber()-1].children;
      if (grandkids.length === 0) continue;
      for (let j = 0; j < grandkids.length; j++) {
        if (grandkids[j].toString() === id) return true;
      }
    }

    return false;
  }

  const closeModal = () => {
    setIsModalOpen(prevState => prevState.map(() => false));
    setNewName("");
    setTokenId(BigNumber.from(0));
    setPartnerTokenId("");
  }

  const openModal = (index: number) => {
    setTokenId(BigNumber.from(index+1));

    if (getStatus(index) === Status.KID) {
      setIsModalOpen(prevState => prevState.map((item, idx) => idx === 0 ? true : false));
    } else if (getStatus(index) === Status.ADULT) {
      setIsModalOpen(prevState => prevState.map((item, idx) => idx === 1 ? true : false));
    } else if (getStatus(index) === Status.OLD) {
      setIsModalOpen(prevState => prevState.map((item, idx) => idx === 2 ? true : false));
    } else if (peeps[index].isBuried === false) {
      buryPeep();
    }
  }

  const changeBreedingAllowance = () => {
    toggleBreeding();
  }

  const arrayToString = (arr: any[]) => {
    if (arr.length === 0) return "None";
    if (arr.toString() === "0,0") return "None";
    let arrString = "";
    for (let i = 0; i < arr.length; ++i) {
      arrString += arr[i].toString() + ", ";
    }
    return arrString.slice(0, -2);
  }

  const isBreedingAllowed = (index: number) => {
    if (getStatus(index) === Status.ADULT &&
      (owners[index] === connectedAccount ||
       peeps[index].breedingAllowed === true) &&       
       peeps[index].breedCount < 3 && 
       index !== tokenId.toNumber()-1) return true;
    else return false;
  }

  const {address: connectedAccount} = useAccount();

  const svgContainerStyles = {
    display: 'inline-block',
    transform: 'scale(0.7)',
    transformOrigin: 'top left',
  };

  useEffect(() => {
    setExpanded(false);
    setOffsetChanged(false);
  }, [offsetChanged]);

return (
  <>
  <div>
    <div className={`flex flex-col`}>
      <div style={svgContainerStyles}>      
        <div 
          dangerouslySetInnerHTML={{ __html: svgs[index] }}
          style={{ width: 200, height: 290 }}
        />
      </div>
    </div>

    <div>
      {expanded === false && (
      <div className={`flex flex-col items-center gap-1 w-[280px] h-[70px] rounded-[1rem] bg-green-300 border-green-400 shadow-md`} style={{ marginTop: '-1.5rem' }}>    
      <div className="mt-6">
        <span 
          className="p-2 text-lg font-bold"   
          style={{ marginLeft: '-2rem' }}> 
          Id: 
        </span>
        <span 
          className="text-lg text-right"  
          style={{ marginRight: '2.3rem' }}> 
          #{index+1} 
        </span>
        <button 
          className="btn btn-success btn-sm" 
          style={{ marginRight: '-2.5rem' }}
          onClick={() => changeExpanding()}>
          <ChevronDownIcon className="h-4 w-6"/>
        </button>
      </div>
      </div>
      )}

      {expanded === true && (
      <div className={`flex flex-col items-center gap-1 w-[280px] rounded-[1rem] bg-green-300 border-green-400 py-4 shadow-md`} style={{ marginTop: '-1.8rem' }}> 
      <div className="mt-3">
        <span 
          className="p-2 text-lg font-bold"   
          style={{ marginLeft: '-2rem' }}>  
          Id: 
        </span>
        <span 
          className="text-lg text-right"  
          style={{ marginRight: '2.3rem' }}> 
          #{index+1} 
        </span>
        <button 
          className="btn btn-success btn-sm" 
          style={{ marginRight: '-2.5rem' }}
          onClick={() => changeExpanding()}>
          <ChevronUpIcon className="h-4 w-6"/>
        </button>
      </div>    
      <div className="flex-col items-center">     
      
        <div className="p-2 py-1"> </div>
        <span className="p-2 text-lg font-bold"> Name: </span>
        <span className="text-lg text-right min-w-[2rem]"> 
          {getFittingName(peeps[index].peepName)} 
        </span>

        <div className="p-2 py-0"> </div>
        <div className="flex flex-row">
        <span className="p-2 text-lg font-bold"> Owner: </span>
          <Address address={owners[index]}/>
        </div>

        <div className="p-2 py-0"> </div>
        <span className="p-2 text-lg font-bold"> Parents: </span>
        <span className="text-lg text-right min-w-[2rem]"> 
          {arrayToString(peeps[index].parents)} 
        </span>

        <div className="p-2 py-0.5"> </div>
        <span className="p-2 text-lg font-bold"> Kids: </span>
        <span className="text-lg text-right min-w-[2rem]"> 
          {arrayToString(peeps[index].children)} 
        </span>

        <div className="p-2 py-0.5"> </div>
        <span className="p-2 text-lg font-bold"> Status: </span>
        <span className="text-lg text-right min-w-[2rem]"> 
          {getStatus(index)} 
        </span>

        <div className="p-2 py-0.5"> </div>
        {getStatus(index) !== Status.DEAD && 
         getStatus(index) !== Status.BURIED &&
        (
        <div>
        <span className="p-2 text-lg font-bold"> {getNextStage(index)} </span>
        <div className="tooltip tooltip-success" data-tip={getDuration(index)}>
          {getTime(index)}
        </div> 
        </div>)}
        
        <div className="p-2 py-1"> </div>
        {getButtonName(index) !== "" &&
         owners[index] === (connectedAccount) &&
        (
        <div className="flex items-center justify-center"> 
        <button 
          disabled={buryPeepLoading || 
           (getStatus(index) === Status.ADULT &&
           peeps[index].breedCount > 2)}
          className="btn btn-success btn-sm" 
          onClick={() => openModal(index)}
          onMouseEnter={() => setTokenId(BigNumber.from(index+1))}
        >
        {buryPeepLoading && (
          <>
            <Spinner/>
          </>
        )}
        {!buryPeepLoading && (
          <>
            {getButtonName(index)}
          </>
        )}          
        </button>
        </div> )}   

        <div className="p-2 py-1"> </div>
        {getStatus(index) === Status.ADULT &&
        (
        <div>
        <span className="p-2 text-md font-bold"> breeding for</span>
        </div> )}     
        
        <div className="p-2 py-0"> </div>
        {getStatus(index) === Status.ADULT &&
        (
        <div>
        <div className="tooltip tooltip-success" data-tip="You get 30% of the breeding fee">
          <span className="p-2 text-md font-bold"> 3rd parties:</span>
        </div>
        
        {owners[index] === connectedAccount &&
        (        
        <button 
          disabled={toggleBreedingLoading}
          className={`btn ${peeps[index].breedingAllowed ? "btn-success" : "btn-warning"} btn-sm mx-2 min-w-[8rem]`}
          onClick={() => changeBreedingAllowance()}
          onMouseEnter={() => setTokenId(BigNumber.from(index+1))}
        >
        {toggleBreedingLoading && (
          <>
            <Spinner/>
          </>
        )}
        {!toggleBreedingLoading && (
          <>
            {peeps[index].breedingAllowed ? "Allowed" : "Not allowed"}
          </>
        )}          
        </button> )}

        {owners[index] !== connectedAccount &&
        ( 
        <span className="p-2 mx-1"> 
          {peeps[index].breedingAllowed ? <span className="text-sm font-bold px-6 py-1.5 rounded-[1rem] bg-teal-300 shadow-md">ALLOWED</span> : <span className="text-sm font-bold px-6 py-1.5 rounded-[1rem] bg-yellow-400 shadow-md">NOT ALLOWED</span>}
        </span>
        )}

        </div> )}

      </div>
      </div>      
      )}
    </div>

    <Modal
      isOpen={isModalOpen[0]}
      onRequestClose={closeModal}
      contentLabel="Modal 1"
      className="flex flex-col absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-green-300 shadow-md rounded-3xl px-6 lg:px-8 py-6 lg:py-10 gap-4"
    >
      <span className="font-bold text-lg">
        Change name of {peeps[tokenId.toNumber()-1]?.peepName}
      </span>
      <InputBase placeholder="New name" value={newName} onChange={setNewName}/>
      <button 
        disabled={changeNameLoading || 
          newName === ""}
        className="btn btn-success btn-sm mt-3.0" onClick={() => changeName()}>
      {changeNameLoading && (
      <>
        <Spinner/>
      </>
      )}
      {!changeNameLoading && (
      <>
        Confirm
      </>
      )}
      </button>
      <button className="btn btn-warning btn-sm" onClick={() => closeModal()}>
        Cancel
      </button>
    </Modal>

    <Modal
      isOpen={isModalOpen[1]}
      onRequestClose={closeModal}
      contentLabel="Modal 2"
      className="flex flex-col absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-green-300 shadow-md rounded-3xl px-6 lg:px-8 py-6 lg:py-10 gap-4"
    >
      <span className="font-bold text-lg">
        Breed {peeps[tokenId.toNumber()-1]?.peepName} for {ethers.utils.formatEther(breedingFee || 0)} MATIC with
      </span>
      <InputBase placeholder="Id" value={partnerTokenId} 
      onChange={value => {
        if (value === "") {
          setPartnerTokenId("");
        } else   
          setPartnerTokenId(value);
        }}/>
      <button 
        disabled={breedLoading || 
          !isBreedingAllowed(Number(partnerTokenId)-1)}
        className="btn btn-success btn-sm mt-3.0" onClick={() => breed()}>
      {breedLoading && (
      <>
        <Spinner/>
      </>
      )}
      {!breedLoading && (
      <>
        Confirm
      </>
      )}
      </button>
      <button className="btn btn-warning btn-sm" onClick={() => closeModal()}>
        Cancel
      </button>
    </Modal>

    <Modal
      isOpen={isModalOpen[2]}
      onRequestClose={closeModal}
      contentLabel="Modal 3"
      className="flex flex-col absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-green-300 shadow-md rounded-3xl px-6 lg:px-8 py-6 lg:py-10 gap-4"
    >      
      <div className="flex flex-row">
        <span className="font-bold text-lg">
          Gift a hat to
        </span>
        <div className="tooltip tooltip-success mt-1 ml-2"
          data-tip={`Your grandkids: ${getGrandkids()}`}>
        <InformationCircleIcon className="h-5 w-5 mr-0.5" />
        </div>
      </div>
      <InputBase placeholder="Grandkid Id" value={partnerTokenId} 
      onChange={value => {
        if (value === "") {
          setPartnerTokenId("");
        } else   
          setPartnerTokenId(value);
      }}/>
      <button 
        disabled={giftHatLoading ||
          !isGrandkid(partnerTokenId)}
        className="btn btn-success btn-sm mt-3.0" onClick={() => giftHat()}>
      {giftHatLoading && (
      <>
        <Spinner/>
      </>
      )}
      {!giftHatLoading && (
      <>
        Confirm
      </>
      )}
      </button>
      <button className="btn btn-warning btn-sm" onClick={() => closeModal()}>
        Cancel
      </button>
    </Modal>

    </div>
  </>
  );
};