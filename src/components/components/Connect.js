import React, { useState, useEffect, useRef } from "react";
import { Link, navigate } from '@reach/router';
import Blockie from "./Blockie";
import { useTranslation } from "react-i18next";
import { getEllipsisTxt } from '../../helpers/fommaters';
import { toast } from "react-toastify";
import { useWeb3 } from "../../providers/Web3Provider/provider";
import { ethers } from 'ethers';
import { use } from "i18next";

export default function Connect({ theme }) {
  const myProfileRef = useRef();
  const { login, user, logout, signer, chainId } = useWeb3();
  const [showMenu, setShowMenu] = useState(false);
  const [balance, setBalance] = useState(0);
  const { t } = useTranslation();
  const refMenuProfile = React.useRef();


  useEffect(() => {
    const closeNotificationPopUp = (event) => {
      if (myProfileRef.current && !myProfileRef.current.contains(event.target)) {
        if (myProfileRef) setShowMenu(false);
      }
    };
    document.body.addEventListener('click', closeNotificationPopUp);
    return () => document.body.addEventListener('click', closeNotificationPopUp);
  }, []);

  async function fetchBalance() {
    if (user) {
      const balance = await signer?.getBalance();      
      if (balance) {
        const balanceEth = ethers.utils.formatEther(balance);
        setBalance(Math.round(balanceEth * 1000) / 1000);
      }

    }
  }

  useEffect(() => {
    fetchBalance();
  }, [signer])

  if (!user) {
    return (
      <a
        className="btn-main btnShade"
        onClick={() => login()}>
        {t('wallet.connect')}
      </a>
    );
  }
  
  return (
    <div className="profile">
      <div className="header_profile" onClick={() => {
        setShowMenu(!showMenu)
      }} ref={myProfileRef}>
        <Blockie address={user.address} scale={3} className="" />
      </div>
      {showMenu &&
        <div className={`menu_profile ${theme ? 'theme-dark show-box' : 'white_background'} `} ref={refMenuProfile}>
          <ul>
            <li
              className="font-bold">{user ? (user.username?.length > 20 ? getEllipsisTxt(user.username) : user.username) : 'Unnamed'}</li>
            <li className="item font-bold mt-2" style={{ color: 'blue' }} onClick={() => {
              navigate('/edit-profile');
              setShowMenu(false)
            }}>{t('setDisplayName')}</li>
            <li className="font-bold mt-3">{t('balance')}</li>
            <li>{balance} { signer.provider?._network.chainId === 137 ? 'MATIC' : 'ETH'}</li>
            <li className="font-bold mt-3">{t('myWallet')}</li>
            <li>{getEllipsisTxt(user?.address)}
              <button className="profile-menu-copy"
                onClick={() => {
                  navigator.clipboard.writeText(user.address);
                  toast.success('Copied to clipboard')
                }}>{t('Copy')}</button>
            </li>
            <li>
              <hr className="mt-2 mb-2" style={{ paddingRight: '2px', marginRight: '20px', borderColor: '#303339' }} />
            </li>
            <li className="item font-bold mt-2"
              onClick={() => {
                navigate('/profile');
                setShowMenu(false)
              }}>
              <i className="fas fa-user icon-item"></i>{t('myProfile')}</li>
            <li className="item font-bold mt-2" onClick={() => {
              navigate('/edit-profile');
              setShowMenu(false)
            }}>
              <i className="fas fa-pencil-alt icon-item"></i>{t('editProfile')}</li>
            <li className="item font-bold mt-2"
              onClick={logout}><i className="fas fa-sign-out-alt icon-item"></i>{t('signOut')}</li>
          </ul>
        </div>
      }
    </div>
  )
}
