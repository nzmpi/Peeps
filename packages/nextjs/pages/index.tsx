import Link from "next/link";
import type { NextPage } from "next";
import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { 
  useScaffoldContractRead,
  useDeployedContractInfo
} from "~~/hooks/scaffold-eth";
import { useContractInfiniteReads } from "wagmi";

const Home: NextPage = () => {
  const [tokenId, setTokenId] = useState(BigNumber.from(1));
  const [svgData, setSvgData] = useState(['']);

  const { data: Peeps } = useScaffoldContractRead({
    contractName: "Peeps",
    functionName: "getPeeps",
  });

  const { data: peepsContractInfo } = useDeployedContractInfo("Peeps");
  const peepContract = {
    address: peepsContractInfo?.address,
    abi: peepsContractInfo?.abi,
  }

  const { data: DataBack } = useScaffoldContractRead({
    contractName: 'Peeps',
    functionName: 'tokenURI',
    args: [tokenId],
  });

  useEffect(() => {
    const fetchSVGData = async (tokenId : number) => {
      setTokenId(BigNumber.from(tokenId));
      return await DataBack;
    };

    const fetchData = async () => {
      if (Peeps) {
        let temp = [];
        for (let i=1; i<=Peeps.length; i++) {
          temp.push(await fetchSVGData(i) || "");
        }
        setSvgData(temp);
      }
    };

    fetchData();
  }, [Peeps]);

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
      {Peeps?.toString()}
      <div className="flex items-center flex-raw flex-grow">    
      <div>
      {DataBacks}
      {svgData.map((data, index) => (
        <div dangerouslySetInnerHTML={{ __html: data || "" }}/>
      ))}
    </div>
      </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Experiment with{" "}
                <Link href="/example-ui" passHref className="link">
                  Example UI
                </Link>{" "}
                to build your own UI.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
