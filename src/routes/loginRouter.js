const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// 提供静态文件（如 CSS, JS, 图片等）
router.use(express.static(path.resolve(__dirname, '../../public')));
// 中间件，用于解析 JSON 格式的请求体
router.use(express.json()); // 解析 JSON 数据

let loginLock;

function readUserJSON() {
    //本地文件中的用户名和密码
    const data = fs.readFileSync(path.resolve(__dirname, '../../public/json/admin.json'));
    return JSON.parse(data.toString());
}

router.get('/', (req, res) => {
    if (loginLock) {
        res.redirect('mode');
        return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.resolve(__dirname, '../../public/html/login.html'));
});

router.post('/login', (req, res) => {
    //本地文件中的用户名和密码
    const dataJSON = readUserJSON();

    //前端输入的用户名和密码
    const user = req.body;
    if (user.username === '' || user.password === '') {
        res.status(401).send('用户名或密码不能为空！');
    } else {
        if (user.username === dataJSON.username &&
            user.password === dataJSON.password) {
            res.send('/mode');
            loginLock = true;
        } else {
            res.status(401).send('用户名或密码不正确！');
        }
    }
});

router.get('/reset', (req, res) => {
    loginLock = false;
    res.sendFile(path.resolve(__dirname, '../../public/html/reset.html'));
});

router.post('/resetUser', (req, res) => {
    const newUser = req.body;
    const newName = newUser.newName;
    const newPass = newUser.newPass;
    const str = {
        'username': `${newName}`,
        'password': `${newPass}`
    };
    fs.writeFileSync(path.resolve(__dirname, '../../public/json/admin.json'), JSON.stringify(str));
    res.statusCode = 200;
});


module.exports = router;
