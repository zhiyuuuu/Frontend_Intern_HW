// var express = require('express');
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

// const fetch = (...args) => {
//     import ('node-fetch').then(({default: fetch}) => fetch(...args));
// }

const CLIENT_ID = "a578daa362dae8069c34";
const CLIENT_SECRET = "39e4e1c518cdd6cb88ce3a8ff32b93d8eb6d1114";

const app = express();

app.use(cors());
app.use(bodyParser.json());


const getAccessToken = async(code) => {
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + code;
  
    return await axios.post("https://github.com/login/oauth/access_token" + params, {
    }).then((res) => {
    //   console.log('received from github', res);
      return res.data;
    })
}

const fetchAssignedIssues = async(token, page) => {
    return await axios.get(`https://api.github.com/issues?filter=all&per_page=10&page=${page}&state=all`, {
        headers: {
            "Authorization": token
        }
    }).then((res) => {
        // console.log('assigned', res.data);
        return res.data;
    })
}

const reqCloseIssue = async(token, owner, repo, issueNumber) => {
    return await axios.patch(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
    { 'state': 'closed' },
    {
        headers: {
            "Authorization": token
        }
    }).then((res) => {
        console.log('issus closed!');
        return res.data;
    })
}


//from frontend
app.get('/getAccessToken', async function (req, res) {
    const code = req.query.code;
    // console.log('code from frontend=', code);
    const data = await getAccessToken(code);
    // console.log('data in server', data);
    res.json(data)
})

//get issue data
app.get('/getIssueData', async function(req, res) {
    console.log('get access token: ', req.get("Authorization"))
    // console.log('get page', req.get("page"));
    // const token = "token " + PERSONAL_ACCESS_TOKEN
    const token = "token " + req.get("Authorization")
    const issuedata = await fetchAssignedIssues(token, req.get("page"))
    // console.log('fetch issue data', issuedata);
    res.json(issuedata);
})

app.get('/closeIssue', async function(req, res) {
    const accessToken = "Bearer " + req.get('Authorization');
    const owner = req.get('owner');
    const repo = req.get('repo');
    const issueNumber= req.get('issueNumber');
    console.log('server received header:', accessToken, owner, repo, issueNumber);

    const reqToClose = await reqCloseIssue(accessToken, owner, repo, issueNumber);
    console.log('close issue', reqToClose);
    res.json(reqToClose);
})

const port = process.env.PORT || 4000;

app.listen(port, () =>
    console.log(`Server is up on port ${port}!`),
);
