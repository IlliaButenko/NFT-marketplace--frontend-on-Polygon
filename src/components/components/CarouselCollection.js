import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { navigate } from "@reach/router";
import * as Collection from '../../apis/collection';

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

export default function CarouselCollection({theme}) {
  const [collections, setCollections] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  async function fetchCollections() {
    setLoading(true);
    try {
      const { data } = await Collection.collections();
      const arr = data.items.filter(item => item.isHot === true);
      if(arr.length > 0) {
        setCollections(arr);
      }else {
        setCollections(data.items);
      }
      // setCollections(data.items);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchCollections();
  },[])

  return (
    <div className='nft'>
      <Slider {...settings}>
        {collections.map((collection, index) => (
          <CustomSlide className='itm' index={1} key={index}>
            <div className={`nft_coll ${theme ? 'background_item_collection' : '' }`} onClick={() => navigate(`/collection/${collection?._id}`)}>
              <div className="nft_wrap hot-collection-block">
                <span className="hot-collection-image"><img src={collection?.image || '/img/collections/no-image.webp'} className="lazy hot-collection-image" height="200px" alt="" /></span>
              </div>
              <div className="nft_coll_info mt-4">
                <span><h4 className={theme ? 'theme-dark-color' : ''}>{collection?.name}</h4></span>
              </div>
            </div>
          </CustomSlide>
        ))}

      </Slider>
    </div>
  );
}
