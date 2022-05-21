import React from 'react';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClearIcon from '@mui/icons-material/Clear';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Activity() {
  const [showItemActivity, setShowItemActivity] = React.useState(true);

  const [dataTableActivity, setDataActivity] = React.useState([{ event: 'Transfer', price: '', from: 'aaron69', to: 'Mf33', date: '2 day ago' },
  { event: 'Transfer', price: '1.2', from: 'aaron69', to: 'Mf33', date: '2 day ago' },
  { event: 'Transfer', price: '', from: 'aaron69', to: 'Mf33', date: '2 day ago' },]);

  const [dataTableOffer, setDataOffer] = React.useState([{ price: '0.12 ETH', usd_price: '$251.41', floor_diff: '50% bellow', expiration: 'in 5 days', from: 'aaron' },
  { price: '0.12 ETH', usd_price: '$251.41', floor_diff: '50% bellow', expiration: 'in 5 days', from: 'aaron' },
  { price: '0.12 ETH', usd_price: '$251.41', floor_diff: '50% bellow', expiration: 'in 5 days', from: 'aaron' },]);

  const [showLF, setShowLF] = React.useState(true);
  const [showSF, setShowSF] = React.useState(false);
  const [showBF, setShowBF] = React.useState(true);
  const [showTF, setShowTF] = React.useState(false);
  const [showFilter, setShowFilter] = React.useState(false);
  const [listFilter, setListFilter] = React.useState(['Sales', 'Transfers']);
  const [showMore, setShowMore] = React.useState(true);

  return (
    <>
      <div className="row card bt">
        <div className='card-header-id' onClick={() => setShowItemActivity(pre => !pre)}>
          <ImportExportIcon className="icon-on-des" />
                Item Activity
                {showItemActivity ? <KeyboardArrowUpIcon className='icon-end-des' /> : <KeyboardArrowDownIcon className='icon-end-des' />}
        </div>
        {showItemActivity && <>
          <div className="card-content-id pd end activity">
            {/* <div> */}
            <div className='card wd'>
              <div className='card-header-id' onClick={() => setShowFilter(pre => !pre)}>
                Filter
                      {showFilter ? <KeyboardArrowUpIcon className='icon-end-des' /> : <KeyboardArrowDownIcon className='icon-end-des' />}
              </div>
              {showFilter && <>
                <div className='option-filter ' onClick={() => setShowLF(pre => !pre)}>
                  <div className={'div-select' + (showLF ? ' bdbl' : '')}>
                    {showLF && <DoneIcon className='icon-select' />}
                  </div>
                          Listings
                        </div>
                <div className='option-filter ' onClick={() => setShowSF(pre => !pre)}>
                  <div className={'div-select' + (showSF ? ' bdbl' : '')}>
                    {showSF && <DoneIcon className='icon-select' />}
                  </div>
                          Sales
                        </div>
                <div className='option-filter ' onClick={() => setShowTF(pre => !pre)}>
                  <div className={'div-select' + (showTF ? ' bdbl' : '')}>
                    {showTF && <DoneIcon className='icon-select' />}
                  </div>
                          Transfers
                        </div>
                <div className='option-filter end' onClick={() => setShowBF(pre => !pre)}>
                  <div className={'div-select' + (showBF ? ' bdbl' : '')}>
                    {showBF && <DoneIcon className='icon-select' />}
                  </div>
                          Bids
                        </div>
              </>

              }
            </div>

            {(showLF || showSF || showTF || showBF) && <div className='filter-container'>
              {showLF && <div className="filter-text">
                Listings
                          <ClearIcon className='icon-filter-text' onClick={() => setShowLF(pre => !pre)} />
              </div>}
              {showSF && <div className="filter-text">
                Sales
                          <ClearIcon className='icon-filter-text' onClick={() => setShowSF(pre => !pre)} />
              </div>}
              {showTF && <div className="filter-text">
                Transfers
                          <ClearIcon className='icon-filter-text' onClick={() => setShowTF(pre => !pre)} />
              </div>}
              {showBF && <div className="filter-text">
                Bids
                          <ClearIcon className='icon-filter-text' onClick={() => setShowBF(pre => !pre)} />
              </div>}
              <p className="text-clear-all" onClick={() => {
                setShowLF(false);
                setShowBF(false);
                setShowTF(false);
                setShowSF(false);
              }}>Clear All</p>
            </div>}
            {/* </div> */}



          </div>
          <div className='header-table-container'>
            {
              ['Event', 'Price', 'From', 'To', 'Date'].map((item, index) => {
                return <div className="header-table tbd" key={index}>{item}</div>
              })
            }
          </div>
          {dataTableActivity.length != 0 &&
            <div className="tr-table-container">
              {
                dataTableActivity.map((item, index) => {
                  return <div className={'tr-table ' + ((index == dataTableActivity.length) ? 'end' : '')} key={index}>
                    <div className="tcell-table d">
                      <ShoppingCartIcon className='tcell-icon' />
                      {item.event}
                    </div>
                    <div className="tcell-table d">{item.price}</div>
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
      </div>

      <div className="row card bt">
        <div className='card-header-id' onClick={() => setShowMore(pre => !pre)}>
          <ViewModuleIcon className="icon-on-des" />
                More From This Collection
                {showMore ? <KeyboardArrowUpIcon className='icon-end-des' /> : <KeyboardArrowDownIcon className='icon-end-des' />}
        </div>
        {showMore && <>
          <div className="card-content-id pd">
            {
              [{
                img: 'https://ipfs.moralis.io:2053/ipfs/QmZ9fjSFDun6CLKBDCBpoiY5eXsDMbXAatSNmRmDwckhLB',
                author: 'Juan Blano Lozindfsf dadsf dfasdf',
                name: 'Donde quiera que vaya',
                price: '0.5',
                unit: 'ETH'
              },
              {
                img: 'https://ipfs.moralis.io:2053/ipfs/QmZ9fjSFDun6CLKBDCBpoiY5eXsDMbXAatSNmRmDwckhLB',
                author: 'Juan Blano Lozindfsf dadsf dfasdf',
                name: 'Donde quiera que vaya',
                price: '0.5',
                unit: 'ETH'
              },
              {
                img: 'https://ipfs.moralis.io:2053/ipfs/QmZ9fjSFDun6CLKBDCBpoiY5eXsDMbXAatSNmRmDwckhLB',
                author: 'Juan Blano Lozindfsf dadsf dfasdf',
                name: 'Donde quiera que vaya',
                price: '0.5',
                unit: 'ETH'
              },
              {
                img: 'https://ipfs.moralis.io:2053/ipfs/QmZ9fjSFDun6CLKBDCBpoiY5eXsDMbXAatSNmRmDwckhLB',
                author: 'Juan Blano Lozindfsf dadsf dfasdf',
                name: 'Donde quiera que vaya',
                price: '0.5',
                unit: 'ETH'
              }].map((item, idx) => {
                return <div className="card-preview" key={idx}>
                  <div className='cp-ctn'>
                    <div className='card-preview-image-container'>
                      <img src={item.img} className='card-preview-img' />
                    </div>
                    <div className='card-preview-content'>
                      <div className='row r1'>
                        <div className='col-lg-6 r1-left'>{item.author}</div>
                        <div className='col-lg-6 text-detail'>Price</div>
                      </div>
                      <div className='row r2'>
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
                      <FavoriteBorderIcon className='icon-heart' />
                                    44
                                  </div>
                  </div>
                </div>
              })
            }
          </div>
          <div className="card-footer-id">
            <button className="btnViewCollection">View Collection</button>
          </div>
        </>
        }
      </div>
    </>
  )
}
