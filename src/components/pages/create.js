import React, { Component, useEffect, useState } from "react";
import CreateCollection from "../components/CreateCollection";
import Footer from '../components/footer';
import { ethers } from "ethers";
import { toast } from 'react-toastify';
import { useNavigate } from "@reach/router";
import { useTranslation } from 'react-i18next';
import * as CollectionAPI from '../../apis/collection';
import { useWeb3 } from "../../providers/Web3Provider/provider";
import { pinFileToIPFS, pinJSONToIPFS } from "../../helpers/ipfs";
import NFTCollection from "../../contracts/ERC1155Collection.sol/ERC1155Collection.json";
import * as NftAPI from '../../apis/nft';
import LazyMintForm from "../components/Form/LazyMintForm";

export default function Createpage({ theme }) {
  const { user, chainId, signer } = useWeb3();
  const { t } = useTranslation();
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [showPrice, setShowPrice] = useState(false);
  const [nftType, setNftType] = useState('');
  const [nftTypeOrgin, setNftTypeOrgin] = useState('');

  const [isUploading, setIsUploading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    description: '',
    title: '',
    image: '',
    collection: '',
    total: 1,
    type: 'image',
    media: '',
  });
  async function create() {
    if (isCreating) return;
    if (form.image === '') {
      toast.error('Please upload an image');
      return;
    }
    if (form.total === '') {
      toast.error('Please enter the total number of items');
      return;
    }
    if (!form.collection) {
      toast.error('Please select a collection');
      return;
    }
    if (form.title?.trim() === '') {
      toast.error('Please enter title');
      return;
    }

    try {
      setLoading(true);
      const uri = await pinJSONToIPFS(form);
      const transactionHash = await mint(uri, form.collection);
      await saveDetail(transactionHash, form.collection, chainId);
      toast.success('Created NFT successfully');
      navigate('/profile');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function onChangeFile(e) {
    const newFile = e.target.files[0];
    if ((newFile.size) / (1024 * 1024) > 100) {
      toast.error('The selected file is beyond 100MB, please select another valid file to upload');
      return;
    }
    setNftType(newFile.type.split('/')[0]);
    setNftTypeOrgin(newFile.type);
    const fileUrl = await pinFileToIPFS(newFile);
    setForm({
      ...form,
      image: fileUrl,
      type: newFile.type.split('/')[0],
      media: fileUrl,
      originType: newFile.type,
    });
  }

  async function mint(uri, collectionAddress) {
    const contract = new ethers.Contract(collectionAddress, NFTCollection.abi, signer);
    const tx = await contract.create(await signer?.getAddress(), form.total, uri);
    const r = await tx.wait();
    return r.transactionHash;
  }
  async function fetchCollections() {
    try {
      const { data } = await CollectionAPI.getByCreator(user?.id);
      setCollections(data.filter(collection => +collection.chainId === +chainId));
    } catch (e) {
      console.log(e);
    }
  }
  async function saveDetail(transactionHash, collectionAddress, chainId) {
    return NftAPI.crawl(
      +chainId,
      collectionAddress,
      transactionHash,
    )
  }
  useEffect(() => {
    fetchCollections();
  }, [user, chainId]);

  return (
    <div>
      <section className='jumbotron breadcumb no-bg'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className={`text-center ${theme ? 'theme-dark-color' : ''}`}>{t('create')}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        {signer
          ? <div className="row">
            <div className="col-lg-7 offset-lg-3 mb-5">
              <form id="form-create-item" className="form-border" action="#">
                <div className="field-set">
                  <h5 className={theme ? 'theme-dark-color' : ''}>{t('uploadFile')}</h5>

                  <div className="d-create-file">
                    {form.image
                      ?
                      (nftType === "image" ? <img width="100%" alt="upload" src={form.image} />
                        : nftType === "video" ? <video controls type={nftTypeOrgin} width="100%" alt="upload" src={form.image} />
                          : nftType === "audio" ? <audio controls autoplay muted src={form.image}>
                            <source type={nftTypeOrgin} />
                          </audio>
                            :
                            <p id="file_name">{t('noteUploadImage')}</p>
                      )
                      : <p id="file_name">{t('noteUploadImage')}</p>
                    }

                    <div className='browse mt-3'>
                      <input type="button" id="get_file" className="btn btn-main" value={isUploading ? t('uploading') : t('browse')} />
                      <input id='upload_file' type="file" onChange={onChangeFile} />
                    </div>

                  </div>

                  <div className="spacer-20"></div>

                  <h5 className={theme ? 'theme-dark-color' : ''}>{t('nft.collection')}</h5>
                  <div className="row flex-wrap mb-2" >
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <select className={`form-control text-dark ${theme ? 'bg_input' : ''}`}
                        onChange={(e) => setForm({ ...form, collection: e.target.value })}
                      >
                        <option value="">{t('selectCollection')}</option>
                        {collections.map(collection => (
                          <option key={collection.id} value={collection.address}>{collection.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 col-sm-mt--2">
                      <CreateCollection onCreated={() => fetchCollections()} theme={theme} />
                    </div>

                  </div>

                  <div className="spacer-10"></div>
                  <div className="row">
                    <div className="col-12">
                      <h5 className={theme ? 'theme-dark-color' : ''}>{t('nft.supply')}</h5>
                      <input type="number" name="item_supply" id="item_supply" className={`form-control ${theme ? 'bg_input' : ''}`} placeholder="1" defaultValue={1}
                        onChange={(e) => setForm({ ...form, total: e.target.value })} />
                    </div>
                    {/* <div className="col-6">
                      <h5 className={theme ? 'theme-dark-color' : ''}>{t('nft.royalty')}</h5>
                      <input type="number" step="0.01" name="item_supply" id="item_supply" className={`form-control ${theme ? 'bg_input' : ''}`} placeholder="2.5"
                        disabled
                        defaultValue={2.5}
                        onChange={(e) => setForm({ ...form, royal: e.target.value })} />
                    </div> */}
                  </div>

                  <div className="spacer-10"></div>
                  <h5 className={theme ? 'theme-dark-color' : ''}>{t('nft.title')}</h5>
                  <input type="text" name="item_title" id="item_title" className={`form-control ${theme ? 'bg_input' : ''}`} placeholder={t('nft.titlePlaceHolder')}
                    onChange={(e) => setForm({ ...form, title: e.target.value })} />

                  <div className="spacer-10"></div>

                  <h5 className={theme ? 'theme-dark-color' : ''}>{t('nft.description')}</h5>
                  <textarea data-autoresize name="item_desc" id="item_desc" className={`form-control ${theme ? 'bg_input' : ''}`}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder={t('nft.descPlaceHolder')}></textarea>

                  {showPrice &&
                    <>
                      <div className="spacer-10"></div>
                      <h5>{t('nft.price')}</h5>
                      <input type="text" name="item_title" id="item_price" className={`form-control ${theme ? 'bg_input' : ''}`} placeholder="0.01"
                        onChange={(e) => setPrice(e.target.value)} />
                    </>
                  }

                  <div className="spacer-10"></div>
                  <div className="row">
                    <div className="col-12 alignBtn" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="button" id="submit" className="btn btn-main firstBtn" value="Create Item" onClick={create} style={{ marginRight: '20px' }}>
                        {(isCreating || loading) ? t('wait') : t('nft.mint')}
                      </button>
                      {/* <LazyMintForm nftForm={form} theme={theme} onDone={() => { }} className="ml-10" /> */}
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
          : <div> {t('wallet.pleaseConnect')} </div>
        }

      </section>

      <Footer />
    </div>
  );
}
