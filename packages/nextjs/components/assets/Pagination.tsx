import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { 
  useScaffoldContractRead,
  useDeployedContractInfo
} from "~~/hooks/scaffold-eth";
import { useAccount, useProvider } from 'wagmi';
import { BigNumber, ethers } from "ethers";
import { Spinner } from "~~/components/Spinner";
import { Address } from "~~/components/scaffold-eth";
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

export enum Status {
  KID = "Kid",
  ADULT = "Adult",
  OLD = "Old",
  DEAD = "Dead",
  BURIED = "Buried",
}

export const Pagination = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [isLoadingPeepSvgs, setIsLoadingPeepSvgs] = useState(true);
  const [svgs, setSvgs] = useState<string[]>();
  const [expanded, setExpanded] = useState(false);

  const { data: peeps } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "getPeeps",
  });

  const { data: tokenURIs } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "allTokenURI",
  });

  const { data: owners } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "allOwners",
  });

  const getTime = (index: number) : string => {
    if (!peeps) return '';
    let time = 0;

    if (getStatus(index) === Status.KID)
      time = peeps[index]?.kidTime;
    else if (getStatus(index) === Status.ADULT)
      time = peeps[index]?.adultTime;
    else if (getStatus(index) === Status.OLD)
      time = peeps[index]?.oldTime;
    else if (getStatus(index) === Status.DEAD)
      return "";

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
      time = peeps[index]?.kidTime;
    else if (getStatus(index) === Status.ADULT)
      time = peeps[index]?.adultTime;
    else if (getStatus(index) === Status.OLD)
      time = peeps[index]?.oldTime;
    else if (getStatus(index) === Status.DEAD)
      return "";

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

  const getName = (name: string) : string => {
    if (name.length <= 20) return name;
    else {
      return name.substring(0, 10) + "..." + name.substring(name.length - 8);
    }
  };

  const getStatus = (index: number) => {
    if (!peeps) return '';
    const timeNow = Date.now()/1000;
    if (peeps[index].isBuried === true) return Status.BURIED;
    else if (timeNow < peeps[index].kidTime) return Status.KID;
    else if (timeNow < peeps[index].adultTime) return Status.ADULT;
    else if (timeNow < peeps[index].oldTime) return Status.OLD;
    else return Status.DEAD;
  }

  const getNextStage = (index: number) => {
    if (!peeps) return '';
    const timeNow = Date.now()/1000;
    if (peeps[index].isBuried === true) return "";
    else if (timeNow < peeps[index].kidTime) return "Adulthood:";
    else if (timeNow < peeps[index].adultTime) return "Old Age:";
    else if (timeNow < peeps[index].oldTime) return "Death:";
    else return "";
  }

  const itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = peeps?.slice().reverse().slice(itemOffset, endOffset);
  const pageCount = Math.ceil(peeps?.length ? peeps?.length/itemsPerPage : 0);

  const handlePageClick = (event: any) => {
    let newOffset;
    if (peeps !== undefined) {
      newOffset = (event.selected * itemsPerPage) % peeps?.length;      
    } else {
      newOffset = 0;
    }    
    setItemOffset(newOffset);
  };

  const {address: connectedAccount, isConnected} = useAccount()
  let provider = useProvider();

  const { data: peepsContractData, isLoading: isLoadingPeepsContract } = useDeployedContractInfo("Peeps");

  const svgContainerStyles = {
    display: 'inline-block',
    transform: 'scale(0.7)',
    transformOrigin: 'top left',
  };

  const getSVG = (index: number) => {
    if (!svgs || !peeps || !owners) return '';
    const ind = peeps.length - index - itemOffset - 1;
    return (
      <div>
      <div className={`flex flex-col`}>
      <div style={svgContainerStyles}>      
        <div 
          dangerouslySetInnerHTML={{ __html: svgs[ind] }}
          style={{ width: 200, height: 290 }}
        />
      </div>
      </div>
      <div>
      {expanded === false && (
      <div className={`flex flex-col items-center gap-1 w-[280px] h-[70px] rounded-[1rem] bg-green-300 border`} style={{ marginTop: '-1.5rem' }}>
      
      <div className="flex-col items-center mt-6">
        <div className="p-2 py-0"> </div>
        <span 
          className="p-2 text-lg font-bold"   
          style={{ marginLeft: '-2rem' }}> 
          Id: 
        </span>
        <span 
          className="text-lg text-right"  
          style={{ marginRight: '2.3rem' }}> 
          #{ind+1} 
        </span>
        <button 
          className="btn btn-success btn-sm" 
          style={{ marginRight: '-2.5rem' }}
          onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronUpIcon className="h-5 w-5 mr-2"/> : <ChevronDownIcon className="h-5 w-5 mr-2"/>}
          <span>
          {expanded
            ? `Hide Info`
            : `Show Info`}
          </span>
        </button>
      </div>
      </div>
      )}

      {expanded === true && (
      <div className={`flex flex-col items-center gap-1 w-[280px] h-[300px]  rounded-[1rem] bg-green-300 border`} style={{ marginTop: '-1.5rem' }}>
      
      <div className="flex-col items-center mt-6">
      <div className="p-2 py-0"> </div>
        <span 
          className="p-2 text-lg font-bold py-1"> 
          Id: 
        </span>
        <span 
          className="text-lg text-right"  
          style={{ marginRight: '2.3rem' }}> 
          #{ind+1} 
        </span>
        <button 
          className="btn btn-secondary btn-sm" 
          style={{ marginRight: '-2.5rem' }}
          onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronUpIcon className="h-5 w-5 mr-2"/> : <ChevronDownIcon className="h-5 w-5 mr-2"/>}
          <span>
          {expanded
            ? `Hide Info`
            : `Show Info`}
          </span>
        </button>

        <div className="p-2 py-1"> </div>
        <span className="p-2 text-lg font-bold"> Name: </span>
        <span className="text-lg text-right min-w-[2rem]"> 
          {getName(peeps[ind].peepName)} 
        </span>

        <div className="p-2 py-0"> </div>
        <div className="flex flex-row">
        <span className="p-2 text-lg font-bold"> Owner: </span>
          <Address address={owners[ind]}/>
        </div>

        <div className="p-2 py-0"> </div>
        <span className="p-2 text-lg font-bold"> Status: </span>
        <span className="text-lg text-right min-w-[2rem]"> 
          {getStatus(ind)} 
        </span>

        <div className="p-2 py-0.5"> </div>
        <span className="p-2 text-lg font-bold"> {getNextStage(ind)} </span>
        <div className="tooltip tooltip-success" data-tip={getDuration(ind)}>
          {getTime(ind)}
        </div>
      </div>
      </div>
      )}
      </div>
    </div>
    );
  }

  useEffect(() => {
    if(
      isLoadingPeepsContract || 
      !isConnected ||
      !tokenURIs ||
      !peeps
    ) return;

    let svgImages = [];
    for (let i=0; i < tokenURIs?.length; i++) {
      const encodedData = tokenURIs[i].split(',')[1];
      const decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
      const jsonData = JSON.parse(decodedData);
      const encodedImage = jsonData.image.split(',')[1];
      const decodedImage = Buffer.from(encodedImage, 'base64').toString('utf-8');
      svgImages.push(decodedImage);
    }
    setSvgs(svgImages);
    setIsLoadingPeepSvgs(false);
  }, [isLoadingPeepsContract, peeps, tokenURIs, isConnected]);

return (
  <>
  <div className="mx-auto mt-8">
    <div className="flex justify-center flex-col my-4">
    <div className="flex flex-col w-9/12 ">
      <div className="mb-2 ml-2">
        Array
      </div>
    <div className="flex flex-row">
      {!isLoadingPeepSvgs && currentItems &&
        currentItems.map((arr, index) => (
          <div className="my-2 mx-10 px-3 pt-3 bg-base-200">
            {getSVG(index)}
          </div>
      ))}

      {isLoadingPeepSvgs && (
        <>
          <Spinner/>
        </>
      )}
    </div>
    </div>
    <div className="flex flex-col w-9/12 ">

      {currentItems && peeps && peeps.length > itemsPerPage &&
      <div className="flex justify-center mt-5">
        <ReactPaginate
          breakLabel="..."
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          previousLinkClassName={"font-bold"}
          nextLinkClassName={"font-bold"}
          activeClassName={"text-blue-500 bg-white rounded-md px-2 font-semibold"}
          className="flex justify-between w-2/6 text-white bg-blue-500 rounded-md px-2 py-1"
          renderOnZeroPageCount={null}
        />
      </div>
      }

    </div>
    </div>
  
  </div>
  </>
  );
};