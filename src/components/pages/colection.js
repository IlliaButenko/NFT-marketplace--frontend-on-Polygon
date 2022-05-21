import React, { useEffect, useState } from "react";
import Footer from '../components/footer';
import NftCard from '../components/NftCard';
import Loading from '../components/Loading';
import { createGlobalStyle } from 'styled-components';
import { useParams } from "@reach/router";
import { getEllipsisTxt } from "../../helpers/fommaters";
import MyNftCard from '../components/MyNftCard';
import { useTranslation } from 'react-i18next';
import * as CollectionAPI from '../../apis/collection';
import { NftTypeEnum } from '../../interfaces/nft.interface';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #FAF6F1;
    border-bottom: solid 1px #ccc !important;
  }
`;

const Collection = function () {
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState();
  const [createdNfts, setCreatedNfts] = useState([]);
  const [onSaleNfts, setOnSaleNfts] = useState([]);
  const { id } = useParams();
  const { t } = useTranslation();

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  async function getCreatedNfts() {
    setLoading(true);
    try {
      const { data } = await CollectionAPI.getNfts(id);
      setCreatedNfts(data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  async function getOnSaleNfts() {
    setLoading(true);
    try {
      const { data } = await CollectionAPI.getSaleNfts(id);
      setOnSaleNfts(data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  async function getCollection() {
    setLoading(true);
    try {
      const { data } = await CollectionAPI.getById(id);
      setCollection(data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCollection();
    getCreatedNfts();
    getOnSaleNfts();
  }, [])

  return (
    <div>
      <GlobalStyles />
      <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${collection?.cover})` }}>
        <div className='mainbreadcumb'>
        </div>
      </section>

      <section className='container d_coll no-top no-bottom'>
        <div className='row'>
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                <div className="d_profile_img">
                  <img src={collection?.image || '/img/collections/no-image.webp'} alt="" style={{ width: '150px', height: '150px', marginTop: '-75px' }} />
                </div>

                <div className="profile_name">
                  <h4>
                    {collection?.name}
                    <div className="clearfix"></div>
                    <span id="wallet" className="profile_wallet">{getEllipsisTxt(collection?.address)}</span>
                  </h4>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="items_filter">
              <ul className="de_nav">
                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>{t('nft.onSale')}</span></li>
                <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>{t('nft.Created')}</span></li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id='zero1' className='onStep fadeIn'>
            <div className="row">
              {onSaleNfts?.map((nft, index) => (
                <NftCard sale={nft} key={index} height={300} type={NftTypeEnum.INSALE} />
              ))}
            </div>
          </div>
        )}
        {openMenu1 && (
          <div id='zero2' className='onStep fadeIn'>
            <div className="row">
              {createdNfts?.filter(item => item.tokenAddress === collection?.address).map((nft, index) => (
                <MyNftCard nft={nft} key={index} height={300} />
              ))}
            </div>
          </div>
        )}

        {loading &&
          <div className="row">
            <Loading />
          </div>
        }
      </section>


      <Footer />
    </div>
  );
}
export default Collection;
