import React from 'react';
import Modal from 'react-bootstrap/Modal';
import NFTCollection from '../../contracts/ERC1155Collection.sol/ERC1155Collection.json';
import { ContractFactory } from 'ethers';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { pinFileToIPFS } from "../../helpers/ipfs";
import { useWeb3 } from "../../providers/Web3Provider/provider";
import * as CollectionAPI from '../../apis/collection';

export default function CreateCollection({ onCreated, theme }) {
  const { t } = useTranslation();
  const [show, setShow] = React.useState(false);
  const { signer, chainId, marketAddress ,user} = useWeb3();
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    symbol: '',
    uri: '',
  });

  const [images, setImages] = React.useState({
    image: '',
    cover: '',
  });

  async function onChangeFile(event, type) {
    const file = event.target.files[0];
    const url = await pinFileToIPFS(file);
    setImages({
      ...images,
      [type]: url,
    });
  }

  async function createCollection() {
    try {
      if (!form.name.trim()) {
        toast.error('Collection name must be not null');
        return;
      }
      if (!form.symbol.trim()) {
        toast.error('Collection symbol must be not null');
        return;
      }
      if (!images?.image) {
        toast.error('Please, select Collection image');
        return;
      }
      if (!images?.cover) {
        toast.error('Please, select Collection cover');
        return;
      }
      setLoading(true);
      const address = await deploy();
      await saveCollectionToDB(address)
      onCreated(address);
      toast.success(t('created Collection Successfully'));
      handleClose();
    } catch (error) {
      if (error.code === 4001) {
        toast.error("User denied transaction signature.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function deploy() {
    const factory = new ContractFactory(NFTCollection.abi, NFTCollection.bytecode, signer);
    const contract = await factory.deploy(form.name, form.symbol, form.uri);
    // sleep for 1 second to make sure the contract is mined
    await new Promise(resolve => setTimeout(resolve, 1000));
    await contract.setApprovalForAll(marketAddress, true);
    return contract.address;
  }

  async function saveCollectionToDB(address) {
    const { image, cover } = images;
    const { data } = await CollectionAPI.createCollection({
      image,
      cover,
      address,
      chainId: +chainId,
      name: form.name,
      symbol: form.symbol,
      uri: form.uri,
      owner: await signer.getAddress(),
    });
  }
  return (
    <>
      <button className="btn btn-main" variant="primary" onClick={handleShow}>
        {t('nft.createCollection')}
      </button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton className={`${theme ? 'modal_black_more' : ''}`}>
          <Modal.Title> {t('nft.createCollection')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${theme ? 'modal_black_more' : ''}`}>
          <div className=" space-y-20" >
            <p className={` ${theme ? 'texth5_indark_mode' : 'texth5_inlight_mode'}`}>{t('Collectionname')}</p>
            <input
              type="text"
              className="form-control"
              placeholder="Cyberpunk..."
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <p className={` ${theme ? 'texth5_indark_mode' : 'texth5_inlight_mode'}`}> {t('CollectionSymbol')} </p>
            <input
              type="text"
              className="form-control"
              value={form.symbol}
              onChange={(e) => setForm({ ...form, symbol: e.target.value })}
              placeholder="MTV..."
            />

            <p className={` ${theme ? 'texth5_indark_mode' : 'texth5_inlight_mode'}`}>{t('CollectionImage')}</p>
            <input
              id="imageUpload"
              type="file"
              onChange={(e) => onChangeFile(e, 'image')}
              name="profile_photo"
              placeholder="Photo"
              required
              capture
            />

            {
              images.image && (
                <img
                  style={{ borderRadius: '50%' }}
                  src={images.image}
                  width="75px"
                  height="75px"
                  alt="Avatar"
                  className="avatar avatar-lg border-0"
                />
              )
            }

            <p className={` ${theme ? 'texth5_indark_mode' : 'texth5_inlight_mode'}`}>{t('CollectionCover')}</p>
            <input
              id="imageUpload"
              type="file"
              onChange={(e) => onChangeFile(e, 'cover')}
              name="profile_photo"
              placeholder="Photo"
              required
              capture
            />

            {
              images.cover && (
                <img
                  src={images.cover}
                  height="200px"
                  alt="Avatar"
                  className="avatar avatar-lg border-0 mt-2 "
                  style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                />
              )
            }

          </div>
        </Modal.Body>

        <Modal.Footer className={`${theme ? 'modal_black_more' : ''}`}>
          <button className="btn-main" variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn-main" variant="primary" disabled={loading} onClick={createCollection}>
            {loading ? `${t('Loading')}` : `${t('create')}`}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
