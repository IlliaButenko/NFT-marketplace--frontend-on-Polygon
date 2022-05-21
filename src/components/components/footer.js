import React from 'react';
import { Link, navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <span onClick={() => navigate('/home')}>
                  <img
                    src="/img/drcmobilitylogo.png"
                    width="175px"
                    className="img-fluid d-block"
                    alt="#"
                  />
                </span>
              </div>
              <div className='copyRight'>
                <p className='mb-0'>© 2022 NFT META {t(`allRights`)}</p>
              </div>
              {/* <div className="de-flex-col">
                  <div className="social-icons">
                    <span className="copy">{t('Copyright')} © 2022 {t('allRights')}. {t('madeWith')} &hearts; {t('by')} Arknel.com </span>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
