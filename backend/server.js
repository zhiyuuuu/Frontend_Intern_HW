// var express = require('express');
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import path from "path";
require('dotenv').config()

// const fetch = (...args) => {
//     import ('node-fetch').then(({default: fetch}) => fetch(...args));
// }

const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET;

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(cors());
}

//init middleware
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

const getAccessToken = async(code) => {
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + code;
    console.log(CLIENT_ID);
  
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

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}

const port = process.env.PORT || 4000;

app.listen(port, () =>
    console.log(`Server is up on port ${port}!`),
);
