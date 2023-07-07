import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { 
  useScaffoldContractRead,
  useDeployedContractInfo
} from "~~/hooks/scaffold-eth";
import { useAccount, useProvider } from 'wagmi';
import { BigNumber, ethers } from "ethers";
import { Spinner } from "~~/components/Spinner";

export const Pagination = () => {
  const colors = ["bg-red-400", "bg-yellow-300", "bg-green-300", "bg-green-100"];
  const [itemOffset, setItemOffset] = useState(0);
  const [peepArray, setPeepArray] = useState<any[]>();
  const [isLoadingPeepSvgs, setIsLoadingPeepSvgs] = useState(true);
  const [svgs, setSvgs] = useState<string[]>();

  const { data: peeps } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "getPeeps",
  });

  const { data: tokenURIs } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "allTokenURI",
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
    if (!svgs || !peeps) return '';
    const ind = svgs.length - index - itemOffset - 1;
    return (
      <div>
      <h1>{peeps[ind].peepName}</h1>
      <div className={`flex flex-col items-center gap-10 w-[300px] rounded-[1rem] ${colors[3]} border`}>
      <div style={svgContainerStyles}>      
        <div 
          dangerouslySetInnerHTML={{ __html: svgs[ind] }}
        style={{ width: 200, height: 290 }}
        />
      </div>
      </div>
      {true === true && (
        <span className="text-1xl">
          Hello!       
        </span>
      )}
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