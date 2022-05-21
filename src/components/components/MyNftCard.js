import React from 'react';
import { navigate } from '@reach/router';
import ListForm from './Form/ListForm';

export default function NftCard({ nft, height, onImgLoad, canSale, onCreateNew, chainId, search }) {

  const [isVideo, setIsVideo] = React.useState(false);
  const img = React.useRef();
  const [metaData, setMetaData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [show, setShow] = React.useState(true);
  const navigateTo = (link) => {
    navigate(link)
  }

  React.useEffect(() => {
    if (nft && img.current) {
      img.current.addEventListener('error', (e) => {
        setIsVideo(true);
      });
    }
  }, [nft, img]);

  async function fetchMetaData() {
    setLoading(true);
    try {
      const res = await fetch(nft?.uri);
      const meta = await res.json();
      setMetaData(meta);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  async function saveDetailNft() {
  }

  React.useEffect(() => {
    fetchMetaData();
  }, [nft]);

  React.useEffect(() => {
    saveDetailNft();
  }, [metaData]);

  React.useEffect(() => {
    if (search) {
      if (search.trim().length > 0) {
        if (metaData) {
          if (metaData.title) {

            if (metaData.title.includes(search)) {
              setShow(true)
            } else {
              setShow(false)
            }
          }
        }
      }
    } else {
      setShow(true)
    }
  }, [search]);
  
  if (show)
    return (
      <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
        <div className="nft__item m-0">
          <div className="" style={{ height: "10px" }}>
            {canSale && (
              <ListForm tokenId={nft?.tokenId} tokenAddress={nft?.tokenAddress} onCreated={() => onCreateNew()} chainId={chainId} title={metaData?.title} nft={nft} />
            )}
          </div>
          <div className="nft__item_wrap" style={{ height: `${height}px` }}>
            {/* <span onClick={() => navigateTo(`/ItemDetail/${nft?.market?.id}`)}> */}
            <span onClick={() => navigateTo(`/item/${nft?.id}`)}>
              {isVideo
                ? <video width="100%" height="" controls src={metaData?.image} onLoad={onImgLoad}>
                </video>
                : <img onLoad={onImgLoad} src={metaData?.image} className="lazy nft__item_preview" alt="" ref={img} />
              }
            </span>
          </div>
          <div className="nft__item_info">
            {/* <span onClick={() => navigateTo(`/ItemDetail/${nft?.market?.id}`)}> */}
            <span onClick={() => navigateTo(`/item/${nft?.id}`)}>
              <h4>{metaData?.title} (MATIC) </h4>
              <h5>Token ID: {nft?.tokenId}</h5>
            </span>
            {console.log(nft,'nft data from mynftCard')}
            {console.log(nft.likes,'nft like from mynftCard')}
            <div className="nft__item_like">
              <i className="fa fa-heart"></i><span>{nft.likes}</span>
            </div>
          </div>
        </div>
      </div>
    )
  else return null;
}
