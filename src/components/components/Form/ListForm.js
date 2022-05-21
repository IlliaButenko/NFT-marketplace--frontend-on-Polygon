import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DateTimePicker from 'react-datetime-picker';
import { useTranslation } from 'react-i18next';
import { SaleType, chainPrefix } from '../../../const';
import { useWeb3 } from "../../../providers/Web3Provider/provider";
import { ethers } from "ethers";
import * as SaleAPI from '../../../apis/nft';
import * as NftAPI from "../../../apis/nft";

export default function ListForm({ tokenId, tokenAddress, onCreated, nft, ownership }) {
  const { signer, isValidChain, marketAddress,user, collectionABI, marketABI, chainId } = useWeb3();
  const { t } = useTranslation();
  const [show, setShow] = React.useState(false);

  const [price, setPrice] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [sellType, setSellType] = React.useState(SaleType.FIXTED);
  const [endTime, setEndTime] = React.useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const [isLoading, setIsLoading] = React.useState(false);

  async function list() {
    switch (sellType) {
      case SaleType.FIXTED:
        await putOnSale();
        break;
      case SaleType.AUCTION:
        await putOnAuction();
        break;
      default:
        break;
    }
  }

  async function validate() {
    if (price === '') {
      alert('Please enter a price');
      return false;
    }
    if (quantity < 1) {
      alert('Please enter a quantity');
      return false;
    }
    if (sellType === SaleType.AUCTION) {
      if (!endTime || (endTime * 1000) < Date.now()) {
        alert('Please enter an end time');
        return false;
      }
      if (quantity != 1) {
        alert('Please enter a quantity of 1');
        return false;
      }
    }
    return true;
  }

  async function ensureApproved() {
    if (!collectionABI) return;
    const contract = new ethers.Contract(nft.tokenAddress, collectionABI, signer);
    let isApproved = await contract.isApprovedForAll(await signer?.getAddress(), marketAddress);
    // let isApproved = await contract.isApprovedForAll(await signer?.getAddress(), `${user.address}`);
    if (!isApproved) {
      await contract.setApprovalForAll(marketAddress, true);
      while (!isApproved) {
        isApproved = await contract.isApprovedForAll(await signer?.getAddress(), marketAddress);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
console.log(nft,'nft data');
  async function putOnSale() {
    if (!validate()) return;
    setIsLoading(true);
    try {
      await ensureApproved();
      if (!marketABI) return;
      const market = new ethers.Contract(marketAddress, marketABI, signer);
      const tx = await market.putOnSale(tokenAddress, tokenId, quantity, ethers.utils.parseEther(price));
      const receipt = await tx.wait();
      await NftAPI.crawl(
        +chainId,
        tokenAddress,
        receipt.transactionHash,
      )
      alert('Successfully put on sale');
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function putOnAuction() {
    if (!validate()) return;
    setIsLoading(true);
    try {
      await ensureApproved();
      if (!marketABI) return;
      const market = new ethers.Contract(marketAddress, marketABI, signer);
      const tx = await market.putOnAuction(tokenAddress, tokenId, quantity, ethers.utils.parseEther(price), Math.floor(endTime.getTime() / 1000));
      const receipt = await tx.wait();
      await NftAPI.crawl(
        +chainId,
        tokenAddress,
        receipt.transactionHash,
      )
      alert('Successfully put on Auction');
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button className="btn-main" onClick={handleShow} style={{ width: '200px' }}>
        {t('nft.list')}
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Listing </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {+chainId == +nft.chainId ? (
            <>
              <div className="space-y-20">
                <h5 className="mt-5">Sale type </h5>
                <ButtonGroup aria-label="Basic example" className="saleType">
                  <Button className={sellType == SaleType.FIXTED ? "active" : ''} onClick={() => setSellType(SaleType.FIXTED)}>Fixed price</Button>
                  <Button className={sellType == SaleType.AUCTION ? "active" : ''} onClick={() => setSellType(SaleType.AUCTION)}>Auction</Button>
                </ButtonGroup>
              </div>

              <div className=" space-y-20">
                <h5 className="mt-5">{sellType === SaleType.AUCTION ? 'Min bid' : 'Price'}</h5>
                <input
                  type="number"
                  className="form-control"
                  placeholder={0.01}
                  step={0.0001}
                  value={price}
                  onChange={(e) => { setPrice(e.target.value); }}
                />
              </div>

              {sellType !== SaleType.AUCTION &&
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
              }

              {sellType === SaleType.AUCTION &&
                <div className="space-y-20">
                  <h5 className="mt-5">End time</h5>
                  <DateTimePicker
                    onChange={(e) => setEndTime(e)}
                    value={endTime}
                    className="form-control"
                    placeholder="End time"
                  />
                </div>
              }
            </>
          ) : (
            <div>
              <h5>Please change to chain {nft.chainId}</h5>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <button className="btn-main" variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn-main" variant="primary" onClick={list} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Create'}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
