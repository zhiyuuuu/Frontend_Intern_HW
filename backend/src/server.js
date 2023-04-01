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
const PERSONAL_ACCESS_TOKEN = "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";

const app = express();

app.use(cors());
app.use(bodyParser.json());


const getAccessToken = async(code) => {
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + code;
  
    return await axios.post("https://github.com/login/oauth/access_token" + params, {
        headers: {
            "X-OAuth-Scopes": "repo, user",
            "X-Accepted-OAuth-Scopes": "user"
        }
    }).then((res) => {
    //   console.log('received from github', res);
      return res.data;
    })
}

const fetchUserData = async(token) => {
    return await axios.get("https://api.github.com/user", 
    {
        headers: {
            "Authorization": token
        }
    }).then((res) => {
        // console.log("User data from github", res.data);
        return res.data;
    })
}

const fetchRepos = async(owner, token) => {
    const namelist = []
    return await axios.get(`https://api.github.com/users/${owner}/repos`, 
    {   
            headers: {
                "Authorization": token
            }
        }).then((res) => {
            res.data.map((repo) => {
                namelist.push(repo.full_name)
            })
            console.log("User repo full name from github", namelist);
            return namelist;
        })
}

// const fetchUserIssue = async(token) => {
//     console.log('authorization token', token);
//     const user = await fetchUserData(token);
//     const userName = user.login;
//     const repoList = await fetchRepos(userName, token);
//     // console.log('repo', repoList);
//     // console.log('username', userName);
//     const issues = []
//     async function listRepoIssues () { 
//         repoList.map(async(repo) => {
//             const issue = await axios.get(`https://api.github.com/repos/${repo}/issues`, {
//                 headers: {
//                     "Authorization": token
//                 }
//             }).then((res) => {
//                 console.log('Issues in repo ', repo,':', res.data);
//                 return res.data;
//             })
//             issues.push(issue);
//         })
//     }
//     await listRepoIssues();
//     console.log('issues', issues);
// }

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


//from frontend
app.get('/getAccessToken', async function (req, res) {
    const code = req.query.code;
    // console.log('code from frontend=', code);
    const data = await getAccessToken(code);
    // console.log('data in server', data);
    res.json(data)
})

//get user data
app.get('/getIssueData', async function(req, res) {
    console.log('get access token', req.get("Authorization"))
    console.log('get page', req.get("page"));
    // const state = req.get("state");
    // const data = await fetchUserIssue(req.get("Authorization"));
    const personal_token = "token " + PERSONAL_ACCESS_TOKEN
    const issuedata = await fetchAssignedIssues(personal_token, req.get("page"))
    // console.log('fetch issue data', issuedata);
    res.json(issuedata);
})


const port = process.env.PORT || 4000;

app.listen(port, () =>
    console.log(`Server is up on port ${port}!`),
);
