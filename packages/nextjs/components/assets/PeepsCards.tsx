import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { 
  useDeployedContractInfo
} from "~~/hooks/scaffold-eth";
import { useAccount } from 'wagmi';
import { Spinner } from "~~/components/Spinner";
import { Card } from "./Card";

export enum Status {
  KID = "Kid",
  ADULT = "Adult",
  OLD = "Old",
  DEAD = "Dead",
  BURIED = "Buried",
}

export const PeepsCards = ({tokenIds, peepsOwned, allPeeps, owners, tokenURIs, whose} : any) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [isLoadingPeepSvgs, setIsLoadingPeepSvgs] = useState(true);
  const [svgs, setSvgs] = useState<string[]>();
  const [offsetChanged, setOffsetChanged] = useState(false);

  const itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;
  let currentItems = [];
  currentItems = peepsOwned?.slice().reverse().slice(itemOffset, endOffset);
  const pageCount = Math.ceil(peepsOwned?.length ? peepsOwned?.length/itemsPerPage : 0);

  const handlePageClick = (event: any) => {
    let newOffset;
    if (peepsOwned !== undefined) {
      newOffset = (event.selected * itemsPerPage) % peepsOwned?.length;      
    } else {
      newOffset = 0;
    }
    setOffsetChanged(true);    
    setItemOffset(newOffset);
  };

  const {isConnected} = useAccount();

  const { isLoading: isLoadingPeepsContract } = useDeployedContractInfo("Peeps");

  const getCard = (index: number) => {
    if (!svgs || !peepsOwned) return '';
    const ind = peepsOwned.length - index - itemOffset - 1;
    return <Card 
      index={ind}
      tokenId={tokenIds[ind]} 
      peeps={peepsOwned}
      allPeeps={allPeeps}
      svgs={svgs} 
      owners={owners}
      offsetChanged={offsetChanged}
      setOffsetChanged={setOffsetChanged}
    />;
  }

  useEffect(() => {
    if(
      isLoadingPeepsContract || 
      !isConnected ||
      !tokenURIs ||
      !allPeeps
    ) return;

    let svgImages = [];
    for (let i=0; i < tokenURIs?.length; i++) {
      if (!tokenURIs[i]) continue;
      const encodedData = tokenURIs[i].split(',')[1];
      const decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
      const jsonData = JSON.parse(decodedData);
      const encodedImage = jsonData.image.split(',')[1];
      const decodedImage = Buffer.from(encodedImage, 'base64').toString('utf-8');
      svgImages.push(decodedImage);
    }
    setSvgs(svgImages);
    setIsLoadingPeepSvgs(false);
  }, [isLoadingPeepsContract, allPeeps, tokenURIs, isConnected]);

return (
  <>
  <div className="mx-auto">
    <div className="flex items-center justify-center flex-row my-4">
    <div className="flex items-center justify-center flex-col w-9/12">
      <p className="text-xl mt-1 text-center">
        {whose} Peeps:
      </p>
    <div className="flex flex-col sm:flex-row">
      {!isLoadingPeepSvgs && 
       currentItems &&
       currentItems.length !== 0 &&
       currentItems.map((arr: any, index: number) => (
          <div className="my-2 mx-3 px-3 bg-base-200">
            {getCard(index)}
          </div>
      ))}

      {isLoadingPeepSvgs && 
       isLoadingPeepsContract &&
       (
        <>
          <Spinner/>
        </>
      )}
      
    </div>
    </div>
    </div>
  
    {
      currentItems &&
      currentItems.length === 0 &&
      !isLoadingPeepSvgs &&      
    (
        <div className="flex flex-row justify-center">
        <span className="font-bold text-md">
        No Peeps!
        </span>
        </div>
    )}

    <div>
    <div className="flex flex-row justify-center min-w-[280px]">
      {currentItems && peepsOwned && peepsOwned.length > itemsPerPage &&
      <div className="flex flex-col items-center mt-5 min-w-[700px]">
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
          activeClassName={"text-green-700 bg-white rounded-md px-2 font-semibold"}
          className="flex justify-between w-2/6 text-white bg-green-500 rounded-md px-2 py-1"
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