import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { getEllipsisTxt } from '../../helpers/fommaters';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import * as transactionApi from '../../apis/transaction';
import Blockie from '../components/Blockie';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #FAF6F1;
  }
`;

const Activity = function () {
  const { t } = useTranslation();
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const { data } = await transactionApi.activity(1, 20);
      setActivities(data.items);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchHistory();
  }, [])
  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>{t('activity')}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <table className="table de-table table-rank">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">NFTs</th>
                  <th scope="col">{t('Quantity')}</th>
                  <th scope="col">{t('Price')}</th>
                  <th scope="col">{t('From')}</th>
                  <th scope="col">{t('To')}</th>
                  <th scope="col">{t('Time')}</th>
                </tr>
                <tr></tr>
              </thead>
              <tbody>
                {
                  activities?.length > 0 ? activities.map(nft => (
                    <tr>
                      <td>{nft?.args?._buyer ? t('BUY') : (nft?.args?._endTime !== '0' ? t('AUCTION') : t('SALE'))}</td>
                      <th scope="row">
                        <div className="coll_list_pp">
                          {/* <img className="lazy" src={nft?.nft?.image} alt="" /> */}
                          {nft?.nft?.fileType === "image" ?
                            <img src={nft?.nft?.image} className="lazy nft__item_preview" alt=""/>
                            : nft?.nft?.fileType === "video" ?
                              <video width="100%" height="" controls src={nft?.nft?.image} >
                              </video>
                              : nft?.nft?.fileType === "audio" ? <audio style={{ width: '100%' }} controls muted>
                                <source src={nft?.nft?.image} type={nft?.nft?.originType} />
                              </audio>
                                : <img src={nft?.nft?.image} className="lazy nft__item_preview" alt=""/>
                          }
                        </div>
                        {nft?.nft?.name}</th>
                      <td>{nft?.args?._amount}</td>
                      <td>{nft?.args?._price / 1e18}</td>
                      {/* <td>{nft?.args?._buyer ? getEllipsisTxt(nft?.args?._buyer) : getEllipsisTxt(nft?.args?._seller)}</td> */}
                      <td>{nft?.args?._buyer
                        ? getEllipsisTxt(nft?.args?._buyer)
                        : getEllipsisTxt(nft?.args?._seller)}</td>

                      <td>{nft?.args?._buyer ? getEllipsisTxt(nft?.args?._seller)
                        : ''} </td>
                      <td>{moment(nft.createdAt).fromNow()
                      }</td>

                    </tr>))
                    : <tr><td>{t('noActivity')}</td></tr>
                }
              </tbody>
            </table>

            <div className="spacer-double"></div>

            {/* <ul className="pagination justify-content-center">
              <li className="active"><span>1 - 20</span></li>
              <li><span>21 - 40</span></li>
              <li><span>41 - 60</span></li>
            </ul> */}

          </div>
        </div>
      </section>

      <Footer />
    </div>

  );
}

export default Activity;