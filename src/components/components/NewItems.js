import React, { useEffect } from 'react';
import Loading from '../components/Loading';
// import NftCard from '../components/NftCard';
import { chainPrefix } from '../../const';
import { useTranslation } from 'react-i18next';
import * as SaleApi from '../../apis/nft';
import NftCard from '../components/NftCard/index';

const NewItems = ({ theme, search,  }) => {
  const [nfts, setNfts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [height, setHeight] = React.useState(300);
  const [limit, setLimit] = React.useState(4);
  const { t } = useTranslation();

  const onImgLoad = ({ target: img }) => {
    if (img.offsetHeight > 300) return
    if (height < img.offsetHeight) {
      setHeight(img.offsetHeight)
    }
  }

  const getNftList = async () => {
    setLoading(true);
    try {
      const { data } = await SaleApi.listMarket();
      setNfts(data.items);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const loadMore = () => {
    setLimit(limit + 4);
  }

  useEffect(() => {
    getNftList();
  }, [])

  return (
    <div className="row">
      <>
        {nfts?.slice(0, limit).map((nft, index) => (
          // <NftCard nft={nft} key={index} onImgLoad={onImgLoad} height={height} chainId={nft.chainId} theme={theme} search={search} type='market'/>
          <NftCard item={nft} key={index} onImgLoad={onImgLoad} height={height} theme={theme} type='market' fromhome='' />
        ))}

        {loading &&
          <Loading />
        }

        {nfts.length > limit &&
          <div className='col-lg-12'>
            <div className="spacer-single"></div>
            <span onClick={() => loadMore()} className="btn-main lead m-auto">{t('loadMore')}</span>
          </div>
        }
      </> 
    </div>
  )
}
export default NewItems;
