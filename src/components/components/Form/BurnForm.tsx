import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { SaleType, chainPrefix } from '../../../const';
import { useWeb3 } from "../../../providers/Web3Provider/provider";
import { ethers } from "ethers";
import * as NftAPI from '../../../apis/nft';

function getAddress(address: string) {
  // check if address starts with 0x
  if (address.startsWith('0x')) {
    return address;
  }
  return ethers.utils.getAddress('0x' + address.slice(2));
}

export default function BurnForm({ nft, onDone, ownership }: { nft: any, onDone: () => void, ownership: any }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [quantity, setQuantity] = useState('1');
  const handleShow = (e: any) => {
    e.preventDefault();
    setShow(true);
  };

  const { signer, provider, collectionABI, isValidChain, chainId } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  async function burn() {
    if (!provider) return;
    if (+quantity < 1) return;
    if (+quantity > ownership.amount) return;

    setIsLoading(true);
    try {
      if (!collectionABI) return;
      const contract = new ethers.Contract(nft.tokenAddress, collectionABI, signer);
      const tx = await contract.burn(await signer?.getAddress(), nft.tokenId, quantity);
      const receipt = await tx.wait();

      await NftAPI.crawl(
        +chainId,
        nft.tokenAddress,
        receipt.transactionHash,
      )
      alert(' Burned NFT Successfully!');
      handleClose();
      onDone();
    } catch (e) {
      console.log(e);
      alert('Failed to Burned NFT');
    } finally {
      setIsLoading(false);
    }
  }

  if (!signer) {
    return <></>
  }

  return (
    <div>
      <button className="btn-main" onClick={handleShow} style={{ width: '200px' }}>
        Burn NFT
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Burn NFT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isValidChain() ? (
            <>
              <div className=" space-y-20">
                <h5 className="mt-5">Quantity</h5>
                <input
                  type="number"
                  className="form-control"
                  placeholder="1"
                  value={quantity}
                  max={ownership.amount}
                  min={1}
                  onChange={(e) => setQuantity(e.target.value)}
                />
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
          <button className="btn-main" disabled={isLoading} onClick={burn}>
            {isLoading ? 'Loading...' : 'Burn'}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
