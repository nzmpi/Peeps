import Link from "next/link";
import type { NextPage } from "next";
import { BigNumber, ethers } from "ethers";
import { useState, useEffect } from "react";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { 
  useScaffoldContractRead,
  useDeployedContractInfo
} from "~~/hooks/scaffold-eth";
import { useAccount, useProvider } from 'wagmi';

interface Metadata {
  name: string,
  image: string
}

const Home: NextPage = () => {
  const [metadata, setMetadata] = useState<Metadata>()
  const [svgData, setSvgData] = useState([{svg: "", name: ""}]);
  const [usersSVG, setUsersSVG] = useState([{svg: "", name: ""}]);
  const [tokenId, setTokenId] = useState(BigNumber.from(1));
  const [check, setCheck] = useState<any>();
  const [attrib, setAttrib] = useState<any>();

  const svgContainerStyles = {
    display: 'inline-block',
    transform: 'scale(0.7)',
    transformOrigin: 'top left',
  };

  const { data: Peeps } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "getPeeps",
  });

  const { data: Time } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "getTime",
  });

  const {address: connectedAccount, isConnected} = useAccount()
  let provider = useProvider();

  const { data: peepsContract, isLoading: isLoadingPeepsContract } = useDeployedContractInfo("Peeps");

  useEffect(() => { 
    if(isLoadingPeepsContract || !isConnected) return;
    
    (async () => {
      const peeps = new ethers.Contract(peepsContract?.address || "", peepsContract?.abi || "", provider)

      const tokenURI = await peeps.tokenURI(tokenId);
      const encodedData = tokenURI.split(',')[1];
      const decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
      const jsonData = JSON.parse(decodedData);
      setAttrib(decodedData);
      const encodedImage = jsonData.image.split(',')[1];
      const decodedImage = Buffer.from(encodedImage, 'base64').toString('utf-8');
      setCheck(decodedImage);

      let svgs = [];
      let len = 1;
      if (Peeps) len = Peeps?.length; 
      for (let i=0; i<len; ++i) {
        try {
          const svg = await peeps.tokenURI(BigNumber.from(i+1));
          svgs.push({svg: svg, name: Peeps?.[i].peepName || ""});
        } catch(error) {
          console.error(error)
        }
      }
      setSvgData(svgs);
      let pt = await peeps.getOwnedPeeps(connectedAccount);
      svgs = [];
      len = 1;
      if (pt) len = pt?.length; 
      for (let i=0; i<len; ++i) {
        try {
          const svg = await peeps.tokenURI(BigNumber.from(pt?.[i]));
          svgs.push({svg: svg, name: Peeps?.[pt?.[i]-1].peepName || ""});
        } catch(error) {
          console.error(error)
        }
      }
      setUsersSVG(svgs);
    })()
  }, [isLoadingPeepsContract, Peeps])

  const getSVG = (data: any) => {
    return (
    <div>
    <h1>{data.name}</h1>
    <div style={svgContainerStyles}>      
      <div 
        dangerouslySetInnerHTML={{ __html: data.svg }}
        style={{ width: 200, height: 290 }}
      />
    </div>
    </div>);
  }

  const getCheck = () => {
    return (
    <div>
    <div style={svgContainerStyles}>      
      <div 
        dangerouslySetInnerHTML={{ __html: check }}
        style={{ width: 200, height: 290 }}
      />
    </div>
    </div>);
  }

  const getJson = () => {
    if (attrib)
    return (
    <div>
      <div style={svgContainerStyles}>      
      <div 

        style={{ width: 200, height: 290 }}
      >
        {attrib}
      </div>
    </div>
    </div>);
  }

  useEffect(() => {
    //getDetails();
  }, [isLoadingPeepsContract, Peeps])

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">

        <div className="flex items-center flex-raw flex-grow"> 
        <div>          
          {getJson()}
        </div>
        </div>

        <div className="flex items-center flex-raw flex-grow">    
        <div>
          Time now: {Time?.toString() || ""}
          
          {svgData.map((data) => (
            getCheck()       
          ))}
        </div>
        </div>

        <div className="flex items-center flex-raw flex-grow">    
        <div>
          Your peeps:
          {usersSVG.map((data) => (
            getSVG(data)        
          ))}
        </div>
        </div>

        
        
      </div>
    </>
  );
};

export default Home;
