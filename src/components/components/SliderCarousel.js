import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from '@reach/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

var settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  adaptiveHeight: 300,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
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

export default function SliderCarousel() {
  const [featuredNfts, setFeaturedNfts] = React.useState([]);
  const [metaDatas, setMetaDatas] = React.useState(new Map());

  async function fetchFeaturedNfts() {
  }

  async function fetchMetaData(nft) {
  }

  return (
    <div className='nft-big'>
      <Slider {...settings}>

        {featuredNfts.map((nft, index) => {
          <CustomSlide className='itm' index={index} key={index}>
            <div className="nft_pic">
              <span>
                <Link to="/ItemDetail">
                  <span className="nft_pic_info">
                    <span className="nft_pic_title">live Arts</span>
                    <span className="nft_pic_by">Nicholas Daniels</span>
                  </span>
                </Link>
              </span>
              <div className="nft_pic_wrap">
                <img src={metaDatas.get(nft.id)?.image} className="lazy img-fluid" alt="" />
              </div>
            </div>
          </CustomSlide>
        })}

      </Slider>
    </div>
  );
}
