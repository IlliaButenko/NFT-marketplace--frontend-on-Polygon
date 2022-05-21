import axios from 'axios';

export async function activity(page, size) {
  return axios.get("transaction/activity", {
    params: {
      page,
      size,
    }
  });
}

export async function ranking(page, size) {
  return axios.get("transaction/ranking", {
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
  return axios.get(`collections/creator/${creatorId}`);
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

