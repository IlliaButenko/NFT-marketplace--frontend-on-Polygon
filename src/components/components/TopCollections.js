import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import Loading from './Loading';
import { useTranslation } from 'react-i18next';
import { navigate } from '@reach/router';
import * as Collection from '../../apis/collection';
import * as WalletAPI from '../../apis/wallet';
import { useWeb3 } from '../../providers/Web3Provider/provider';
import Blockie from './Blockie';

const style = {
  container: provided => ({
    ...provided,
    fontSize: '30px',
    width: '320px',
    // marginLeft: '10px',
  }),
  control: base => ({
    ...base,
    border: 0,
    boxShadow: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#3ACE00',
    fontSize: '30px',
  })
};

const style_dark = {
  container: provided => ({
    ...provided,
    fontSize: '30px',
    width: '320px',
    backgroundColor: 'black'
    // marginLeft: '10px',
  }),
  control: base => ({
    ...base,
    border: 0,
    boxShadow: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#3ACE00',
    fontSize: '30px',
  })
};

function TopCollection({ theme, translate }) {
  const { user, } = useWeb3();
  const { t } = useTranslation();
  const [author, setAuthor] = React.useState(null);
  const [collections, setCollections] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [collectionType, setCollectioType] = React.useState('week');
  const options = [
    { value: 'week', label: t('home.topCollectionOption.last7days') },
    { value: 'day', label: t('home.topCollectionOption.today') },
    { value: 'month', label: t('home.topCollectionOption.last30days') },
  ];

  function changeTime(time) {
    fetchTop(time.value);
  }


  // async function fetchCollections(quantityMap = new Map()) {
  // }

  async function fetchCollections() {
    setLoading(true);
    try {
      const { data } = await Collection.collections();
      const arr = data.items.filter(item => item?.isTop === true);
      if (arr.length > 0) {
        setCollections(arr);
      } else {
        setCollections(data.items);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCollections();
    fetchUserDetail();
  }, [])

  useEffect(() => {
    fetchUserDetail();
  }, [user])

  async function fetchTop(type) {
  }

  async function fetchUserDetail() {
    const { data } = await WalletAPI.profile(user?.id);
    setAuthor(data);
  }

  React.useEffect(() => {
    const textContent = document.getElementsByClassName('css-1gyu32j-singleValue')[0].textContent;
    document.getElementsByClassName('css-1gyu32j-singleValue')[0].textContent = t('')
    switch (collectionType) {
      case 'day':
        document.getElementsByClassName('css-1gyu32j-singleValue')[0].textContent = t('home.topCollectionOption.today');
        break;
      case 'week':
        document.getElementsByClassName('css-1gyu32j-singleValue')[0].textContent = t('home.topCollectionOption.last7days');
        break;
      case 'month':
        document.getElementsByClassName('css-1gyu32j-singleValue')[0].textContent = t('home.topCollectionOption.last30days')
        break;
      default:
        document.getElementsByClassName('css-1gyu32j-singleValue')[0].textContent = t('home.topCollectionOption.last7days');
    }
  }, [translate]);

  useEffect(() => {
    const bg = document.getElementsByClassName('css-c8odyh-control');
    const bg_item = document.getElementsByClassName('css-26l3qy-menu');
    if (theme) {
      if (bg.lenght > 0) {
        bg[0].style.backgroundColor = 'black';
      }
      if (bg_item.length > 0) {
        bg_item[0].style.backgroundColor = 'black';
      }
    } else {
      if (bg.lenght > 0) {
        bg[0].style.backgroundColor = 'white';
      }
      if (bg_item.length > 0) {
        bg_item[0].style.backgroundColor = 'white';
      }
    }
  }, [theme])

  return (
    <div className="container newWork topCollection" style={{ marginBottom: '80px' }}>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='sectionTitle'>
            <h2>{t('home.topCollection')}
              {/* <span style={{ color: `${ theme ? 'white' : 'black'}` }}>{t('home.topCollection')}</span> */}
              <Select options={options}
                isSearchable={false}
                // className="ml-2"
                styles={theme ? style_dark : style}
                className={theme ? 'theme_dark' : ''}
                onChange={(e) => { changeTime(e); setCollectioType(e.value) }}
                defaultValue={options[0]} />
            </h2>
          </div>
        </div>
      </div>
      <div className='col-lg-12 mt-3'>
        <div>
          {loading
            ? <Loading />
            : <ul className="row top_collection">
              {collections?.map((collection, index) => (
                <li key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4 auction__card" onClick={() => { navigate(`/collection/${collection?._id}`) }}>
                  <div className={`nft__item m-0 nft__item-light ${theme ? 'background_item_collection' : ''}`}>
                    <div className="nft__item_wrap">
                      <span className='image_card' onClick={() => { navigate(`/collection/${collection?._id}`) }}>
                        <img src={collection?.image || '/img/collections/no-image.webp'} alt="" width="50px" height="50px" />
                      </span>
                    </div>
                    <div className={theme ? 'theme-dark-color' : 'nft__item_info'}>
                      <span className='font-18 bold' onClick={() => { }}>
                        {collection?.name}
                      </span>
                      <div className="flexBlock profileDes topCollect">
                        <div className="author_list_pp">
                          <span>
                            {collection?.creator ? <img src={collection?.creator?.avatar} alt="" /> : <Blockie address={author?.address} scale={17} />}
                          </span>
                        </div>
                        <div className="nft__item_price">{collection?.creator ? collection?.creator?.title :"Unknown"}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
}

export default TopCollection;
