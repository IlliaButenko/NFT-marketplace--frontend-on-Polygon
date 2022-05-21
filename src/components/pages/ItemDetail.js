import React from "react";
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
import * as NftAPI from '../../apis/nft';
import BuyForm from "../components/Form/BuyForm";
import { toast } from "react-toastify";
import EndAuction from "../components/Form/EndAuction";
import { useWeb3 } from "../../providers/Web3Provider/provider";

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


const Colection = function ({ theme }) {
  const { t } = useTranslation();
  const { user } = useWeb3();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const { id } = useParams();

  const [nft, setNft] = React.useState({});
  const [saleType, setSaleType] = React.useState(SaleType.FIXED);
  const [sales, setSales] = React.useState([]);
  const [auctionSale, setAuctionSale] = React.useState(null);
  const [bids, setBids] = React.useState([]);
  const [ended, setEnded] = React.useState(false);

  async function fetchNft() {
    const { data } = await NftAPI.getNft(id);
    await setNft(data.nft);
    await setSales(data.sales);
  }

  function onBuyDone() {
    toast.success(t('buy_success'));
    fetchNft();
  }

  React.useEffect(() => {
    fetchNft();
  }, [id]);

  React.useEffect(() => {
    const auctionSale = sales.find(sale => sale.saleType === SaleType.AUCTION);
    if (auctionSale) {
      setAuctionSale(auctionSale);
      setSaleType(SaleType.AUCTION);
    }
  }, [sales]);

  React.useEffect(() => {
    if (auctionSale) {
      NftAPI.getBids(auctionSale.id).then(res => {
        setBids(res.data.sort((a, b) => b.value - a.value));
      });
      setEnded((auctionSale.endTime * 1000) < Date.now());
    }
  }, [auctionSale]);

  return (
    <div>
      <GlobalStyles />
      <div className='item-detail-page'>
        <div className='row '>
          <div className="col-md-5  left-col">
            <div className="text-center ">
              {nft?.fileType === "image" ?
                <img src={nft?.image} className="lazy" alt="" />
                : nft?.fileType === "video" ?
                  <video width="100%" height="" controls src={nft?.image}>
                  </video>
                  : nft?.fileType === "audio" ? <audio style={{ width: '100%' }} controls muted>
                    <source src={nft?.image} type={nft?.originType} />
                  </audio>
                    : <img src={nft?.image} className="lazy nft__item_preview" alt=""
                    />
              }
            </div>
            {nft?.nft?.description &&
              <div className={`description-item ${theme ? 'border_item_radius' : 'box-border'}`}
                style={{ padding: '20px' }}>
                {nft?.description}
              </div>
            }

          </div>

          <div className="col-md-7">
            <div className="item_info">
              <div className={`de_countdown mb-2 ${theme ? 'theme-dark' : ''}`} style={{ fontSize: '20px' }}>
              </div>
              <h2 style={{ color: '#000' }}>{nft.title || nft.name}</h2>
              <h4 className={theme ? 'theme-dark-color-text' : ''}>{t('nft.supply')}: {nft.supply}</h4>
              <br></br>
              <div className='row'>
                <div className="col-lg-6">
                  <h6 className={theme ? 'theme-dark-color-text' : ''}>{t('nft.creator')}</h6>
                  <div className="item_author" onClick={() => navigate(`/Author/${nft?.creator?.id}`)}>
                    <div className="author_list_pp">
                      <span>
                        <Blockie address={nft?.creator?.address || ''} scale={5} />
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span
                        className={theme ? 'theme-dark-color-text' : ''}>{nft?.creator?.title || nft?.creator?.username}</span>
                    </div>
                  </div>
                </div>
              </div>

              <br></br>

              {
                saleType === SaleType.AUCTION ?
                  <div className={`card ${theme ? 'no-boder' : ''}`}>
                    <div className={`card-header-id gr  ${theme ? 'background_item_collection' : ''}`}>
                      <AccessTimeIcon className='clock-icon' />
                      <div className="detail-clock">
                        <Clock deadline={new Date(auctionSale?.endTime * 1000)} />
                      </div>
                    </div>

                    <div
                      className={`card-content-id activity end pd ${theme ? 'background_item_collection border_top_dark' : ''}`}>
                      <p className={`cp-p ${theme ? 'theme-dark-color-text' : ''}`}>Current Bid</p>
                      <div className='div-price'>
                        <div style={{ fontSize: '25px', marginRight: '30px' }}
                          className={`ml-5 text-dark fw-bold ${theme ? 'theme-dark-color' : ''}`}>
                          <b> {bids[0] ? bids[0].value : auctionSale.minBid} MATIC</b>
                        </div>

                        {!ended && auctionSale.seller.id !== user?.id &&
                          <BuyForm
                            nft={nft}
                            sale={auctionSale}
                            theme={theme}
                            maxBid={bids[0]?.value || auctionSale.minBid} onDone={onBuyDone}
                          />
                        }

                        {
                          (auctionSale.seller.id === user?.id) &&
                          <EndAuction nft={nft} sale={auctionSale} theme={theme} maxBid={bids[0]?.value || 0} onDone={onBuyDone} />
                        }
                      </div>

                      <br />

                      <div style={{ marginBottom: '5px' }}>
                        <div className="tr-table-container">
                          <div className={`header-table-container ${theme ? 'border_top_dark' : ''}`}>
                            {
                              ['Bidder', 'Value'].map((item, index) =>
                                <div
                                  className={`header-table ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`}
                                  key={index}
                                >
                                  {item}
                                </div>
                              )
                            }
                          </div>

                          {
                            bids.length
                              ? bids.map((bid, index) => (
                                <div
                                  className={`tr-table ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`}>
                                  <div className={`tcell-table ${!theme && 'd'}`}>
                                    <Blockie address={bid?.bidder?.address || ''} scale={5} />
                                    <span className="p-lg-4">
                                      {bid?.bidder?.title || bid?.bidder?.username}
                                    </span>
                                  </div>
                                  <div className="tcell-table x"> {bid.value} MATIC</div>
                                </div>
                              ))
                              : <div className="tr-table">
                                <div className="tcell-table">
                                  <span className="p-lg-4">No bids yet</span>
                                </div>
                              </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div> :
                  <div className={`card ${theme ? 'no-boder' : ''}`}>
                    {/* <div className={`card-header-id gr  ${theme ? 'background_item_collection' : ''}`}>
                      <AccessTimeIcon className='clock-icon' />
                    </div> */}

                    <div
                      className={`card-content-id activity end pd ${theme ? 'background_item_collection border_top_dark' : ''}`}>
                      <p className={`cp-p ${theme ? 'theme-dark-color-text' : ''}`}>{t('nft.currentPrice')}</p>
                      <div className='div-price'>
                        <div style={{ fontSize: '25px' }}
                          className={`ml-5 text-dark fw-bold ${theme ? 'theme-dark-color' : ''}`}>
                          <b>{sales[0]?.unitPrice} MATIC</b>
                        </div>
                      </div>

                      <br />

                      <div style={{ marginBottom: '5px' }}>
                        <table className="table customTable">
                          <tr>
                            <th>{t(`nft.seller`)}</th>
                            <th>{t(`Quantity`)}</th>
                            <th>{t(`unitPrice`)}</th>
                          </tr>
                          {
                            sales.map((sale, index) => (
                              <tr>
                                <td>
                                  <div className={`tcell-table ${!theme && 'd profileImg'}`}>
                                    <Blockie address={sale?.seller?.address || ''} scale={5} />
                                    <span className="sellerName">
                                      {sale?.seller?.title || sale?.seller?.username}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <div className={`tcell-table ${theme ? 'theme-dark-color-text' : 'd itemQty'}`}>{sale.quantity}</div>
                                </td>
                                <td>
                                  <div className="tcell-table x"> {sale.unitPrice} {t(`MATIC`)}</div>
                                </td>
                                <td>
                                  <div className="tcell-table x end">
                                  <BuyForm nft={nft} sale={sale} theme={theme} onDone={() => onBuyDone()} />
                                  </div>
                                </td>
                              </tr>
                            ))
                          }
                        </table>
                        {/* <div className="tr-table-container nftItemTable">
                          <div className={`header-table-container ${theme ? 'border_top_dark' : ''}`}>
                            {
                              ['Seller', 'Quantity', 'Unit price', ''].map((item, index) => {
                                return <div
                                  className={`header-table ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`}
                                  key={index}>{item}</div>
                              })
                            }
                          </div>
                          {
                            sales.map((sale, index) => (
                              <div
                                className={`tr-table ${theme ? 'background_item_collection theme-dark-color border_top_dark' : ''}`}>
                                <div className={`tcell-table ${!theme && 'd profileImg'}`}>
                                  <Blockie address={sale?.seller?.address || ''} scale={5} />
                                  <span className="p-lg-4">
                                    {sale?.seller?.title || sale?.seller?.username}
                                  </span>
                                </div>
                                <div className={`tcell-table ${theme ? 'theme-dark-color-text' : 'd'}`}>{sale.quantity}</div>
                                <div className="tcell-table x"> {sale.unitPrice} MATIC</div>
                                <div className="tcell-table x end">
                                  <BuyForm nft={nft} sale={sale} theme={theme} onDone={() => onBuyDone()} />
                                </div>
                              </div>
                            ))
                          }
                        </div> */}
                      </div>
                    </div>
                  </div>
              }
              <br />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Colection;
