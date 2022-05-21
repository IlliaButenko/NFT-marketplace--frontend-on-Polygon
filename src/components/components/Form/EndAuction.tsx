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
    return address;
  }
  return ethers.utils.getAddress('0x' + address.slice(2));
}

export default function EndAuction({ nft, sale, theme, maxBid = 0, onDone }: { nft: any, sale: any, theme: any, maxBid: number, onDone: () => void }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e: any) => {
    e.preventDefault();
    setShow(true);
  };

  const [quantity, setQuantity] = useState(1);
  const [bidValue, setBidValue] = useState(maxBid);

  const { signer, provider, marketABI, collectionABI, marketAddress, isValidChain, chainId } = useWeb3();

  const [isLoading, setIsLoading] = useState(false);

  async function ensureApproved() {
    if (!collectionABI) return;
    const contract = new ethers.Contract(nft.tokenAddress, collectionABI, signer);
    let isApproved = await contract.isApprovedForAll(await signer?.getAddress(), marketAddress);

    if (!isApproved) {
      await contract.setApprovalForAll(marketAddress, true);

      while (!isApproved) {
        isApproved = await contract.isApprovedForAll(await signer?.getAddress(), marketAddress);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  async function endAuction() {
    setIsLoading(true);
    try {
      await ensureApproved();

      if (!marketABI) return;
      const market = new ethers.Contract(marketAddress, marketABI, signer);
      let tx;
      if (sale.saleType === SaleType.AUCTION) {
        console.log('on end lazy');
        tx = await market.endAuctionLazy(getAddress(nft.tokenAddress), sale.quantity, getAddress(sale.seller.address), ethers.utils.parseEther(sale.minBid + ""), sale.endTime, nft.uri, sale.auctionId, nft.signature);
      } else {
        tx = await market.endAuction(nft.tokenAddress, nft.tokenId, getAddress(sale.seller.address));
      }

      const receipt = await tx.wait();

      await NftAPI.crawl(
        +chainId,
        nft.tokenAddress,
        receipt.transactionHash,
      )
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function cancelAuction() {
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
      {
        bidValue > 0 &&
        <button className={theme ? "btn btn-main" : "btn-buy-tblistings"} onClick={handleShow} style={{ width: '200px' }}>
          End Auction
        </button>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Auction manage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isValidChain() ? (
            <>
              <div className=" space-y-20">
                <h5 className="mt-5">Total Bid</h5>
                <p>
                  <strong>{bidValue * quantity} MATIC</strong>
                </p>
              </div>

              <div className=" space-y-20">
                <h5 className="mt-5">You will get</h5>
                <p>
                  <strong>{bidValue * (1 - 0.025)} MATIC</strong>
                </p>
              </div>

              <div className=" space-y-20">
                <h5 className="mt-5">Market fee</h5>
                <p>
                  <strong>{bidValue * 0.025} MATIC</strong>
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
          <button className="btn-main" onClick={handleClose}>
            Close
          </button>
          <button className="btn-main" disabled={isLoading} onClick={endAuction}>
            {isLoading ? 'Loading...' :
              'End Auction'
            }
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
