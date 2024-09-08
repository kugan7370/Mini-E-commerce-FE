const getToken = async () => {
  return localStorage.getItem("token");
};

const setToken = async (token) => {
  localStorage.setItem("token", token);
};

const getUser = async () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = async (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearStorage = async () => {
  localStorage.clear();
};

export { getToken, setToken, getUser, setUser, clearStorage };
