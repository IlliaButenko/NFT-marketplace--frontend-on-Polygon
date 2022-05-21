import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import Footer from '../components/footer';
import NftCard from '../components/NftCard/index';
import { useTranslation } from 'react-i18next';
import { NftType, SaleType } from '../../const';
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



// const options2 = [
//   { value: 'All Items', label: 'All Items' },
//   { value: 'Single Items', label: 'Single Items' },
//   { value: 'Bundles', label: 'Bundles' }
// ]


const Explore = ({ theme, translate }) => {
  const { t } = useTranslation();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [height, setHeight] = useState(300);
  const [type, setType] = useState(NftType.All_CATEGORIES)
  const [store, setStore] = useState([]);
  const [searchText, setSearchText] = useState();
  const [search, setSearch] = useState(false);

  const [filterType, setFilterType] = useState();
  const [filterSaleType, setFilterSaleType] = useState();

  const options = [
    { value: NftType.All_CATEGORIES, label: t('allCategories') },
    { value: NftType.ART, label: t('Art') },
    { value: NftType.MUSIC, label: t('Music') },
    { value: NftType.VIDEO, label: t('Videos') }
  ]
  const options1 = [
    { value: '-1', label: t('All') },
    { value: SaleType.FIXTED, label: t('buyNow') },
    { value: SaleType.AUCTION, label: t('onAuction') },
  ]


  const onImgLoad = ({ target: img }) => {
    if (img.offsetHeight > 300) return
    if (height < img.offsetHeight) {
      setHeight(img.offsetHeight)
    }
  }
  const getNftList = async () => {
    setLoading(true);
    try {
      const { data } = await SaleApi.listMarket();
      setNfts(data.items);
      setStore(data.items);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNftList();
  }, [])

  console.log('nfts explore', nfts)

  useEffect(() => {
    switch (filterType) {
      case NftType.ART:
        document.getElementsByClassName('css-1uccc91-singleValue')[0].textContent = t('Art');
        break;
      case NftType.MUSIC:
        document.getElementsByClassName('css-1uccc91-singleValue')[0].textContent = t('Music');
        break;
      case NftType.VIDEO:
        document.getElementsByClassName('css-1uccc91-singleValue')[0].textContent = t('Videos');
        break;
      default:
        document.getElementsByClassName('css-1uccc91-singleValue')[0].textContent = t('allCategories');
    }

    switch (filterSaleType) {
      case SaleType.FIXTED:
        document.getElementsByClassName('css-1uccc91-singleValue')[1].textContent = t('buyNow');
        break;
      case SaleType.AUCTION:
        document.getElementsByClassName('css-1uccc91-singleValue')[1].textContent = t('onAuction');
        break;
      default:
        document.getElementsByClassName('css-1uccc91-singleValue')[1].textContent = t('All');
    }
  }, [translate])

  useEffect(() => {
    let arr = [];
    switch (filterType) {
      case NftType.ART:
        arr = store.filter(item => item?.nft?.fileType === NftType.ART);
        break;
      case NftType.MUSIC:
        arr = store.filter(item => item?.nft?.fileType === NftType.MUSIC);
        break;
      case NftType.VIDEO:
        arr = store.filter(item => item?.nft?.fileType === NftType.VIDEO);
        break;
      default:
        arr = [...store];
    }

    switch (filterSaleType) {
      case SaleType.FIXTED:
        arr = arr.filter(item => item?.saleType === SaleType.FIXTED);
        break;
      case SaleType.AUCTION:
        arr = arr.filter(item => item?.saleType === SaleType.AUCTION);
        break;
      default:
    }

    if(searchText?.trim()){
      arr = arr.filter(item => item?.nft?.name?.toLowerCase().includes(searchText?.trim()?.toLowerCase()));
    }
    setNfts(arr);
  }, [filterType, filterSaleType, searchText])

  return (
    <div>
      <section className='jumbotron breadcumb no-bg'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className={`text-center ${theme ? 'theme-dark-color' : ''}`}>{t('explore')}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="items_filter">
              <form className="row form-dark" id="form_quick_search" name="form_quick_search">
                <div className="col">
                  <input className={`form-control ${theme ? 'theme-dark-color' : ''}`} id="name_1" name="name_1" placeholder={t('placeholder.search')} type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
                  <button id="btn-submit" onClick={e => {
                    e.preventDefault();
                    setSearch(!search);
                  }}><i className="fa fa-search bg-color-secondary"></i></button>
                  <div className="clearfix"></div>
                </div>
              </form>
              <div className='dropdownSelect one'><Select className='select1' styles={customStyles} menuContainerStyle={{ 'zIndex': 999 }} defaultValue={options[0]} options={options} onChange={e => { setFilterType(e.value) }} /></div>
              <div className='dropdownSelect two'><Select className='select1' styles={customStyles} defaultValue={options1[0]} options={options1} onChange={e => { setFilterSaleType(e.value) }} /></div>
              {/* <div className='dropdownSelect three'><Select className='select1' styles={customStyles} defaultValue={options2[0]} options={options2} /></div> */}
            </div>
          </div>
        </div>
        <div className="row">
          {nfts.map((nft, index) => (
            <NftCard item={nft} key={index} onImgLoad={onImgLoad} height={height} theme={theme} type='market' />
          ))}

          {loading &&
            <div className="col-lg-12">
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        </div>
      </section>

      <Footer />
    </div>
  )
}
export default Explore;
