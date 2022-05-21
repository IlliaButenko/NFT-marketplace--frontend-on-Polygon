import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PriceChart from './PriceChart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ListIcon from '@mui/icons-material/List';

export default function ItemStats() {
  const [showPriceHistory, setShowPriceHistory] = React.useState(true);
  const [showListings, setShowListings] = React.useState(false);
  const [showOffers, setShowOffers] = React.useState(true);
  const [dataTableListings, setDataListings] = React.useState([{price: '100 ETH', usd_price: '$209.511,00', expiration: 'in a month', from : 'Mf33'},]);

  return (
    <>
      <div className="card bt">
        <div className="card-header-id" onClick={() => setShowPriceHistory(pre => !pre)}>
          <ShowChartIcon className="icon-on-des" />
                  Price History
                  {showPriceHistory ? <KeyboardArrowUpIcon className='icon-end-des' /> : <KeyboardArrowDownIcon className='icon-end-des' />}
        </div>
        {showPriceHistory && <PriceChart />}
      </div>

      <div className="card bt">
        <div className="card-header-id" onClick={() => setShowListings(pre => !pre)}>
          <LocalOfferIcon className="icon-on-des" />
                  Listings
                  {showListings ? <KeyboardArrowUpIcon className='icon-end-des' /> : <KeyboardArrowDownIcon className='icon-end-des' />}
        </div>
        {showListings && <div className='card-content-id end activity'>
          <div className='header-table-container'>
            {
              ['Price', 'USD Price', 'Expiration', 'From'].map((item, index) => {
                return <div className="header-table" key={index}>{item}</div>
              })
            }
          </div>
          {dataTableListings.length != 0 &&
            <div className="tr-table-container">
              {
                dataTableListings.map((item, index) => {
                  return <div className='tr-table'>
                    <div className="tcell-table d">
                      {item.price}
                    </div>
                    <div className="tcell-table d">{item.usd_price}</div>
                    <div className="tcell-table d">{item.expiration}</div>
                    <div className="tcell-table x">{item.from}</div>
                    <div className="tcell-table x end">
                      <button className="btn-buy-tblistings">Buy</button>
                    </div>
                  </div>
                })
              }
            </div>
          }
        </div>}
      </div>

      <div className="card bt">
        <div className="card-header-id" onClick={() => setShowOffers(pre => !pre)}>
          <ListIcon className="icon-on-des" />
                  Offers
                  {showOffers ? <KeyboardArrowUpIcon className='icon-end-des' /> : <KeyboardArrowDownIcon className='icon-end-des' />}
        </div>
        {showOffers && <div className='card-content-id end activity'>
          <div className='header-table-container'>
            {
              ['Price', 'USD Price', 'Floor Difference', 'Expiration', 'From'].map((item, index) => {
                return <div className="header-table" key={index}>{item}</div>
              })
            }
          </div>
          {dataTableOffer.length != 0 &&
            <div className="tr-table-container">
              {
                dataTableOffer.map((item, index) => {
                  return <div className='tr-table'>
                    <div className="tcell-table d">
                      {item.price}
                    </div>
                    <div className="tcell-table d">{item.usd_price}</div>
                    <div className="tcell-table d">{item.floor_diff}</div>
                    <div className="tcell-table d">{item.expiration}</div>
                    <div className="tcell-table x">{item.from}</div>
                  </div>
                })
              }
            </div>
          }
        </div>}
      </div>
    </>
  )
}
