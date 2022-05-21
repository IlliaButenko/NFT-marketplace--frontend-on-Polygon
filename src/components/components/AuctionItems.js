import React, { Component, useEffect } from 'react';
// import NftAuctionCard from '../components/NftAuctionCard';
import { SaleType, chainPrefix } from '../../const'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as SaleApi from '../../apis/nft';
import NftCard from '../components/NftCard/index';

var settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
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


class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return (
      <div {...props}></div>
    );
  }
}

const AuctionItems = ({ theme, search }) => {
  const [nfts, setNfts] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [height, setHeight] = React.useState(300);

  const onImgLoad = ({ target: img }) => {
    if (img.offsetHeight > 300) return
    if (height < img.offsetHeight) {
      setHeight(img.offsetHeight)
    }
  }

  const getNftList = async () => {
    setLoading(true);
    try {
      const { data } = await SaleApi.listMarket({ saleType: 1, endAuction: true });
      setNfts(data.items);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNftList();
  }, [])




  function resetSlider() {
    const slider = document.getElementsByClassName('slick-track');
    if (slider.length > 0) {
      for (let i = 0; i < slider.length; i++) {
        slider[i].style.transform = 'translate3d(0px, 0px, 0px) !important';
      }
    }
  }

  React.useEffect(() => {
    resetSlider()
  }, []);

  return (
    <div className="row nft">
      { <Slider {...settings}>
        {nfts.map((nft, index) => (
          <CustomSlide className='itm' index={index} key={index}>
            <div style={{ margin: '10px' }}>
              
              {/* <NftCard nft={nft} key={index} onImgLoad={onImgLoad} height={height} chainId={nft.chainId} theme={theme} search={search}/> */}
              <NftCard item={nft} key={index} onImgLoad={onImgLoad} height={height} theme={theme} type='auction' />
            </div>
          </CustomSlide>
        ))}
      </Slider>}
    </div>
  )
}
export default AuctionItems;
