import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { SaleType, chainPrefix } from '../../../const';
import { useWeb3 } from "../../../providers/Web3Provider/provider";
import { ethers } from "ethers";
// @ts-ignore
import DateTimePicker from 'react-datetime-picker';
import * as SaleAPI from '../../../apis/nft';
import { navigate } from "@reach/router";
import * as NftAPI from "../../../apis/nft";
import { pinJSONToIPFS } from "../../../helpers/ipfs";
import { createLazyBidSig, createLazyBuySig, getUniqueNumber } from "../../../helpers/lazy";
import { toast } from "react-toastify";

function getAddress(address: string) {
  // check if address starts with 0x
  if (address.startsWith('0x')) {
    return ethers.utils.getAddress(address);
  }
  return ethers.utils.getAddress('0x' + address.slice(2));
}

export default function LazyMintForm({ nftForm, theme, onDone }: { nftForm: any, theme: any, onDone: () => void }) {
  const [price, setPrice] = React.useState<string>('0');
  const [sellType, setSellType] = React.useState(SaleType.FIXTED);
  const [endTime, setEndTime] = React.useState(new Date());

  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e: any) => {
    e.preventDefault();
    setShow(true);
  };

  const { signer, provider, marketABI, marketAddress, isValidChain, chainId } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  async function createSignature(signer: ethers.Signer, uri: string, auctionId: number) {
    const creator = await signer.getAddress();
    if (sellType == SaleType.FIXTED) {
      return createLazyBuySig(signer, {
        collectionAddress: getAddress(nftForm.collection),
        amount: +nftForm.total,
        creator: creator,
        price: ethers.utils.parseEther(price),
        uri: uri,
      })
    }

    console.log('create lazy bid sig');
    return createLazyBidSig(signer, {
      collectionAddress: getAddress(nftForm.collection),
      amount: +nftForm.total,
      creator: creator,
      minBid: ethers.utils.parseEther(price),
      endTime: Math.floor(endTime.getTime() / 1000),
      uri: uri,
      auctionId
    })
  }

  async function mintLazy() {
    setIsLoading(true);
    try {
      if (!marketABI || !signer) return;
      if (!price) return;
      if (!nftForm.image) {
        toast.error('Please select a image');
        return;
      }
      if (!nftForm.collection) {
        toast.error('Please select a collection');
        return;
      }

      const creator = await signer.getAddress();
      const uri = await pinJSONToIPFS(nftForm);
      const auctionId = getUniqueNumber();

      const signature = await createSignature(signer, uri, auctionId);
      console.log(auctionId);
      await NftAPI.createSaleLazy({
        uri: uri,
        tokenAddress: nftForm.collection,
        chainId: chainId,
        supply: nftForm.total,
        creatorAddress: creator,
        price: price,
        endTime: Math.floor(endTime.getTime() / 1000),
        saleType: sellType,
        royalty: 0,
        signature: signature,
        auctionId: auctionId,
      })
      toast.success('Successfully created sale');
      setShow(false);
      navigate('/explore');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  if (!signer) {
    return <></>
  }

  return (
    <div>
      {
        <button className={"btn btn-main"} onClick={handleShow} style={{ width: '200px' }}>
          Lazy Mint
        </button>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lazy mint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-20">
            <h5 className="mt-5">Sale type </h5>
            <ButtonGroup aria-label="Basic example" className="saleType">
              <Button className={sellType == SaleType.FIXTED ? "active" : ''} onClick={() => setSellType(SaleType.FIXTED)}>Fixed price</Button>
              <Button className={sellType == SaleType.AUCTION ? "active" : ''} onClick={() => setSellType(SaleType.AUCTION)}>Auction</Button>
            </ButtonGroup>
          </div>

          <div className=" space-y-20">
            <h5 className="mt-5">{sellType === SaleType.AUCTION ? `Min bid (For package x${nftForm.total} NFT)` : 'Price'}</h5>
            <input
              className="form-control"
              placeholder={"0.01"}
              step={0.0001}
              value={price}
              onChange={(e) => { setPrice(e.target.value) }}
            />
          </div>

          {sellType === SaleType.AUCTION &&
            <div className="space-y-20">
              <h5 className="mt-5">End time</h5>
              <DateTimePicker
                onChange={(e: any) => setEndTime(e)}
                value={endTime}
                className="form-control"
                placeholder="End time"
              />
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-main" onClick={handleClose}>
            Close
          </button>
          <button className="btn-main" disabled={isLoading} onClick={mintLazy}>
            {isLoading ? 'Loading...' :
              'Mint & Sale'
            }
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
