import { useParams } from "@reach/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createGlobalStyle } from 'styled-components';
import { getEllipsisTxt } from '../../helpers/fommaters';
import Blockie from '../components/Blockie';
import Footer from '../components/footer';
import * as WalletAPI from '../../apis/wallet';
import { useWeb3 } from "../../providers/Web3Provider/provider";
import AuthorNfts from "../components/AuthorNfts";
import Withdrawn from "../components/Form/Withdrawn";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #FAF6F1;
    border-bottom: solid 1px #ccc !important;
  }
`;

export default function Author({ theme }) {
  const { t } = useTranslation();
  const { user } = useWeb3();
  const [author, setAuthor] = React.useState(null);
  const { address: routeId } = useParams();

  async function fetchAuthor(id) {
    const { data } = await WalletAPI.profile(id);
    setAuthor(data);
  }
  useEffect(() => {
    if (routeId) {
      fetchAuthor(routeId);
    } else if (user) {
      fetchAuthor(user.id);
    }
  }, [routeId, user])

  return (
    <div>
      <GlobalStyles />

      <div className="row background-profile bg" style={{ backgroundImage: author?.cover, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className="image-ava-author-container">
          {
            author?.avatar ? <img src={author?.avatar} alt="" /> : <Blockie address={author?.address} scale={17} />
          }
        </div>
      </div>

      <div className="row background-profile-below">
        <div className="profile-name-container">
          <h3 className="profile-name">
            {
              author?.username
            }
          </h3>
          <span id="wallet" className="" title="Copy Text">
            {getEllipsisTxt()}
            {/* <button id="btn_copy" title="Copy Text">Copy</button> */}
          </span>

          {user && user?.id === author?.id && <Withdrawn theme={theme} />}
        </div>
      </div>

      <AuthorNfts authorId={author?.id} />
      <Footer />
    </div >
  );
}
