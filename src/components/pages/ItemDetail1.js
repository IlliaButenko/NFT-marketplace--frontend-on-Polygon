import React, { useEffect } from "react";
import Clock from "../components/Clock";
import { getEllipsisTxt } from '../../helpers/fommaters';
import { SaleType, chainPrefix } from '../../const.js';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useParams, navigate, useNavigate, useLocation } from "@reach/router";
import Blockie from "../components/Blockie";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {useWeb3} from "../../providers/Web3Provider/provider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #FAF6F1;
    border-bottom: solid 1px #ccc !important;
  }
`;


const Colection = function({theme}) {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const { user } = useWeb3();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [auctionDetail, setAuctionDetail] = React.useState({});
  const navigate = useNavigate();

  const [nft, setNft] = React.useState();
  const [metaData, setMetaData] = React.useState({});
  const [marketItem, setMarketItem] = React.useState();
  const [info, setInfo] = React.useState();
  const [seller, setSeller] = React.useState();
  const [bidValue, setBidValue] = React.useState();
  const [bids, setBids] = React.useState([]);

  const { id, chainId } = useParams();
  const location = useLocation();
  const isLazy = location.pathname.includes('lazy');

  async function getNFT(){
  }

  async function fetchAuctionDetail() {
  }

  const tokenAddress="adssdsd";
  const tokenId=null;
  const marketId=null;

  const getNftMetaData = async (ipfsLink) => {
  }

  const getNftOwner = async (address) => {
  }

  const getMarketItem = async (tokenAddress, tokenId) => {
  }

  async function fetchBids(market) {
  }

  const handleBtnClick = () => {
  };

  const handleBtnClick1 = () => {
  };

  async function fetchCollection() {
  }

  async function updateHistory(tokenId, chainId,  token_address, action, quantity, price) {
  }

  async function purchase() {
  }

  async function endAuction() {
  }

  return (
    <div>
      <GlobalStyles />
    
      <div className='item-detail-page'>
        <div className='row '>
          <div className="col-md-5  left-col">
            <div className="text-center ">
              { nft && (nft.get('type')==="video"
                ? <video width="100%" height="" controls src={nft?.get('image')}></video>
                : nft.get('type')==="audio"
                ? <audio controls autoplay muted><source src={nft?.get('image')} type={nft?.get('typeOrign')}/></audio>
                : <img src={nft.get('image')} className="img-fluid img-rounded mb-sm-30 image-item" alt=""/>
              )}
            </div>

            <div className={`description-item ${theme ? 'border_item_radius': 'box-border'}`}>
              {/* <div className={`descripton-item-header top ${theme ? 'background_item_collection theme-dark-color': ''}`}>
                <SubjectIcon className='icon-on-des'/>
                Description
              </div>
              <div className={`descripton-item-content ${theme ? 'background_item_collection theme-dark-color border_top_dark': ''}`}>
                {metaData?.description}
              </div>
              <div className={`descripton-item-header mid ${theme ? 'background_item_collection theme-dark-color border_top_dark': ''}`}>
                <VerticalSplitIcon className='icon-on-des'/>
                About Author
                {showAboutAuthor
                ?<KeyboardArrowUpIcon className="icon-end-des" onClick={() => setShowAboutAuthor(pre => !pre)}/>
                : <KeyboardArrowDownIcon className="icon-end-des" onClick={() => setShowAboutAuthor(pre => !pre)}/>}
              </div>
              {showAboutAuthor && <div className={`descripton-item-content ${theme ? 'background_item_collection theme-dark-color border_top_dark': ''}`}>
                Content about author
              </div>
              }
              <div className={`descripton-item-header end ${theme ? 'background_item_collection theme-dark-color border_top_dark': ''}`}>
                <BallotIcon className='icon-on-des'/> 
                Details
                {showDetails
                ?<KeyboardArrowUpIcon className="icon-end-des" onClick={() => setShowDetails(pre => !pre)}/>
                : <KeyboardArrowDownIcon className="icon-end-des" onClick={() => setShowDetails(pre => !pre)}/>}
              </div>
              {showDetails && <div className={`descripton-item-content end ${theme ? 'background_item_collection theme-dark-color border_top_dark': ''}`}>
                <div className="row gc">
                  <div className="col-lg-6">Contract Address</div>
                  <div className="col-lg-6 text-detail">a</div>
                </div>
                <div className="row gc">
                  <div className="col-lg-6">Token ID</div>
                  <div className="col-lg-6 text-detail">a</div>
                </div>
                <div className="row gc">
                  <div className="col-lg-6">Token Standard</div>
                  <div className="col-lg-6 text-detail">a</div>
                </div>
                <div className="row gc">
                  <div className="col-lg-6">Blockchain</div>
                  <div className="col-lg-6 text-detail">a</div>
                </div>
                <div className="row">
                  <div className="col-lg-6">Metadata</div>
                  <div className="col-lg-6 text-detail">a</div>
                </div>

              </div>
              } */}
            </div>

          </div>
          <div className="col-md-7">
            <div className="item_info">
              <div className={`de_countdown mb-2 ${theme ? 'theme-dark' : ''}`} style={{ fontSize: '20px', color: "#ccc" }}>
                {auctionDetail?.id &&
                  <Clock deadline={new Date(auctionDetail?.get('endTime') * 1000)} />
                }
              </div>
              {/* <h4 className="author-name-text">Juan Blanco Lozano</h4> */}
              <h2 style={{ color: "#000"}}>{nft?.get('title')}</h2>
              <h4 className={theme ? 'theme-dark-color-text' : ''}>{t('nft.supply')}: {marketItem?.get('quantity') ?? 1}</h4>
              {/* <p>{metaData?.description}</p> */}
              <br></br>
              {/* <br></br> */}
              <div className='row'>
                <div className="col-lg-6">
                  <h6 className={theme ? 'theme-dark-color-text' : ''}>{t('nft.creator')}</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span>
                        <Blockie address={nft?.get('creator')} scale={5} onClick={() => navigate(`/Author/${nft?.get('creator')}`)} />
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span className={theme ? 'theme-dark-color-text' : ''}> {getEllipsisTxt(nft?.get('creator'))} </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h6 className={theme ? 'theme-dark-color-text' : ''}>{t('nft.seller')}</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span >
                        <Blockie address={nft?.get('seller')} scale={5} onClick={() => navigate(`/Author/${nft?.get('seller')}`)} />
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span className={theme ? 'theme-dark-color-text' : ''}> {getEllipsisTxt(nft?.get('seller'))} </span>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <br></br>
              <div className={`card ${theme ? 'no-boder' : ''}`}>
                <div className={`card-header-id gr  ${theme ? 'background_item_collection' : ''}`}> 
                  <AccessTimeIcon className='clock-icon'/>
                  Sale ends February 23, 2022 at 7:52am +07 
                </div>
                <div className={`card-content-id activity end pd ${theme ? 'background_item_collection border_top_dark' : ''}`}>
                  <p className={`cp-p ${theme ? 'theme-dark-color-text' : ''}`}>Current price</p>
                  <div className='div-price'>
                    {/* <p className='price-coin'>100</p> */}
                    <div style={{ fontSize: '25px' }} className={`ml-5 text-dark fw-bold ${theme ? 'theme-dark-color' : ''}`}>
                      {bids.length > 0
                        ? <span>Highest Bid: {bids[0]?.get('highestBid') / 1e18} MATIC</span>
                        : <span>{nft?.get('price') / 1e18} MATIC</span>
                      }

                    </div>
                    {/* <p className='price-do'>($209.511,00)</p> */}
                  </div>
                  <br></br>
                  <div className='div-buybtn-container'>

                      {nft?.get('seller') !== user.address
                      ? !marketItem?.isSold && <button className="btnBuyNow" onClick={() => purchase()}>
                        {loading
                          ? 'Wait...'
                          : (+marketItem?.get('saleType') === SaleType.AUCTION 
                                ? 'Place a bid' 
                                : <>
                                    <AccountBalanceWalletIcon className='icon'/>
                                    Buy now
                                  </>
                          )
                        }
                      </button>
                      : <p></p>
                    }
                    {/* <button className={theme ? 'btn btn-main' : "btnMakeOffer"}>
                      <LocalOfferIcon className='icon'/>
                      Make offer
                    </button> */}
                  </div>
                </div>
              </div>
              

              {/* <br></br> */}

              

              {/* <div className="spacer-40"></div> */}

              {/* <div style={{ fontSize: '25px' }} className="ml-5 text-dark fw-bold">
                {bids.length > 0
                  ? <span>Highest Bid: {bids[0]?.get('highestBid') / 1e18} {getUnit(chainId)}</span>
                  : <span>{marketItem?.get('price') / 1e18} {getUnit(chainId)}</span>
                }

              </div> */}

              {/* <div className="spacer-40"></div> */}

              <div className="d-flex align-items-center">
                <div>
                  {+marketItem?.get('saleType') === SaleType.AUCTION && auctionDetail?.id &&
                    <>
                      {(auctionDetail?.get('endTime') * 1000 > Date.now())
                        ? <input type="number" className={`form-control ${theme ? 'bg_input theme-dark-color' : ''}`} placeholder="Bid value"
                          min="0.00001"
                          step="0.00001"
                          style={{ padding: '5px', margin: 0 }}
                          value={bidValue}
                          onChange={(e) => setBidValue(e.target.value)}
                        />
                        : <button className="btn btn-main" onClick={() => endAuction()}>
                          {+marketItem?.get('seller') !== +user.address
                            ? 'Withdraw' : 'End Auction'
                          }
                        </button>
                      }
                    </>
                  }
                </div>

                {/* {isAuthenticated && +marketItem?.get('seller') !== +walletAddress
                  ? !marketItem?.isSold && <button className="btn-main btn-lg" onClick={() => purchase()}>
                    {loading
                      ? 'Wait...'
                      : (+marketItem?.get('saleType') === SaleType.AUCTION ? 'Place a bid' : 'Buy')
                    }
                  </button>
                  : <p></p>
                } */}
              </div>

              {/* <div className="spacer-40"></div> */}

              {/* <div className="de_tab">
                <ul className="de_nav">
                  <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>{t('nft.bids')}</span></li>
                  <li id='Mainbtn1' className=''><span onClick={handleBtnClick1}>{t('nft.history')}</span></li>
                </ul>

                <div className="de_tab_content">
                  {openMenu && (
                    <div className="tab-1 onStep fadeIn">
                      {bids.map((bid, index) => (
                        <div className="p_list">
                          <div className="p_list_pp">
                            <span>
                              <Blockie address={bid?.get('highestBidder')} scale={5} onClick={() => navigate(`/Author/${bid?.get('highestBidder')}`)} />
                            </span>
                          </div>
                          <div className="p_list_info">
                            Bid <b>{bid?.get('highestBid') / 1e18} {getUnit(chainId)}</b>
                            <span>by &nbsp;
                            <b>
                                {getEllipsisTxt(bid?.get('highestBidder'))}
                              </b> &nbsp;  </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div> */}

              {/* <div className={`card bt ${theme ? 'no-boder' : ''}`}>
                <div className={`card-header-id ${theme ? 'background_item_collection theme-dark-color' : ''}`} onClick={() => setShowPriceHistory(pre => !pre)}>
                  <ShowChartIcon  className="icon-on-des"/>
                  Price History
                  {showPriceHistory ? <KeyboardArrowUpIcon className='icon-end-des'/>:<KeyboardArrowDownIcon className='icon-end-des'/>}
                </div>
                {showPriceHistory && <div className={`card-content-id end ${theme ? 'background_item_collection border_top_dark' : ''}`}>
                  <div></div>
                  <div className='chart-container'>
                    <Line data={data} />
                  </div>
                </div>}
              </div>

              <div className={`card bt ${theme ? 'no-boder' : ''}`}>
                <div className={`card-header-id ${theme ? 'background_item_collection theme-dark-color' : ''}`} onClick={() => setShowListings(pre => !pre)}>
                  <LocalOfferIcon  className="icon-on-des"/>
                  Listings
                  {showListings ? <KeyboardArrowUpIcon className='icon-end-des'/>:<KeyboardArrowDownIcon className='icon-end-des'/>}
                </div>
                {showListings && <div className={`card-content-id end activity ${theme ? 'background_item_collection border_top_dark' : ''}`}>
                <div className={`header-table-container ${theme ? 'background_item_collection border_top_dark' : ''}`}>
                {
                  ['Price', 'USD Price', 'Expiration', 'From'].map((item, index) => {
                    return <div className={`header-table ${theme ? 'background_item_collection theme-dark-color' : ''}`} key={index}>{item}</div>
                  })
                    }
                  </div>
                  {dataTableListings.length != 0 && 
                    <div className="tr-table-container">
                      {
                        dataTableListings.map((item, index) => {
                          return <div className={`tr-table ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`}>
                            <div className={`tcell-table ${!theme && 'd'}`}>
                              {item.price}
                            </div>
                            <div className={`tcell-table ${!theme && 'd'}`}>{item.usd_price}</div>
                            <div className={`tcell-table ${theme ? 'theme-dark-color-text' : 'd'}`}>{item.expiration}</div>
                            <div className="tcell-table x">{item.from}</div>
                            <div className="tcell-table x end">
                              <button className={ theme ? "btn btn-main" : "btn-buy-tblistings"}>Buy</button>  
                            </div>
                          </div>
                        })
                      }
                    </div>
                  }
                </div>}
              </div> */}

              {/* <div className={`card bt ${theme ? 'no-boder' : ''}`}>
                <div className={`card-header-id ${theme ? 'background_item_collection theme-dark-color' : ''}`}  onClick={() => setShowOffers(pre => !pre)}>
                  <ListIcon  className="icon-on-des"/>
                  Offers
                  {showOffers ? <KeyboardArrowUpIcon className='icon-end-des'/>:<KeyboardArrowDownIcon className='icon-end-des'/>}
                </div>
                {showOffers && <div className='card-content-id end activity'>
                <div className={`header-table-container ${theme ? 'border_top_dark' : ''}`}>
                {
                  ['Price', 'USD Price', 'Floor Difference', 'Expiration', 'From'].map((item, index) => {
                    return <div className={`header-table ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`} key={index}>{item}</div>
                  })
                    }
                  </div>
                  {dataTableOffer.length != 0 && 
                    <div className="tr-table-container">
                      {
                        dataTableOffer.map((item, index) => {
                          return <div className={`tr-table ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`}>
                            <div className={`tcell-table ${!theme && 'd'}`}>
                              {item.price}
                            </div>
                            <div className={`tcell-table ${theme ? 'theme-dark-color-text' : 'd'}`}>{item.usd_price}</div>
                            <div className={`tcell-table ${theme ? 'theme-dark-color-text' : 'd'}`}>{item.floor_diff}</div>
                            <div className={`tcell-table ${theme ? 'theme-dark-color-text' : 'd'}`}>{item.expiration}</div>
                            <div className="tcell-table x">{item.from}</div>
                          </div>
                        })
                      }
                    </div>
                  }
                </div>}
              </div> */}
          </div>
            </div>
        </div>

        {/* <div className={`row card bt ${theme ? 'no-boder' : ''}`}>
            <div className={`card-header-id ${theme ? 'background_item_collection theme-dark-color' : ''}`} onClick={() => setShowItemActivity(pre => !pre)}>
                <ImportExportIcon className="icon-on-des"/>
                Item Activity
                {showItemActivity ? <KeyboardArrowUpIcon className='icon-end-des'/>:<KeyboardArrowDownIcon className='icon-end-des'/>}
            </div>
            {showItemActivity && <>
              <div className={`card-content-id pd end activity ${theme ? 'background_item_collection  border_top_dark': ''} `}> */}
                {/* <div> */}
                  {/* <div className={`card wd ${theme ? 'border_black' : ''}`}>
                    <div className={`card-header-id ${theme ? 'background_item_collection theme-dark-color' : ''}`} onClick={() => setShowFilter(pre => !pre)}>
                      Filter
                      {showFilter ? <KeyboardArrowUpIcon className='icon-end-des'/>:<KeyboardArrowDownIcon className='icon-end-des'/>}
                    </div>
                    { showFilter &&  <>
                        <div className={`option-filter ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`} onClick={() => setShowLF(pre => !pre)}>
                          <div className={'div-select' + (showLF ? ' bdbl' : '')}>
                            {showLF && <DoneIcon className='icon-select'/>}
                          </div>
                          Listings
                        </div>
                        <div className={`option-filter ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`} onClick={() => setShowSF(pre => !pre)}>
                          <div className={'div-select' + (showSF ? ' bdbl' : '')}>
                            {showSF && <DoneIcon className='icon-select'/>}
                          </div>
                          Sales
                        </div>
                        <div className={`option-filter ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`} onClick={() => setShowTF(pre => !pre)}>
                          <div className={'div-select' + (showTF ? ' bdbl' : '')}>
                            {showTF && <DoneIcon className='icon-select'/>}
                          </div>
                          Transfers
                        </div>
                        <div className={`option-filter end ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`} onClick={() => setShowBF(pre => !pre)}>
                          <div className={'div-select' + (showBF ? ' bdbl' : '')}>
                            {showBF && <DoneIcon className='icon-select'/>}
                          </div>
                          Bids
                        </div>
                    </>
                    
                    }
                  </div> */}
                  
                  {/* {(showLF || showSF || showTF || showBF) && <div className='filter-container'>
                      {showLF && <div className={`filter-text ${theme ? 'theme-dark-color' : ''}`}>
                          Listings
                          <ClearIcon className='icon-filter-text' onClick={() => setShowLF(pre => !pre)}/>
                        </div>}
                        {showSF && <div className={`filter-text ${theme ? 'theme-dark-color' : ''}`}>
                          Sales
                          <ClearIcon className='icon-filter-text' onClick={() => setShowSF(pre => !pre)}/>
                        </div>}
                        {showTF && <div className={`filter-text ${theme ? 'theme-dark-color' : ''}`}>
                          Transfers
                          <ClearIcon className='icon-filter-text' onClick={() => setShowTF(pre => !pre)}/>
                        </div>}
                        {showBF && <div className={`filter-text ${theme ? 'theme-dark-color' : ''}`}>
                          Bids
                          <ClearIcon className='icon-filter-text' onClick={() => setShowBF(pre => !pre)}/>
                        </div>}
                      <p className="text-clear-all" onClick={() => {
                                                                    setShowLF(false);
                                                                    setShowBF(false);
                                                                    setShowTF(false);
                                                                    setShowSF(false);
                                                                  }}>Clear All</p>
                    </div>} */}

                
{/*                   
              </div>
              <div className={`header-table-container ${theme ? 'background_item_collection theme-dark-color' : ''}`}>
                {
                  ['Event', 'Price', 'From', 'To', 'Date'].map((item, index) => {
                    return <div className={`header-table tbd ${theme ? 'border_top_dark' : ''}`} key={index}>{item}</div>
                  })
                }
              </div>
              {dataTableActivity.length != 0 && 
                <div className={`tr-table-container ${theme ? 'background_item_collection theme-dark-color' : ''}`}>
                  {
                    dataTableActivity.map((item, index) => {
                      return <div className={'tr-table ' + ((index==dataTableActivity.length)?'end':'') + (theme ? 'background_item_collection theme-dark-color border_top_dark' : '')} key={index}>
                        <div className={`tcell-table ${theme ? 'theme-dark-color': 'd'}`}>
                          <ShoppingCartIcon className='tcell-icon' />
                          {item.event}
                        </div>
                        <div className={`tcell-table ${theme ? 'theme-dark-color': 'd'}`}>{item.price}</div>
                        <div className="tcell-table x">{item.from}</div>
                        <div className="tcell-table x">{item.to}</div>
                        <div className="tcell-table x">{item.date}</div>
                      </div>
                    })
                  }
                </div>
              }
            </>
            }
        </div> */}

        {/* <div className={`row card bt ${theme ? 'border-color-black' : ''}`}>
            <div className={`card-header-id ${theme ? 'theme-dark' : ''}`} onClick={() => setShowMore(pre => !pre)}>
                <ViewModuleIcon className="icon-on-des"/>
                More From This Collection
                {showMore ? <KeyboardArrowUpIcon className='icon-end-des'/>:<KeyboardArrowDownIcon className='icon-end-des'/>}
            </div>
            {showMore && <>
              <div className={`card-content-id pd ${theme ? 'theme-dark border-top-color' : ''}`}>
                {
                  [{img: 'https://ipfs.moralis.io:2053/ipfs/QmZ9fjSFDun6CLKBDCBpoiY5eXsDMbXAatSNmRmDwckhLB',
                    author: 'Juan Blano Lozindfsf dadsf dfasdf',
                    name: 'Donde quiera que vaya',
                    price: '0.5',
                    unit: 'ETH'},
                    {img: 'https://ipfs.moralis.io:2053/ipfs/QmZ9fjSFDun6CLKBDCBpoiY5eXsDMbXAatSNmRmDwckhLB',
                    author: 'Juan Blano Lozindfsf dadsf dfasdf',
                    name: 'Donde quiera que vaya',
                    price: '0.5',
                    unit: 'ETH'},
                    {img: 'https://ipfs.moralis.io:2053/ipfs/QmZ9fjSFDun6CLKBDCBpoiY5eXsDMbXAatSNmRmDwckhLB',
                    author: 'Juan Blano Lozindfsf dadsf dfasdf',
                    name: 'Donde quiera que vaya',
                    price: '0.5',
                    unit: 'ETH'},
                    {img: 'https://ipfs.moralis.io:2053/ipfs/QmZ9fjSFDun6CLKBDCBpoiY5eXsDMbXAatSNmRmDwckhLB',
                    author: 'Juan Blano Lozindfsf dadsf dfasdf',
                    name: 'Donde quiera que vaya',
                    price: '0.5',
                    unit: 'ETH'}].map((item, idx) => {
                    return <div className={`card-preview ${theme ? 'background_item_collection border_item' : ''}`} key={idx}>
                              <div className={`cp-ctn ${theme ? 'border-bottom-dark' : ''}`}>
                                <div className='card-preview-image-container'>
                                  <img src={item.img} className='card-preview-img'/>
                                </div>
                                <div className='card-preview-content'>
                                  <div className='row r1'>
                                    <div className='col-lg-6 r1-left'>{item.author}</div>
                                    <div className='col-lg-6 text-detail'>Price</div>
                                  </div>
                                  <div className={`row r2 ${theme ? 'theme-dark-color' : ''}`}>
                                    <div className='col-lg-6'>{item.name}</div>
                                    <div className='col-lg-6 text-detail'>{item.price}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='row r3'>
                                  <div className='col-lg-6 '>
                                    <p className="hide-text">Buy now</p>
                                  </div>
                                  <div className='col-lg-6 text-detail'>
                                    <FavoriteBorderIcon className='icon-heart'/>
                                    44
                                  </div>
                                </div>
                          </div>
                  })
                }
              </div>
              <div className={`card-footer-id ${theme ? 'theme-dark border_top_dark' : ''}`}>
                <button className={theme ? 'btn btn-main' : "btnViewCollection"}>View Collection</button>
              </div>
            </>
            }
        </div> */}

      </div>

      <Footer />
    </div>
  );
}
export default Colection;
