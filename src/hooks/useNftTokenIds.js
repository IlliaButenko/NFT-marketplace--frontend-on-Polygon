import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useDapp } from '../providers/DappProvider/DappProvider';
import { useIpfs } from "./useIpfs";

// Token list minted at contract have Address addr
export const useNftTokenIds = (addr) => {
  const { token } = useMoralisWeb3Api();
  const { chainId } = useDapp();
  const { resolveLink } = useIpfs();
  const [NFTTokenIds, setNFTTokenIds] = useState([]);
  const [totalNFTs, setTotalNFTs] = useState()
  const {
    fetch: getNFTTokenIds,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(token.getAllTokenIds, { chain: chainId, address: addr });

  useEffect(async () => {
    if (data?.result) {
      const NFTs = data.result;
      setTotalNFTs(data.total);
      for (let NFT of NFTs) {
        if (NFT?.metadata) {
          NFT.metadata = JSON.parse(NFT.metadata);
          NFT.image = resolveLink(NFT.metadata?.image);
        }else if (NFT?.token_uri){
          await fetch(NFT.token_uri)
          .then(response => response.json())
          .then(data => {
            NFT.image = resolveLink(data.image);
          });
        }
      }
      setNFTTokenIds(NFTs);
    }
  }, [data]);

  return { getNFTTokenIds, NFTTokenIds, totalNFTs, error, isLoading };
};
