import axios from 'axios';

export async function collections(page, size) {
  return axios.get("collections", {
    params: {
      page,
      size,
    }
  });
}

export async function createCollection(payload) {
  return axios.post("collections", payload);
}

export async function getByCreator(creatorId) {
  const res = axios.get(`collections/creator/${creatorId}`);
  
  return res;
}

export async function getById(id) {
  return axios.get(`collections/${id}`);
}

export async function getNfts(id) {
  return axios.get(`nfts/collection/${id}`);
}

export async function getSaleNfts(id) {
  return axios.get(`nfts/collection/sale/${id}`);
}

