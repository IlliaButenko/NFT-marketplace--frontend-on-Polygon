import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { navigate } from '@reach/router'
import * as SaleApi from '../../apis/nft';
import { useTranslation } from "react-i18next";

var settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  adaptiveHeight: 300,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    }
  ]
};

function CustomSlide(props) {
  const { t } = useTranslation();
  const [metaData, setMetaData] = React.useState();
  const { nft } = props;
  const [chain, setChain] = React.useState();
  
  async function fetchMetaData(nft) {
    
  }

  async function getChain(){
  }

  return (
    <div {...props} onClick={() => navigate(`/item/${nft?._id}`)}>
      <div className="nft_pic">
        <span>
          <span className="nft_pic_info">
            <span className="nft_pic_title">{ nft?.name }</span>
            {/* <span className="nft_pic_by">{nft?.symbol}</span> */}
          </span>
        </span>
        <div className="nft_pic_wrap">
          {/* {nft?.image ? <img src={nft?.image} className="lazy" width="100%" height="500px" style={{ height: '500px' }} alt="" />
              : nft?.video ? <video width="100%" height="" controls src={nft?.image}></video>
              : <audio controls muted><source src={nft?.image} /></audio>
            } */}
            {nft?.fileType === "image" ?
							<img src={nft?.image} className="lazy" alt=""  width="100%" height="500px" style={{ height: '500px' }}/>
							: nft?.fileType === "video" ?
								<video width="100%" controls src={nft?.image} height="500px" style={{ height: '500px' }}>
								</video>
								: nft?.fileType === "audio" ? <audio style={{ width: '100%', height: '500px' }} controls muted>
									<source src={nft?.image} type={nft?.originType} />
								</audio>
									: <img src={nft?.image} className="lazy" alt=""  width="100%" height="500px" style={{ height: '500px' }}/>
						}
        </div>
      </div>
    </div>
    // <div {...props} onClick={() => navigate(`/ItemDetail/${nft?.get('tokenAddress')}/${nft?.get('tokenId')}/${chain}`)}>
    //   <div className="nft_pic">
    //     <span>
    //       <span className="nft_pic_info">
    //         <span className="nft_pic_title">{nft?.get('title') ?? nft?.name ?? ''}</span>
    //         {/* <span className="nft_pic_by">{nft?.symbol}</span> */}
    //       </span>
    //     </span>
    //     <div className="nft_pic_wrap">
    //       {nft?.get('type')==="image" ? <img src={nft?.get('image')} className="lazy" width="100%" height="500px" style={{ height: '500px' }} alt="" />
    //           : nft?.get('type')==="video" ? <video width="100%" height="" controls src={nft?.get('image')} type={nft?.get('typeOrign')} ></video>
    //           : <audio controls autoplay muted><source src={nft?.get('image')} type={nft?.get('typeOrign')}/></audio>
    //         }
    //     </div>
    //   </div>
    // </div>
  );
}

export default function SliderCarouselsingle() {
  const { t } = useTranslation();
  const [featuredNfts, setFeaturedNfts] = useState([]);
  const [loading, setLoading] = React.useState(false);
  
  async function fetchFeaturedNfts() {
    setLoading(true);
    try {
      const { data } = await SaleApi.getFeature();
      setFeaturedNfts(data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFeaturedNfts();
  }, [])

  console.log('fearure', featuredNfts);

  if (featuredNfts.length === 0) {
    return <div>{t('Loading')}</div>;
  }
  return (
    <div className='nft-big'>
      <Slider {...settings}>
        {featuredNfts?.map((nft, index) =>
          <CustomSlide className='itm' index={index} key={index} nft={nft?.nft}>
          </CustomSlide>
        )}
      </Slider>
    </div>
  );
}
