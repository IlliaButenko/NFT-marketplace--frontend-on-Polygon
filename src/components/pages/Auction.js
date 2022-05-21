import React from 'react';
import ColumnAuction from '../components/ColumnAuction';
import Footer from '../components/footer';




const explore= () => (
<div>

  <section className='jumbotron breadcumb no-bg'>
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row m-10-hor'>
          <div className='col-12'>
            <h1 className='text-center'>Live Auction</h1>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className='container'>
    <ColumnAuction/>
  </section>


  <Footer />
</div>

);
export default explore;