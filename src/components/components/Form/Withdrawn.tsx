import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import {useWeb3} from "../../../providers/Web3Provider/provider";
import {ethers} from "ethers";
import alerts from "../../pages/alerts";
import {toast} from "react-toastify";

function getAddress(address: string) {
  // check if address starts with 0x
  if (address.startsWith('0x')) {
    return address;
  }
  return ethers.utils.getAddress('0x' + address.slice(2));
}

export default function Withdrawn({ theme }: { theme: any }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e: any) => {
    e.preventDefault();
    setShow(true);
  };

  const {signer, user, marketABI, marketAddress, isValidChain, chainId, provider} = useWeb3();

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);

  async function withdraw() {
    if (!marketABI || !signer) return;
    const marketContract = new ethers.Contract(marketAddress, marketABI, signer);
    setIsLoading(true);
    try {
      const tx = await marketContract.withdraw();
      await tx.wait();
      toast.success('Withdrawal successful');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function getValue() {
    if (!marketABI || !signer) return;
    if (!marketAddress) return;
    const marketContract = new ethers.Contract(marketAddress, marketABI, signer);
    const pendingWithdraw = await marketContract.pendingWithdraws(getAddress(await signer.getAddress()));
    setValue(pendingWithdraw);
  }

  useEffect(() => {
    if (user && signer && provider) {
      signer.getAddress().then(async (address) => {
        if (address) {
          window.setTimeout(() => {
            getValue();
          }, 1000);
        }
      });
    }
  }, [user, signer, provider, marketAddress]);

  if (!signer) {
    return <></>
  }

  return (
    <div>
      <button className={theme ? "btn btn-main" : "btn-buy-tblistings"} onClick={handleShow} style={{ width: '200px' }}>
        Withdraw bids
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Auction manage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isValidChain() ? (
            <>
              <div className=" space-y-20">
                <h5 className="mt-5">Total value</h5>
                <p>
                  <strong>{ ethers.utils.formatEther(value)} MATIC</strong>
                </p>
              </div>
            </>
          ) : (
            <div>
              <h5>Please change to chain {chainId}</h5>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <button className="btn-main" onClick={handleClose}>
            Close
          </button>
          <button className="btn-main" disabled={isLoading} onClick={withdraw}>
            {isLoading ? 'Loading...' : 'Withdraw'}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
