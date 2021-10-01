import axios from 'axios';

const url = process.env.REACT_APP_URL_API;

export const getUsersApi = async () => {
  const res = await axios.get(`${url}/?results=28`);
  return res;
};
