import axios from 'axios';

export async function listMarket(query = null, page = 1, limit = 20) {
  if (query) {
    const qs = Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');
    return axios.get(`/nfts/sales?${qs}`, {
      params: {
        page,
         limit: parseInt(limit),
      }
    });
  }

  return axios.get(`/nfts/sales`, {
    params: {
      page,
       limit: parseInt(limit),
    }
  });

};

export async function searchMarket(query = null, page = 1, limit = 20) {
  if (query) {
    const qs = Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');
    // const limitData = parseInt(limit)
    return axios.get(`/nfts/sales/search?${qs}`, {
      params: {
        page,
        limit: parseInt(limit)
      }
    });
  }

  return axios.get(`/nfts/sales`, {
    params: {
      page,
       limit: parseInt(limit),
    }
  });

};

export async function listTypeMarket(type, page = 1, limit = 20) {
  return axios.get(`/nfts/sales`, {
    params: {
      page,
       limit: parseInt(limit),
      filter: type
    }
  });
};

export async function listByUser(userId, filter) {
  return axios.get(`users/${userId}/nfts`, {
    params: {
      ...filter,
    }
  });
};

export async function refreshUri(id) {
  return axios.get(`nfts/${id}/refresh`);
  return { data: undefined };
};

export async function randomMeta(total) {
  return axios.post(`nfts/metadata`, { total });
}

export async function create(payload) {
  return axios.post(`nfts`, payload);
}

export async function crawl(chainId, address, transactionHash) {
  return axios.post(`nfts/crawl`, {
    chainId,
    address,
    transactionHash,
  });
}

export async function getNft(id) {
  return axios.get(`nfts/${id}`);
};

export async function getBids(saleId) {
  return axios.get(`nfts/sales/${saleId}/bids`);
};

export async function putOnSale(payload) {
  return axios.post(`nfts/sales`, payload);
}

export async function buy(payload) {
  return axios.post(`nfts/buy`, payload);
}

export async function getTopSeller() {
  return axios.get(`nfts/topseller`);
};

export async function getFeature() {
  return axios.get(`nfts/feature`);
};

export async function createSaleLazy(payload) {
  return axios.post(`nfts/lazy`, payload);
}

export async function takeOffSaleLazy(id) {
  return axios.delete(`nfts/lazy/${id}`);
}