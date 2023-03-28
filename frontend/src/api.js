import axios from 'axios';

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/"
    : `http://localhost:4000/`;

const instance = axios.create({ baseURL: API_ROOT });


const getGitHubToken = async(code) => {
  return await instance.get("/getAccessToken?code=" + code).then((res) => {
    console.log('receive from server', res);
    return res.data;
  });
}

export { getGitHubToken } 