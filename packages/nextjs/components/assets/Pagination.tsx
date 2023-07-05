import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { 
  useScaffoldContractRead,
  useDeployedContractInfo
} from "~~/hooks/scaffold-eth";
import { useAccount, useProvider } from 'wagmi';
import { BigNumber, ethers } from "ethers";

export const Pagination = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [svgs, setSvgs] = useState<any[]>();

  const { data: peeps } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "getPeeps",
  });

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
    if (svgs)
    //<h1>{data.peepName}</h1>
    return (
    <div>
    <div style={svgContainerStyles}>      
      <div 
        dangerouslySetInnerHTML={{ __html: svgs[index] }}
        style={{ width: 200, height: 290 }}
      />
    </div>
    </div>);
  }

  useEffect(() => {
    if(isLoadingPeepsContract || !isConnected) return;
    
    (async () => {
      if (!peeps || !currentItems) return;
      const peepsConstract = new ethers.Contract(peepsContractData?.address || "", peepsContractData?.abi || "", provider)
      let svgImages = [];
      const len = currentItems.length < 3 ? currentItems.length : 3;
      for (let i=0; i < len; i++) {
        const tokenId = BigNumber.from(peeps?.length - i - itemOffset);
        const tokenURI = await peepsConstract.tokenURI(tokenId);
        const encodedData = tokenURI.split(',')[1];
        const decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
        const jsonData = JSON.parse(decodedData);
        const encodedImage = jsonData.image.split(',')[1];
        const decodedImage = Buffer.from(encodedImage, 'base64').toString('utf-8');
        svgImages.push(decodedImage);
      }
      setSvgs(svgImages);
    })()
  }, [isLoadingPeepsContract, peeps, itemOffset])

return (
  <>
  <div className="mx-auto mt-8">
    <div className="flex justify-center flex-col items-center min-w-[20rem] my-4">
    <div className="flex flex-col w-9/12 ">
      <div className="mb-2 ml-2">
        Array
      </div>
    <div className="flex flex-raw w-9/12 ">
      {currentItems &&
        currentItems.map((arr, index) => (
          <div className="my-2 mx-10 px-3 pt-3 bg-base-200">
          {getSVG(index)}
          </div>
      ))}
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
          className="flex justify-between w-4/6 text-white bg-blue-500 rounded-md px-2 py-1"
          renderOnZeroPageCount={null}
        />
      </div>
      }

      {!currentItems || currentItems.length === 0 &&
        <form className="px-4">
          No array!
        </form>
      }

    </div>
    </div>
  
  </div>
  </>
  );
};