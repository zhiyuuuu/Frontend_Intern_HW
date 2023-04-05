import axios from 'axios';

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/"
    : `http://localhost:4000/`;

const instance = axios.create({ baseURL: API_ROOT });


const getGitHubToken = async(code) => {
  return await instance.get("/getAccessToken?code=" + code).then((res) => {
    // console.log('receive from server', res);
    return res.data;
  });
}

const getIssues = async(token, page) => {
  return await instance.get("/getIssueData", { headers: { 'Authorization': token, "page": page }}).then((res) => {
    // console.log('received user data', res);
    return res.data;
  })
}

const closeIssue = async(token, username, repoName, issueNo) => {
  return await instance.get("/closeIssue", { 
    headers: { 
      "Authorization": token, 
      "owner": username,
      "repo": repoName,
      "issueNumber": issueNo
    } 
  }).then((res) => {
    // console.log('api received closed issue', res.data);
    return res.data;
  })
}

const updateIssue = async(token, username, repoName, issueNo, data) => {
  console.log('api received data', data);
  return await instance.get("/updateIssue", { 
    headers: { 
      "Authorization": token, 
      "owner": username,
      "repo": repoName,
      "issueNumber": issueNo,
    }, params: data 
  }).then((res) => {
    console.log('api received updated issue', res.data);
    return res.data;
  })
}

export { getGitHubToken, getIssues, closeIssue, updateIssue } 