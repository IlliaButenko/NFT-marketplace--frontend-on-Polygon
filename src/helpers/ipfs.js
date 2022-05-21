import axios from 'axios';

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY
const PINATA_SECRET_API_KEY = process.env.REACT_APP_PINATA_SECRET_API_KEY
const PINATA_GATEWAY = process.env.REACT_APP_PINATA_GATEWAY

const URL = `https://api.pinata.cloud`;
export const GATEWAY_URL = PINATA_GATEWAY || 'https://ipfs.io/ipfs/'

const authHeaders = {
  pinata_api_key: PINATA_API_KEY,
  pinata_secret_api_key: PINATA_SECRET_API_KEY,
  Authorization: ''
}

const axiosInstance = axios.create({
  baseURL: URL,
  headers: authHeaders
});

export const testAuthentication = () => {
  return axios.get(`${URL}/data/testAuthentication`);
}

export const getUrl = (uri) => {
  if (!uri) {
    return undefined;
  }
  const hash = uri.split('/ipfs/').pop();
  return `${GATEWAY_URL}/${hash}`;
}

export const pinFileToIPFS = async (file) => {
  const data = new FormData();
  const url = `/pinning/pinFileToIPFS`;
  data.append('file', file);

  const res = await axiosInstance
    .post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    })

  return `${GATEWAY_URL}/${res.data.IpfsHash}`;
};

export const pinJSONToIPFS = async (data) => {
  const url = `/pinning/pinJSONToIPFS`;
  const res = await axiosInstance.post(url, data);
  return `${GATEWAY_URL}/${res.data.IpfsHash}`;
};
