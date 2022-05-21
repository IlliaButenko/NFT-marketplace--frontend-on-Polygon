import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { SaleType, chainPrefix } from '../../../const';
import { useWeb3 } from "../../../providers/Web3Provider/provider";
import { ethers } from "ethers";
import * as SaleAPI from '../../../apis/nft';
import { navigate } from "@reach/router";
import * as NftAPI from "../../../apis/nft";

function getAddress(address: string) {
  // check if address starts with 0x
  if (address.startsWith('0x')) {
    return ethers.utils.getAddress(address);
  }
  return ethers.utils.getAddress('0x' + address.slice(2));
}

export default function BuyForm({ nft, sale, theme, maxBid = 0, onDone }: { nft: any, sale: any, theme: any, maxBid: number, onDone: () => void }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [bidValue, setBidValue] = useState((sale.saleType === SaleType.AUCTION) ? maxBid : sale.unitPrice);
  const { signer, provider, marketABI, marketAddress, isValidChain, chainId } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  function getAction() {
    const simpleAction = (sale.saleType === SaleType.AUCTION) ? bid : buy;
    const lazyAction = (sale.saleType === SaleType.AUCTION) ? bidLazy : buyLazy;
    return nft.isLazy ? lazyAction : simpleAction;
  }

  const handleShow = (e: any) => {
    e.preventDefault();
    setShow(true);
  };
  
  const handleClose = () => {
    setQuantity(1);
    setShow(false)
  };
  async function onSubmit() {
    if (!provider) return;
    const action = getAction();
    setIsLoading(true);
    try {
      const receipt = await action();
      await NftAPI.crawl(
        +chainId,
        nft.tokenAddress,
        receipt.transactionHash,
      );
      sale.saleType === SaleType.AUCTION ? alert('Successfully auction item') : alert('Successfully buy item');
      handleClose();
      onDone();
    } catch (e) {
      console.log(e);
      alert('Your balance is not eligible to buy this NFT');
    } finally {
      setIsLoading(false);
    }
  }
  async function bid() {
    if (!marketABI) return;
    const market = new ethers.Contract(marketAddress, marketABI, signer);
    const tx = await market.bid(nft.tokenAddress, nft.tokenId, getAddress(sale.seller.address), {
      value: ethers.utils.parseEther(bidValue.toString())
    });
    // const tx = await market.bid(nft.tokenAddress, nft.tokenId, getAddress(sale.seller.address), {
    //   value: ethers.utils.parseEther(bidValue.toString())
    // });
    return await tx.wait();
  }
  async function buy() {
    if (!marketABI) return;
    const market = new ethers.Contract(marketAddress, marketABI, signer);
    const tx = await market.buy(nft.tokenAddress, nft.tokenId, getAddress(sale.seller.address), quantity, {
      value: ethers.utils.parseEther((sale.unitPrice * quantity).toString())
    });
    return await tx.wait();
  }

  async function buyLazy() {
    if (!marketABI || !signer) return;
    // marketAddress getting undefined value..
    const market = new ethers.Contract(marketAddress, marketABI, signer);
    // const market = new ethers.Contract("0x9c243351E126a9FEfAB60E5a8D8F056d18f74564", marketABI, signer);
    console.log(getAddress(nft.tokenAddress), sale.quantity, getAddress(sale.seller.address), ethers.utils.parseEther(sale.unitPrice + ""), nft.uri, nft.signature, quantity, {
      value: ethers.utils.parseEther((sale.unitPrice * quantity).toString())
    });
    const tx = await market.connect(signer).buyLazy(getAddress(nft.tokenAddress), sale.quantity, getAddress(sale.seller.address), ethers.utils.parseEther(sale.unitPrice + ""), nft.uri, nft.signature, quantity, {
      value: ethers.utils.parseEther((sale.unitPrice * quantity).toString())
    });

    return await tx.wait();
  }

  async function bidLazy() {
    if (!marketABI || !signer) return;
    const market = new ethers.Contract(marketAddress, marketABI, signer);
    const tx = await market.bidLazy(getAddress(nft.tokenAddress), sale.quantity, getAddress(sale.seller.address), ethers.utils.parseEther(sale.minBid + ""), sale.endTime, nft.uri, sale.auctionId, nft.signature, {
      value: ethers.utils.parseEther(bidValue.toString())
    });

    return await tx.wait();
  }

  useEffect(() => {
    if (maxBid > 0) {
      setBidValue(maxBid);
    }
  }, [maxBid]);

  if (!signer) {
    return <></>
  }

  return (
    <div>
      <button className={theme ? "btn btn-main" : "btn-buy-tblistings"} onClick={handleShow} style={{ width: '200px' }}>
        {(sale.saleType === SaleType.AUCTION) ? t('nft.placeBid') : t('nft.buy')}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t(`buyText`)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {+nft.chainId === +chainId ? (
            <>
              <div className=" space-y-20">
                <h5 className="mt-5">{nft.saleType === SaleType.AUCTION ? 'Min bid' : `${t('Price')}`} {t(`MaticText`)}</h5>
                <input
                  disabled={sale.saleType == SaleType.FIXTED}
                  type="number"
                  className="form-control"
                  placeholder="0.01"
                  step={0.0001}
                  value={bidValue}
                  min={maxBid}
                  onChange={(e) => { setBidValue(+e.target.value) }}
                />
              </div>

              <div className=" space-y-20">
                <h5 className="mt-5">{t(`Quantity`)}: </h5>
                <input
                  disabled={sale.saleType == SaleType.AUCTION}
                  type="number"
                  className="form-control"
                  placeholder="1"
                  value={quantity}
                  max={sale.quantity}
                  min={1}
                  onChange={(e) => { setQuantity(+e.target.value) }}
                />
              </div>

              <div className=" space-y-20">
                <h5 className="mt-5">{t(`Total`)}</h5>
                <p>
                  <strong>{
                    sale.saleType === SaleType.AUCTION ?
                      (bidValue * quantity) :
                      (sale.unitPrice * quantity)
                  } {t(`MaticText`)}</strong>
                </p>
              </div>
            </>
          ) : (
            <div>
              <h5>Please change to chain {nft.chainId}</h5>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn-main" onClick={handleClose}>
            Close
          </button> */}
          <button className="btn-main" onClick={onSubmit}>
            {isLoading ? 'Loading...' :
              ((sale.saleType === SaleType.AUCTION) ? 'Bid' : `${t(`buyText`)}`)
            }
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
