import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { Link, navigate } from '@reach/router';
import useOnclickOutside from "react-cool-onclickoutside";
import Connect from '../components/Connect';
import I18n from '../components/i18n/I18n';
import { useTranslation } from 'react-i18next'
import { useWeb3 } from "../../providers/Web3Provider/provider";

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);

const Header = function ({ setTheme, theme, setSearch, translate, setTranslate }) {
  const { user } = useWeb3();
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [filter, setFilter] = useState('');
  const refMenu = React.useRef(null);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });

  const [showmenu, btn_icon] = useState(false);
  const mousedownCallBack = window.addEventListener("mousedown", (e) => {
    if (refMenu.current && !refMenu.current.contains(e.target)) {
      btn_icon(false)
    }
  });
  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");

      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      } if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });

    return () => {
      window.removeEventListener("scroll", scrollCallBack);
      window.removeEventListener("mousedown", mousedownCallBack);
    };
  }, []);

  function handleSearchChange(e) {
    if (e.key === 'Enter') {
      filter.trim() === '' && toast.error("Please input valid data into search control");
      filter.trim() !== '' && navigate(`/search/${e.target.value?.trim()}`)
    } else {
      setFilter(e.target.value);
      setSearch(e.target.value);
    }
  }

  const protectedRoute = () => {

  }

  function getTranslate() {
    setTranslate(!translate);
  }

  return (
    <header id="myHeader" className={`navbar ${theme ? 'black_more' : 'white'}`}>
      <div className='header-wrapper'>
        <div className='header-main'>
          <div className='logo px-0'>
            <div className='navbar-title navbar-item'>
              <NavLink to="/">
                <img src={theme ? "/img/drcmobilitylogo.png" : "/img/drcmobilitylogo.png"} className="img-fluid d-block" alt="#" />
              </NavLink>
            </div>
          </div>

          <div className={`search ${theme ? 'bg_input' : ''}`} >
            <input id="quick_search" className={`xs-hide form-control ${theme ? 'bg_input theme-dark-color' : ''}`} name="quick_search" placeholder={t('placeholder.search')}
              value={filter}
              type="text" onChange={e => handleSearchChange(e)} onKeyDown={e => handleSearchChange(e)} />
          </div>
          {/* Added search bar for Mobile View */}

          <div className="searchMob">
            <Link to="/search">
              <i className="fa fa-search" aria-hidden="true"></i>
            </Link>
          </div>

          <BreakpointProvider className="show-menu">

            <Breakpoint l down>
              {showmenu &&
                <div className='menu' ref={refMenu}>
                  <div className='navbar-item'>
                    <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>
                      {t('explore')}
                    </NavLink>
                  </div>

                  <div className='navbar-item'>
                    <NavLink to="/rankings" onClick={() => btn_icon(!showmenu)}>
                      {t('rankings')}
                    </NavLink>
                  </div>

                  <div className='navbar-item'>
                    <NavLink to="/activity" onClick={() => btn_icon(!showmenu)}>
                      {t('activity')}
                    </NavLink>
                  </div>
{console.log(user,'user...')}
                  <div className='navbar-item'>
                    {user?.isCreator ? <NavLink to="/create" onClick={() => btn_icon(!showmenu)}>
                      {t('create')}
                      <span className='lines'></span>
                    </NavLink> : <NavLink to="#" onClick={() => toast.error(t('adminProveMsg'))}>
                      {t('create')}
                      <span className='lines'></span>
                    </NavLink>}

                  </div>

                  {/* <div className="navbar-item">
                    <I18n getTranslate={getTranslate}/>
                  </div> */}
                  {/* <div onClick={setTheme} className="navbar-item theme">
                    { theme ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                  </div> */}
                </div>
              }
            </Breakpoint>

            <Breakpoint xl>
              <div className='menu'>
                <div className='navbar-item'>
                  <NavLink to="/explore">
                    {t('explore')}
                    <span className='lines'></span>
                  </NavLink>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/rankings">
                    {t('rankings')}
                    <span className='lines'></span>
                  </NavLink>
                </div>
                <div className='navbar-item'>
                  {<NavLink to="/activity">
                    {t('activity')}
                    <span className='lines'></span>
                  </NavLink>}
                </div>
                <div className='navbar-item'>
                  {user?.isCreator ? <NavLink to="/create" onClick={() => btn_icon(!showmenu)}>
                    {t('create')}
                    <span className='lines'></span>
                  </NavLink> : <NavLink to="#" onClick={() => toast.error(t('adminProveMsg'))}>
                    {t('create')}
                    <span className='lines'></span>
                  </NavLink>}
                </div>
                {/* <div className="navbar-item">
                  <I18n  getTranslate={getTranslate}/>
                </div> */}
                {/* <div onClick={setTheme} className="navbar-item theme">
                  { theme ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                </div> */}
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className='mainside'>
            <Connect theme={theme}></Connect>
          </div>

        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
}
export default Header;
