import axios from 'axios';

export async function loginBySign(address, sign) {
  return axios.post("auth/wallet_login", {
    address,
    sign,
  });
};

export async function getNonce(address) {
  return axios.post("users/nonce", {
    address,
  });
};

export async function getMe() {
  return axios.post("auth/me");
}

export async function profile(id) {
  return axios.get("users/" + id);
}

export async function users(page, size) {
  return axios.get("users", {
    params: {
      page,
      size,
    }
  });
}
  
export async function updateProfile(id, body) {
  return axios.patch("users/" + id, body);
}
