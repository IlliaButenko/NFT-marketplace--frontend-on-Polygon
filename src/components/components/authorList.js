import React, { useState, useEffect } from 'react';
import Blockie from './Blockie';
import { navigate } from '@reach/router';
import { getEllipsisTxt } from '../../helpers/fommaters'
import * as SaleApi from '../../apis/nft';

const Authorlist = ({theme}) => {
  const [users, setUsers] = useState([]);
  const [balances, setBlances] = useState({});
  const [loading, setLoading] = React.useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await SaleApi.getTopSeller();
      setUsers(data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const getBalance = async (address) => {
  };

  useEffect(() => {
    getUsers();
  },[])

  return (
    <div>
      <ul className="top_author row">
        {users?.map((user,index) => (
          <li key={index} className="col-lg-3">
            <div className={`author_item ${theme ? 'background_item_collection ' : ''}`}>
              <div className="">
                <Blockie address={user?._id?.seller[0]?.address} scale={6} />
              </div>
              <div className="">
                <span className={ theme ? 'theme-dark-color' : ''} onClick={() => navigate(`/Author/${user?._id?.seller[0]?._id}`)}>
                  { user?._id?.seller[0]?.title !== 'Unnamed' ?  user?._id?.seller[0]?.title : getEllipsisTxt(user?._id?.seller[0]?.address)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>)
};
export default Authorlist;
