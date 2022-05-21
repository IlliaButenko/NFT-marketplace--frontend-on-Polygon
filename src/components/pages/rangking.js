import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Footer from '../components/footer';
import { SaleType } from '../../const';
import { useTranslation } from 'react-i18next';
import * as transactionApi from '../../apis/transaction';

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



const options1 = [
  { value: 'All categories', label: 'All categories' },
  { value: 'Art', label: 'Art' },
  { value: 'Music', label: 'Music' },
  { value: 'Domain Names', label: 'Domain Names' },
  { value: 'Virtual World', label: 'Virtual World' },
  { value: 'Trading Cards', label: 'Trading Cards' },
  { value: 'Collectibles', label: 'Collectibles' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Utility', label: 'Utility' }
]


const Ranking = function({translate}) {
  const [activities, setActivities] = useState([]);
  const [timeRanking, setTimeRanking] = useState(0);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(true);

  const options = [
    { value: 7, label: t('day7') },
    { value: 1, label: t('hour24') },
    { value: 30, label: t('day30') },
    { value: 0, label: t('allTime') }
  ]

  async function fetchRanking() {
    try {
			setIsLoading(true);
			const { data } = await transactionApi.ranking(1,20, timeRanking);
      setActivities(data.items);
			setIsLoading(false);
		} catch (e) {
			console.log(e);
		}
  }

  useEffect(() => {
      fetchRanking();
  }, [])

  useEffect(() => {
      fetchRanking();
  }, [timeRanking])
  useEffect(() => {
    switch (timeRanking) {
      case 0:
        document.getElementsByClassName('css-1uccc91-singleValue')[0].textContent = t('day7');
        break;
      case 1:
        document.getElementsByClassName('css-1uccc91-singleValue')[0].textContent = t('hour24');
        break;
      case 2:
        document.getElementsByClassName('css-1uccc91-singleValue')[0].textContent = t('day30');
        break;
      default:
        document.getElementsByClassName('css-1uccc91-singleValue')[0].textContent = t('allTime');
    }
  }, [translate])

  return (
    <div>
      <section className='jumbotron breadcumb no-bg'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>{ t('topNFT')}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>

            <div className="items_filter centerEl">
              <div className='dropdownSelect one'><Select className='select1' styles={customStyles} menuContainerStyle={{ 'zIndex': 999 }} defaultValue={options[0]} options={options} onChange={e => setTimeRanking(e.value)}/></div>
              {/* <div className='dropdownSelect two'><Select className='select1' styles={customStyles} defaultValue={options1[0]} options={options1} /></div> */}
            </div>

            <table className="table de-table table-rank">
              <thead>
                <tr>
                  <th scope="col">{t('Collection')}</th>
                  <th scope="col">{t('Owner')}</th>
                  <th scope="col">{t('totalSold')}</th>
                  <th scope="col">{t('Revenue')}</th>
                  {/* <th scope="col">Floor Price</th>
                  <th scope="col">Owners</th>
                  <th scope="col">Assets</th> */}
                </tr>
                <tr></tr>
              </thead>
              <tbody>
                { activities.length > 0 ? activities.map(item => 
                <tr>
                  <th scope="row">
                    <div className="coll_list_pp">
                      <img className="lazy" src={item?._id?.collection?.image} alt="" />
                    </div>
                    {item?._id?.collection?.name}</th>
                  <td>{item?._id?.collection?.owner}</td>
                  <td>{item?.sold}</td>
                  <td>{item?.total / 1e18}</td>
                  {/* <td>5.9</td>
                  <td>2.8k</td>
                  <td>58.5k</td> */}
                </tr>
                
                ) 
                : t('noRecord')
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
export default Ranking;