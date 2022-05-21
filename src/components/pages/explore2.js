import React from 'react';
import ColumnNewThreeCol from '../components/ColumnNewThreeCol';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .navbar {
    border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }
`;


const explore= () => (
<div>
<GlobalStyles/>
  <section className='container'>
        <div className='row'>
        <div className="spacer-double"></div>

          <div className='col-md-3'>

          <div className="item_filter_group">
              <h4>Select Categories</h4>
              <div className="de_form">
                  <div className="de_checkbox">
                      <input id="check_cat_1" name="check_cat_1" type="checkbox" value="check_cat_1"/>
                      <label htmlFor="check_cat_1">Art</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="check_cat_2" name="check_cat_2" type="checkbox" value="check_cat_2"/>
                      <label htmlFor="check_cat_2">Music</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="check_cat_3" name="check_cat_3" type="checkbox" value="check_cat_3"/>
                      <label htmlFor="check_cat_3">Domain Names</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="check_cat_4" name="check_cat_4" type="checkbox" value="check_cat_4"/>
                      <label htmlFor="check_cat_4">Virtual World</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="check_cat_5" name="check_cat_5" type="checkbox" value="check_cat_5"/>
                      <label htmlFor="check_cat_5">Trading Cards</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="check_cat_6" name="check_cat_6" type="checkbox" value="check_cat_6"/>
                      <label htmlFor="check_cat_6">Collectibles</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="check_cat_7" name="check_cat_7" type="checkbox" value="check_cat_7"/>
                      <label htmlFor="check_cat_7">Sports</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="check_cat_8" name="check_cat_8" type="checkbox" value="check_cat_8"/>
                      <label htmlFor="check_cat_8">Utility</label>
                  </div>

              </div>
          </div>

          <div className="item_filter_group">
              <h4>Status</h4>
              <div className="de_form">
                  <div className="de_checkbox">
                      <input id="buy" name="buy" type="checkbox" value="buy"/>
                      <label htmlFor="buy">Buy Now</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="onauction" name="onauction" type="checkbox" value="onauction"/>
                      <label htmlFor="onauction">On Auction</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="offers" name="offers" type="checkbox" value="offers"/>
                      <label htmlFor="offers">has Offers</label>
                  </div>

              </div>
          </div>

          <div className="item_filter_group">
              <h4>Items Type</h4>
              <div className="de_form">
                  <div className="de_checkbox">
                      <input id="sitems" name="sitems" type="checkbox" value="sitems"/>
                      <label htmlFor="sitems">Single Items</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="bundles" name="bundles" type="checkbox" value="bundles"/>
                      <label htmlFor="bundles">Bundles</label>
                  </div>

              </div>
          </div>

          <div className="item_filter_group">
              <h4>Collections</h4>
              <div className="de_form">
                  <div className="de_checkbox">
                      <input id="abstract" name="abstract" type="checkbox" value="abstract"/>
                      <label htmlFor="abstract">Abstraction</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="paterns" name="paterns" type="checkbox" value="paterns"/>
                      <label htmlFor="paterns">Patternlicious</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="skecth" name="skecth" type="checkbox" value="skecth"/>
                      <label htmlFor="skecth">Skecthify</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="cartoon" name="cartoon" type="checkbox" value="cartoon"/>
                      <label htmlFor="cartoon">Cartoonism</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="virtualand" name="virtualand" type="checkbox" value="virtualand"/>
                      <label htmlFor="virtualand">Virtuland</label>
                  </div>

                  <div className="de_checkbox">
                      <input id="pappercut" name="pappercut" type="checkbox" value="pappercut"/>
                      <label htmlFor="pappercut">Papercut</label>
                  </div>

              </div>
          </div>

          </div>

          <div className="col-md-9">
            <ColumnNewThreeCol/>
          </div>
        </div>
      </section>


  <Footer />
</div>

);
export default explore;