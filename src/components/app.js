import React, { useState, useEffect } from 'react';
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home from './pages/home1';
import Explore from './pages/explore';
import Explore2 from './pages/explore2';
import Helpcenter from './pages/helpcenter';
import Rangking from './pages/rangking';
import Collection from './pages/colection';
import ItemDetail from './pages/ItemDetail';
import ItemDetail1 from './pages/ItemDetail1';
import Author from './pages/Author';
import Wallet from './pages/wallet';
import Login from './pages/login';
import LoginTwo from './pages/loginTwo';
import Register from './pages/register';
import Price from './pages/price';
import Works from './pages/works';
import News from './pages/news';
import Create from './pages/create';
import Auction from './pages/Auction';
import Activity from './pages/activity';
import Contact from './pages/contact';
import ElegantIcons from './pages/elegantIcons';
import EtlineIcons from './pages/etlineIcons';
import FontAwesomeIcons from './pages/fontAwesomeIcons';
import Accordion from './pages/accordion';
import Alerts from './pages/alerts';
import Progressbar from './pages/progressbar';
import Tabs from './pages/tabs';
import EditProfile from './pages/EditProfile';
import Search from './pages/search';

import { createGlobalStyle } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  useEffect(() => window.scrollTo(0, 0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

const App = () => {
  const [theme, setTheme] = useState(false);
  const [search, setSearch] = useState('');
  const [translate, setTranslate] = useState(false);

  const localTheme = localStorage.getItem('theme');
  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      if (localTheme === 'true') setTheme(true)
    }
    // setTheme(localTheme)
  }, [])

  function toggleTheme() {
    localStorage.setItem('theme', !theme)
    setTheme(!theme);
  }
  return (
    <div className={theme ? 'wraper theme-dark' : 'wraper'}>
      <GlobalStyles />
      <Header setTheme={toggleTheme} theme={theme} setSearch={setSearch} translate={translate} setTranslate={setTranslate} />
      <PosedRouter>
        <ScrollTop path="/">
          <Home exact path="/" theme={theme} search={search} translate={translate}><Redirect to="/home" /></Home>
          <Explore path="/explore" theme={theme} translate={translate} />
          <Explore2 path="/explore2" />
          <Search path="/search/:param" theme={theme} />
          <Search path="/search" theme={theme} />
          <Helpcenter path="/helpcenter" />
          <Rangking path="/rankings" translate={translate} />
          <Collection path="/collection/:id" />
          <ItemDetail path="/item/:id" />
          <ItemDetail path="/lazy/:marketId" />
          <ItemDetail path="/ItemDetail/:address/:id/:chainId" theme={theme} />
          {/* <ItemDetail1 path="/ItemDetail1/:id/:chainId" theme={theme}/> */}
          <Author path="/Author/:address" theme={theme} />
          <Author path="/profile" me={true} theme={theme} />
          <EditProfile path="/edit-profile" theme={theme} />
          <Wallet path="/wallet" />
          <Login path="/login" />
          <LoginTwo path="/loginTwo" />
          <Register path="/register" />
          <Price path="/price" />
          <Works path="/works" />
          <News path="/news" />
          <Create path="/create" theme={theme} />
          <Auction path="/Auction" />
          <Activity path="/activity" />
          <Contact path="/contact" />
          <ElegantIcons path="/elegantIcons" />
          <EtlineIcons path="/etlineIcons" />
          <FontAwesomeIcons path="/fontAwesomeIcons" />
          <Accordion path="/accordion" />
          <Alerts path="/alerts" />
          <Progressbar path="/progressbar" />
          <Tabs path="/tabs" />
        </ScrollTop>
      </PosedRouter>
      <ScrollToTopBtn />
      <ToastContainer />

    </div>
  );
}
export default App;
