import axios from 'axios';

export const fetchData = async (url) => {
  const response = await axios.get(url);
  return response.data;
}


export const postData = async (url, data) => {
  const response = await axios.post(url, data);
  return response.data;
}

export const getDataWithToken = async (url, token) => {
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postDataWithToken = async (url, data, token) => {
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}


export const login = async (url, data) => {
  const response = await axios.post(url, data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
}
