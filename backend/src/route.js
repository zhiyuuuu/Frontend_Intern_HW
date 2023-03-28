import express from 'express';
const router = express.Router();

router.get('/getUserData', async(req, res) => {
    const code = req.query.code;
    console.log('code from frontend=', code);
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + code;

    await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
        }),
    }).then((response) => {
        // console.log('get token response', response.json());
        return response.json();
    }).then((data) => {
        console.log('data', data);
        res.json(data);
    }).catch(error => {
        // 解析失敗，處理錯誤
        if (error instanceof SyntaxError) {
          console.error('無法解析回應資料：', error);
        } else {
          console.error('發生未知錯誤：', error);
        }
    });

})
