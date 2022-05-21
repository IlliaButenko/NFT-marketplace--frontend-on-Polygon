import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { SaleType, chainPrefix} from '../../../const';
import {useWeb3} from "../../../providers/Web3Provider/provider";
import {ethers} from "ethers";
import * as SaleAPI from '../../../apis/nft';
import * as NftAPI from "../../../apis/nft";

function getAddress(address: string) {
  // check if address starts with 0x
  if (address.startsWith('0x')) {
    return address;
  }
  return ethers.utils.getAddress('0x' + address.slice(2));
}

export default function TakeOffSale({ sale, nft, theme, onDone }: { sale: any, nft: any, theme: any, onDone: () => void }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e: any) => {
    e.preventDefault();
    setShow(true);
  };

  const {signer, provider, marketABI, marketAddress, isValidChain, chainId} = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  async function takeOffSaleLazy() {
    setIsLoading(true);
    try {
      await SaleAPI.takeOffSaleLazy(sale.id);
      setIsLoading(false);
      alert('Sale has been taken off sale');
      onDone();
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  async function takeOffSale() {
    if (!provider) return;
    if (nft.isLazy) return takeOffSaleLazy();
    setIsLoading(true);
    try {
      if (!marketABI) return;
      console.log(sale.saleType);
      const method = sale.saleType === SaleType.AUCTION ? 'takeOffAuction' : 'takeOffSale';
      console.log(method);
      const market = new ethers.Contract(marketAddress, marketABI, signer);
      const tx = await market[method](nft.tokenAddress, nft.tokenId);
      const receipt = await tx.wait();

      await NftAPI.crawl(
          +chainId,
          nft.tokenAddress,
          receipt.transactionHash,
      )
      alert('Successfully take down item');
      handleClose();
      onDone();
    } catch (e) {
      console.log(e);
      alert('Failed to take down item');
    } finally {
      setIsLoading(false);
    }
  }

  if (!signer) {
    return <></>
  }

  return (
    <div>
      <button className={theme ? "btn btn-main" : "btn-buy-tblistings"} onClick={handleShow} style={{ width: '200px' }}>
        Take Off Sale
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Take off</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {+chainId == +nft.chainId ? (
            <>
              <div className=" space-y-20">
                {/*<h5 className="mt-5">Total</h5>*/}
                {/*<p>*/}
                {/*  <strong>  </strong>*/}
                {/*</p>*/}
              </div>
            </>
          ) : (
            <div>
              <h5>Please change to chain {nft.chainId}</h5>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          {+chainId == +nft.chainId ? (
              <>
          <button className="btn-main" onClick={handleClose}>
            Close
          </button>
          <button className="btn-main" disabled={isLoading} onClick={takeOffSale}>
            {isLoading ? 'Loading...' : 'Take Off Sale'}
          </button>
          </>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}
