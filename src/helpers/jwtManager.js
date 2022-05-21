const createJwtManager = () => {
  let jwtToken = localStorage.getItem("token");

  const get = () => jwtToken;

  const set = (token) => {
    jwtToken = token;
    localStorage.setItem("token", token);
    return true;
  };

  const clear = () => {
    jwtToken = null;
    localStorage.removeItem("token");
    return true;
  };

  return {
    set,
    get,
    clear,
  };
};

export const jwtManager = createJwtManager();
