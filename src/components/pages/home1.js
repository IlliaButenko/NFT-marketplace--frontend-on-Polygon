import React, { useEffect, useState } from 'react';
import SliderCarousel from '../components/SliderCarouselsingle';
import CarouselCollection from '../components/CarouselCollection';
import TopCollections from '../components/TopCollections';
import NewItems from '../components/NewItems';
import AuthorList from '../components/authorList';
import AuctionItems from '../components/AuctionItems';
import Footer from '../components/footer';
import { useTranslation } from 'react-i18next';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import { navigate } from '@reach/router';
import i18n from '../../i18n';
import { toast } from 'react-toastify';
import { useWeb3 } from '../../providers/Web3Provider/provider';
import auctionimg1 from '../../assets/img/auction-img.png'
import bidimg2 from '../../assets/img/big-img-2.png'
import bidimg3 from '../../assets/img/bid-img-3.png'
import * as SaleApi from '../../apis/nft';
import Blockie from '../components/Blockie';


const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const Home = ({ theme, search, translate }) => {
  const [currentNfts, setCurrentNfts] = React.useState([]);
  const [height, setHeight] = React.useState(300);
  const img = React.useRef(null);
  const { login, user, logout, } = useWeb3();

  useEffect(() => {
    // i18n.changeLanguage('en-US');
    i18n.changeLanguage('ko-KR');
    fetchFeatureItem();
  }, []);

  const fetchFeatureItem = async () => {
    const { data } = await SaleApi.listMarket();
    setCurrentNfts(data?.items);
  }
  const { t } = useTranslation();

  const onImgLoad = ({ target: img }) => {
    if (img.offsetHeight > 300) return
    if (height < img.offsetHeight) {
      setHeight(img.offsetHeight)
    }
  }

  return (
    <div className='homePage'>
      <section className="jumbotron no-bg bannerBlock">
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7'>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
                <h1 className="largeTitle"> {t('home.hero.title')} </h1>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
                <p className="paraBlack">
                  {t('home.hero.subtitle')}
                </p>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={800} duration={900} triggerOnce>
                <div className="bannerBtn d-flex">
                  <button onClick={() => navigate('/explore')} className="btn btn-main btnShade">{t('explore')}</button>
                  <button onClick={() => user?.isCreator ? navigate('/create') : toast.error(t('adminProveMsg'))} className={`btn btn-out-main btnNoBg ${theme ? 'bg_input theme-dark-color' : ''}`}>{t('create')}</button>
                </div>
                <div className="mb-sm-30"></div>
              </Reveal>
              <div className="spacer-double"></div>
            </div>
            {currentNfts?.length > 0 && currentNfts?.slice(0, 1).map((nftItem, index) => {
              return (
                < div className='col-lg-5 px-0' key={index}>
                  <div className='colBlockRight withShadow'>
                    <div className='cardImg'>
                      {nftItem?.nft?.fileType === "image" ?
                        <img
                          onLoad={onImgLoad}
                          src={nftItem?.nft?.image} className="lazy nft__item_preview" alt="" ref={img} />
                        : nftItem?.nft?.fileType === "video" ?
                          <video width="100%" height="" controls src={nftItem?.nft?.image}
                            onLoad={onImgLoad}
                          >
                          </video>
                          : nftItem?.nft?.fileType === "audio" ? <audio style={{ width: '100%' }} controls muted>
                            <source src={nftItem?.nft?.image} type={nftItem?.nft?.originType} />
                          </audio>
                            : <img
                              onLoad={onImgLoad}
                              src={nftItem?.nft?.image} className="lazy nft__item_preview" alt=""
                              ref={img} />
                      }
                      <img src={nftItem.nft?.image} alt='Card Image' />
                    </div>
                    <div className='counterBlock banner rowGap-19'>
                      <h4 className='nonwrap_text userNm'>{nftItem.nft?.name}</h4>
                      <div className='etsPrice'>
                        <div className='profileLeft'>
                          <div className="profileDes topCollect">
                            <div className="author_list_pp">
                              <span className='profileImg'>
                                {nftItem.seller ? <img src={nftItem.seller?.avatar} alt="" /> : <Blockie address={nftItem.seller?.address} scale={17} />}
                              </span>
                              <span className='userId'>{nftItem.nft?.name}</span>
                            </div>
                          </div>
                        </div>
                        <div className='profileRight'>
                          <h2 className='shadeText'>{nftItem.unitPrice} {t(`MaticText`)}</h2>
                        </div>
                      </div>
                      {/* <div className='counterRight'>
                        <div className='counterData'>
                          <h4>
                            02
                            <span>Days</span>
                          </h4>
                          <h4>
                            01
                            <span>Hours</span>
                          </h4>
                          <h4>
                            02
                            <span>Minutes</span>
                          </h4>
                          <h4>
                            02
                            <span>Seconds</span>
                          </h4>
                        </div>
                      </div> */}
                    </div>
                    <div className="bannerBtn singleBtn rowGap-19">
                      {/* <button className="btn btn-main btnShade">{t(`nft.placeBid`)}</button> */}
                      <button className="btn btn-out-main btnNoBg" onClick={() => navigate(`/item/${nftItem.nft?.id}`)}>{t(`View`)}</button>
                    </div>
                  </div>
                </div>
              )
            })
            }
            {/* Add For Show Loading */}
            {/* <SliderCarousel />  */}
          </div>
        </div>
      </section >

      <section className='liveAuction container'>
        {/* <div className='container'> */}
        <div className='row'>
          <div className='col-lg-12'>
            <h2 className='sectionTitle'>{t('home.liveAuction')}</h2>
          </div>
          <div className='auctionBlock'>
            <div className='row'>
              <div className='col-md-8'>
                <div className='auctionLeftBlock'>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='innerLeftBlock'>
                        <div className='auctionImg'>
                          <img src={auctionimg1} alt="Auction Image" />
                        </div>
                      </div>
                    </div>
                    <div className='col-md-7'>
                      <div className='innerRightBlock'>
                        <div className='profileDetail bgGray'>
                          <div className='profileImg'>
                            <img src='https://drcblockchain.mypinata.cloud/ipfs/QmethtAMcxvpen8A5frVykjfBWKx8AuHbAW35dDdmvSo5c' alt="Profile Image" />
                          </div>
                          <p className='userNm'>@johnadam</p>
                        </div>
                        <div className='blockDetail'>
                          <h4 className='fontRegular-25'>What Was Will Never Be</h4>
                          <p className='paraTexttGray'>
                            Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie. Lorem Ipsum ist in der Industrie bereits der Standard Demo-Text seit 1500, als ein unbekannter Schriftsteller eine Hand voll Wörter nahm
                          </p>
                        </div>
                        <div className='auctionBid'>
                          <p className='bidTitle mb-0'>Current Bid</p>
                          <div className='counterBlock'>
                            <div className='flexBlock rowGap-33'>
                              <div className='countLeft'>
                                <div className='etsPrice flexBlock'>
                                  <svg width="24" height="23" viewBox="0 0 24 23" fill="none">
                                    <g clipPath="url(#clip0_140_40)">
                                      <path d="M5.59058 11.9173L12.4856 1.83344L19.3807 11.9173L12.4856 15.5842L5.59058 11.9173Z" fill="#E781A9" />
                                      <path d="M12.4856 1.83344L19.3806 11.9173L12.4856 15.5842V1.83344Z" fill="#DA3979" />
                                      <path d="M5.59058 13.2924L12.4856 16.9593L19.3807 13.2924L12.4856 22.0012L5.59058 13.2924Z" fill="#E781A9" />
                                      <path d="M12.4856 16.9593L19.3807 13.2924L12.4856 22.0012V16.9593ZM5.59058 11.9173L12.4856 9.16718L19.3807 11.9173L12.4856 15.5842L5.59058 11.9173Z" fill="#DA3979" />
                                      <path d="M12.4856 9.16718L19.3806 11.9173L12.4856 15.5842V9.16718Z" fill="#671334" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_140_40">
                                        <rect width="23.6401" height="22.0012" fill="white" transform="translate(0.172974 0.916748)" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  <h2 className='shadeText'>2.5 ETH</h2>
                                </div>
                              </div>
                            </div>
                            <div className='counterRight widthFull'>
                              <p className='font-16 bold mb-0'>
                                Auction Ends May 6, 2022 at 11:43am GMT+5:30
                              </p>
                              <div className='counterData'>
                                <h4>
                                  02
                                  <span>Days</span>
                                </h4>
                                <h4>
                                  01
                                  <span>Hours</span>
                                </h4>
                                <h4>
                                  02
                                  <span>Minutes</span>
                                </h4>
                                <h4>
                                  02
                                  <span>Seconds</span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bannerBtn d-flex rowGap-19">
                          <button className="btn btn-main btnShade">{t(`placeBid`)}</button>
                          <button className="btn btn-out-main btnNoBg">{t(`View`)}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='auctionRightBlock'>
                  <div className='bidBlockWrapper'>
                    <div className='bidBlockImg'>
                      <img src={bidimg2} alt="Bid Image" />
                    </div>
                    <div className='profileDetail bgGray bgBlack'>
                      <div className='profileImg'>
                        <img src={bidimg3} alt="Profile Image" />
                      </div>
                      <p className='userNm'>@johnadam</p>
                    </div>
                    <div className='auctionBid'>
                      <div className='counterBlock'>
                        <div className='counterRight widthFull'>
                          <div className='counterData'>
                            <h4>
                              02
                              <span>Days</span>
                            </h4>
                            <h4>
                              01
                              <span>Hours</span>
                            </h4>
                            <h4>
                              02
                              <span>Minutes</span>
                            </h4>
                            <h4>
                              02
                              <span>Seconds</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bidBlockWrapper'>
                    <div className='bidBlockImg'>
                      <img src={bidimg2} alt="Bid Image" />
                    </div>
                    <div className='profileDetail bgGray bgBlack'>
                      <div className='profileImg'>
                        <img src={bidimg3} alt="Profile Image" />
                      </div>
                      <p className='userNm'>@johnadam</p>
                    </div>
                    <div className='auctionBid'>
                      <div className='counterBlock'>
                        <div className='counterRight widthFull'>
                          <div className='counterData'>
                            <h4>
                              02
                              <span>Days</span>
                            </h4>
                            <h4>
                              01
                              <span>Hours</span>
                            </h4>
                            <h4>
                              02
                              <span>Minutes</span>
                            </h4>
                            <h4>
                              02
                              <span>Seconds</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AuctionItems theme={theme} search={search} />
        {/* </div> */}
      </section>

      <section className='container no-top newWork'>
        <div className='row'>
          <div className='col-lg-12'>
            <h2 className='sectionTitle'>{t('home.newItems')}</h2>
          </div>
        </div>
        <NewItems theme={theme} search={search} />
      </section>
      <TopCollections theme={theme} search={search} translate={translate} />

      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <h2 className='style-2'>{t('home.hotCollections')}</h2>
          </div>
        </div>
        <div className='container no-top'>
          <div className='row'>
            <div className='col-lg-12 px-0'>
              <CarouselCollection theme={theme} />
            </div>
          </div>
        </div>
      </section>

      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <h2 className='style-2'>{t('home.topSellers')}</h2>
          </div>
          <div className='col-lg-12'>
            <AuthorList theme={theme} />
          </div>
        </div>
      </section>
      <Footer />

    </div >
  );
}

export default Home;
