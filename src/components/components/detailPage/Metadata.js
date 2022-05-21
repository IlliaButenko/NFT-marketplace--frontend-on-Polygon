import React from 'react';
import SubjectIcon from '@mui/icons-material/Subject';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import BallotIcon from '@mui/icons-material/Ballot';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from "react-i18next";
import { getEllipsisTxt } from '../../../helpers/fommaters';

export default function Metadata({ metaData, nft, chainId }) {
  const { t } = useTranslation();
  const [showAboutAuthor, setShowAboutAuthor] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="description-item box-border">
      <div className="descripton-item-header top">
        <SubjectIcon className='icon-on-des' />
        {t('nft.description')}
      </div>
      <div className="descripton-item-content ">
        {metaData?.description}
      </div>
      <div className="descripton-item-header mid">
        <VerticalSplitIcon className='icon-on-des' />
                About Author
                {showAboutAuthor
          ? <KeyboardArrowUpIcon className="icon-end-des" onClick={() => setShowAboutAuthor(pre => !pre)} />
          : <KeyboardArrowDownIcon className="icon-end-des" onClick={() => setShowAboutAuthor(pre => !pre)} />}
      </div>
      {showAboutAuthor && <div className="descripton-item-content ">
        Content about author
              </div>
      }
      <div className="descripton-item-header end">
        <BallotIcon className='icon-on-des' />
                Details
                {showDetails
          ? <KeyboardArrowUpIcon className="icon-end-des" onClick={() => setShowDetails(pre => !pre)} />
          : <KeyboardArrowDownIcon className="icon-end-des" onClick={() => setShowDetails(pre => !pre)} />}
      </div>
      {showDetails && <div className="descripton-item-content end">
        <div className="row gc">
          <div className="col-lg-6">Contract Address</div>
          <div className="col-lg-6 text-detail">{getEllipsisTxt(nft.token_address)}</div>
        </div>
        <div className="row gc">
          <div className="col-lg-6">Token ID</div>
          <div className="col-lg-6 text-detail">{nft.token_id}</div>
        </div>
        <div className="row gc">
          <div className="col-lg-6"> Token type </div>
          <div className="col-lg-6 text-detail"> {nft.contract_type} </div>
        </div>
        <div className="row gc">
          <div className="col-lg-6">Blockchain</div>
          <div className="col-lg-6 text-detail"> {getUnit(chainId)} </div>
        </div>
        <div className="row">
          <div className="col-lg-6">Metadata</div>
          <div className="col-lg-6 text-detail">
            <a href={nft.token_uri} target="_blank">{getEllipsisTxt(nft.token_uri)}</a>
          </div>
        </div>

      </div>
      }
    </div>

  )
}
