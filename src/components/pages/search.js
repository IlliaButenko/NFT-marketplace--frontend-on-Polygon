import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import Footer from '../components/footer';
import NftCardSearch from '../components/NftCardSearch';
import { useTranslation } from 'react-i18next';
import { chainPrefix } from '../../const';
import { NftType } from '../../const';
import { useParams, navigate } from '@reach/router';
import * as SaleApi from '../../apis/nft';

const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "#212428",
    color: "#fff",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "#16181b",
    }
  }),
  menu: base => ({
    ...base,
    background: "#212428 !important",
    borderRadius: 0,
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    padding: 0
  }),
  control: (base, state) => ({
    ...base,
    padding: 2
  })
};


// const options = [
//   { value: NftType.All_CATEGORIES, label: 'All categories' },
//   { value: NftType.ART, label: 'Art' },
//   { value: NftType.MUSIC, label: 'Music' },
//   { value: NftType.VIDEO, label: 'Videos' }
// ]
// const options1 = [
//   { value: 'Buy Now', label: 'Buy Now' },
//   { value: 'On Auction', label: 'On Auction' },
// ]
// const options2 = [
//   { value: 'All Items', label: 'All Items' },
//   { value: 'Single Items', label: 'Single Items' },
//   { value: 'Bundles', label: 'Bundles' }
// ]


const Search = ({ theme }) => {
  const { t } = useTranslation();
  const [nfts, setNfts] = React.useState([]);
  const [searchkey, setSearchkey] = React.useState('');
  const [loading, setLoading] = React.useState([]);
  const [height, setHeight] = React.useState(300);
  const [type, setType] = React.useState(NftType.All_CATEGORIES)
  const [store, setStore] = React.useState([]);
  const { param } = useParams();

  const onImgLoad = ({ target: img }) => {
    if (img.offsetHeight > 300) return
    if (height < img.offsetHeight) {
      setHeight(img.offsetHeight)
    }
  }

  const getNftList = async (param) => {
    setLoading(true);
    try {
      const { data } = await SaleApi.searchMarket({ search: param });
      setNfts(data.items);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }


  function handleChange(e) {
    let arr = [];
    switch (e.value) {
      case NftType.ART:
        arr = store.filter(item => item.get('type') === 'image');
        break;
      case NftType.MUSIC:
        arr = store.filter(item => item.get('type') === 'audio');
        break;
      case NftType.VIDEO:
        arr = store.filter(item => item.get('type') === 'video');
        break;
      default:
        arr = [...store];
    }
    setNfts(arr);
  }

  React.useEffect(() => {
    getNftList(param ??searchkey);
    document.body.classList.add('searchPage');
  }, [param,searchkey])

  // React.useEffect(() => {
  //   getNftList(searchkey);
  //   document.body.classList.add('searchPage');
  //   return () =>  document.body.classList.remove('searchPage');
  // }, [searchkey])

  const goBackToPage = () => {
    document.body.classList.remove('searchPage');
    navigate(-1)
  }


  return (
    <div>
      <header id="myHeader2" className="navbar white searchHeader">
        <div className="header-wrapper">
          <div className="header-main">
            <div className="logo px-0">
              <div className="navbar-title navbar-item">
                <p className="non-active" onClick={() => goBackToPage()}>
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </p>
              </div>
            </div>
            <div className="search ">
              <input id="quick_search" className="xs-hide form-control " name="quick_search" placeholder="Search item here..." type="text" value="" />
            </div>
            <div className="searchMob">
              <input id="quick_search" onChange={(e) => setSearchkey(e.target.value)} className="xs-hide form-control " name="quick_search" placeholder="Search item here..." type="text" value={searchkey} />
            </div>
          </div>
        </div>
      </header>
      <section className='jumbotron breadcumb no-bg'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className={`text-center ${theme ? 'theme-dark-color' : ''}`}>{t('Search Result')}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="items_filter">
            </div>
          </div>
        </div>
        <div className="row">
          {(param !== undefined || searchkey !== ''  )&&
            (nfts?.length > 0 ? nfts.map((nft, index) => (
              <NftCardSearch sale={nft} key={index} onImgLoad={onImgLoad} height={height} theme={theme} type='market' />
              // <NftCard nft={nft} key={index} onImgLoad={onImgLoad} height={height} chainId={nft.chainId} theme={theme} type={type} />
            ))
            : <h2>No Item with <span style={{ fontWeight: "bold", color: 'blue' }}>{param ?? searchkey}</span> key</h2>)
          }

        </div>
      </section>

      <Footer />
    </div>
  )
}
export default Search;
