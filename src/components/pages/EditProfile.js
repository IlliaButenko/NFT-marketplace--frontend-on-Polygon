import React, { useEffect, useState } from "react";
import NftCard from '../components/NftCard';
import MyNftCard from '../components/MyNftCard';
import Loading from '../components/Loading';
import { getEllipsisTxt } from '../../helpers/fommaters';
import Footer from '../components/footer';
import Blockie from '../components/Blockie';
import { createGlobalStyle } from 'styled-components';
import { useParams, navigate, useLocation } from "@reach/router";
import { useTranslation } from "react-i18next";
import { chainPrefix } from '../../const';
import { Link } from '@reach/router';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HistoryIcon from '@mui/icons-material/History';
import ListIcon from '@mui/icons-material/History';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SearchIcon from '@mui/icons-material/Search';
import SquareIcon from '@mui/icons-material/Square';
import { useWeb3 } from "../../providers/Web3Provider/provider";
import { useNavigate } from "@reach/router";
import { pinFileToIPFS } from '../../helpers/ipfs';
import { updateProfile } from '../../apis/wallet';
import { toast } from "react-toastify";
import * as WalletAPI from '../../apis/wallet';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #FAF6F1;
    border-bottom: solid 1px #ccc !important;
  }
`;


const EditProfile = function ({ theme }) {
  const { t } = useTranslation();
  const [profile, setProfile] = React.useState({});
  const { user } = useWeb3();

  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const navigate = useNavigate();

  async function fetchProfile() {
    if (user) {
      const { data } = await WalletAPI.profile(user._id);
      setProfile({
        ...profile,
        title: data.title,
        username: data.username,
        email: data.email,
        bio: data.bio,
        cover: data.cover,
        avatar: data.avatar,
        twitter: data.twitter,
        instagram: data.instagram,
        discord: data.discord

      })
    }
  }

  // async function fetchAuthor(id) {
  //   const {data} = await WalletAPI.profile(id);
  //   setAuthor(data);
  // }

  useEffect(() => {
    fetchProfile();
  }, [user]);

  async function onChangeFile(e, name) {
    switch (name) {
      case 'avatar':
        {
          setIsAvatarUploading(true);
          const file = e.target.files[0];
          const url = await pinFileToIPFS(file);
          setProfile({
            ...profile,
            [name]: url
          });
          setIsAvatarUploading(false);
          break;
        }

      default:
        {
          setIsCoverUploading(true);
          const file = e.target.files[0];
          const url = await pinFileToIPFS(file);
          setProfile({
            ...profile,
            [name]: url
          });
          setIsCoverUploading(false);
        }
    }

  }

  async function saveProfile() {
    try {
      if (user) {
        if (profile.title.trim() === '') {
          toast.error('Full name must be not null');
          return;
        }
        const result = await updateProfile(user._id, profile);
        toast.success('Update successful');
        setTimeout(() => {
          navigate('/profile');
        }, 5000);
      }
    } catch (error) {
      console.log('update error', error);
      toast.error('update error');
    }
  }

  if (!user) {
    return (<div>
      {/* <Header /> */}
      <div className="container">
        Please connect to wallet
      </div>
    </div>);
  }
  return (

    <div>
      <section className='jumbotron breadcumb no-bg'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className={`text-center ${theme ? 'theme-dark-color' : ''}`}>{t('editProfile')}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className="singleRow">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <h5 className='mt-3'>{t('profile.full_Name')}</h5>
              </div>
              <div className="col-6">
                <input
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  value={profile?.title}
                  id="txtUsername"
                  type="text"
                  className={`form-control ${theme ? 'bg_input' : ''}`}
                  defaultValue="Creabik"
                />
              </div>
              <div className="col-6">
                <div>
                  <div id="boxUpload">
                    <h5 className="">
                      <label htmlFor="imageUpload" class="btn btn-secondary" style={{ marginLeft: '5px' }}>{t('chooseImage')}</label>
                    </h5>
                    <div>

                      <input style={{ visibility: "hidden" }} type="file" id="imageUpload"
                        onChange={(e) => onChangeFile(e, 'avatar')}
                        name="profile_photo"
                        placeholder="Photo"
                        required
                        capture />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="singleRow pofileSection">
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <div>
                <h5 className="mt-3">{t('profile.full_Name')}</h5>
                  <input
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    value={profile?.username}
                    id="txtUsername"
                    type="text"
                    className={`form-control ${theme ? 'bg_input' : ''}`}
                    defaultValue="Creabik"
                  />
                </div>
              </div>
              <div className="col-6">
                {profile?.avatar && <div id="profile-container">
                  <img
                    id="profileImage"
                    alt="Avatar"
                    className="profile_image"
                    src={profile?.avatar}
                  />
                </div>
                }

              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <h5 className={`mt-3 ${theme ? 'theme-dark-color' : ''}`}>{t('Email')}</h5>
              </div>
              <div className="col-6">
                <div className="confirm">
                  <input
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    value={profile?.email}
                    id="txtEmail"
                    type="text"
                    className={`form-control ${theme ? 'bg_input' : ''}`}
                    placeholder={t('enterYourEmail')}
                  />
                </div>
              </div>
              <div className="col-6">
                <div id="boxUpload2">
                  <h5 className={`${theme && 'theme-dark-color'}`}>
                    <label htmlFor="imageUpload2" class="btn btn-secondary" style={{ marginLeft: '5px' }}>{t('chooseImage')}</label>
                  </h5>
                  <input style={{ visibility: "hidden" }} type="file" id="imageUpload2"
                    onChange={(e) => onChangeFile(e, 'cover')}
                    name="cover_photo"
                    placeholder="Photo"
                    required
                    capture />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div>
              <div className="space-y-10">
                <h5 className={`mt-3 ${theme ? 'theme-dark-color' : ''}`}>{t('Bio')}</h5>
                <textarea
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  value={profile?.bio}
                  className={`form-control ${theme ? 'bg_input' : ''}`}
                  style={{ minHeight: 110, width: '100%', paddingLeft: '10px' }}
                  placeholder={t('addYourBio')}
                />
              </div>
            </div>

            <div className="form-group space-y-10">
              <div className="space-y-40">
                <div className="d-flex flex-column">
                  <h5 className={`mt-3 ${theme && 'theme-dark-color'}`}>{t('Instagram')}</h5>
                  <input
                    onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                    value={profile?.instagram}
                    type="text"
                    className={`form-control ${theme ? 'bg_input' : ''}`}
                    placeholder="https://instagram.com/quote9"
                  />
                </div>
                <div className="d-flex flex-column">
                  <h5 className={`mt-3 ${theme ? 'theme-dark-color' : ''}`}>{t('Twitter')}</h5>
                  <input
                    onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                    value={profile?.twitter}
                    type="text"
                    className={`form-control ${theme ? 'bg_input' : ''}`}
                    placeholder="https://twitter.com/BarackObama"
                  />
                </div>
                <div className="d-flex flex-column">
                  <h5 className={`mt-3 ${theme ? 'theme-dark-color' : ''}`}>{t('Discord')}</h5>
                  <input
                    type="text"
                    onChange={(e) => setProfile({ ...profile, discord: e.target.value })}
                    value={profile?.discord}
                    className={`form-control ${theme ? 'bg_input' : ''}`}
                    placeholder="https://discord.com/abc.1"
                  />
                </div>
              </div>
              <div>
                <button className="btn btn-main mt-3" onClick={saveProfile}>{t(`Save`)}
                </button>
              </div>
            </div>
          </div>
          <div className="col-6">

            {profile?.cover && <div className="cover">
              <img alt="cover"
                style={{ width: '50%', height: '50%', objectFit: 'cover', marginTop: '3px' }}
                src={profile?.cover}
              />
            </div>
            }

          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}
export default EditProfile;
