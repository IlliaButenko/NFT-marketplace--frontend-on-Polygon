import React from 'react'
import Clock from "./Clock";
import Blockie from "./Blockie";
import { navigate } from '@reach/router'
import { SaleType } from '../../const';
import { useTranslation } from 'react-i18next';

export default function NftAuctionCard({ nft, height, onImgLoad, chainId, theme, search }) {
  const { t } = useTranslation();
  const [isVideo, setIsVideo] = React.useState(false);
  const img = React.useRef();
  const [metaData, setMetaData] = React.useState({});
  const [auctionDetail, setAuctionDetail] = React.useState({});
  const walletAddress = '0x0000000000000000000000000000000000000000';
  const [loading, setLoading] = React.useState(true);
  const [show, setShow] = React.useState(true);
  const [likes, setLikes] = React.useState(true);
  const navigateTo = (link) => {
    console.log(link, 'asdf')
    navigate(link)
  }

  const viewItem = () => {
    if (nft.get('isLazy')) {
      navigateTo(`/lazy/${nft.id}/${chainId}`)
    } else {
      // navigateTo(`/ItemDetail1/${nft?.id}/${chainId}`)
      navigateTo(`/ItemDetail/${nft?.get('tokenAddress')}/${nft?.get('tokenId')}/${chainId}`)
    }
  }

  async function handleLikeClick(){
    if(walletAddress){
      let like = [];
      if(nft.get('like')?.length > 0){
        like = nft.get('like');
        if(like.includes(walletAddress)){
          console.log('index',like.findIndex(item => item === walletAddress))
          like.splice(like.findIndex(item => item === walletAddress),1);
        }else{
          like.push(walletAddress);
        }
      }else{
        like.push(walletAddress);
      }
      
      setLikes(like.length)
      nft.set('like',like);
     
      console.log('like', like);
      console.log('walletAddress', walletAddress);
      
      await nft.save()
    }else{
      alert('Please, connection wallet');
    }
    
  }

  async function fetchMetaData() {
  }

  async function fetchAuctionDetail() {
  }

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
  }, [search])
  if (show)
    return (
      <div className="mb-4 auction__card">
        <div className={`nft__item m-0 ${theme ? 'nft__item-dark' : 'nft__item-light'}`}>
          {+nft?.get('saleType') === SaleType.AUCTION &&
            <div className="de_countdown">
              {auctionDetail?.id &&
                <Clock deadline={new Date(auctionDetail?.get('endTime') * 1000)} />
              }
            </div>
          }
          <div className="author_list_pp">
            <span onClick={() => navigateTo(`/Author/${nft?.get('seller')}`)}>
              <Blockie address={nft?.get('seller')} scale={5} />
            </span>
          </div>
          <div className="nft__item_wrap" style={{ height: `${height}px` }} onClick={viewItem}>
            <span className="image_card">
              {isVideo
                ? <video width="100%" height="" controls src={metaData?.image} onLoad={onImgLoad}>
                </video>
                : <img onLoad={onImgLoad} src={metaData?.image} className="lazy nft__item_preview" alt="" ref={img} />
              }
            </span>
          </div>
          <div className="nft__item_info"
            // onClick={() => navigateTo(`/ItemDetail/${nft?.get('tokenAddress')}/${nft?.get('tokenId')}`)}
            // onClick={viewItem}
          >
            <span
              // onClick={() => navigateTo(`/ItemDetail/${nft?.get('tokenAddress')}/${nft?.get('tokenId')}`)}
              onClick={viewItem}

            >
              <h4 className={`nonwrap_text ${theme ? 'nft__item__dark-text-color' : ''}`}>{metaData?.title ?? metaData?.name ?? 'Unknow'}</h4>
            </span>
            <div className="nft__item_price">
              {nft?.get('price') / 1e18} MATIC<span></span>
            </div>
            <div className="nft__item_action">
              <span className={theme ? 'nft__item__dark-text-color' : ''}>
                {+nft?.get('saleType') === SaleType.AUCTION ? t('nft.placeBid') : t('nft.buy')}
              </span>
            </div>
            <div className={`nft__item_like ${theme ? 'nft__item__dark-text-color' : ''}`}>
            <span><i className={`fas fa-heart mr-3 ${nft?.get('like')?.includes(walletAddress) ? 'heart_like' : '' }`} onClick={ handleLikeClick}></i>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    )
  else return null;
}

