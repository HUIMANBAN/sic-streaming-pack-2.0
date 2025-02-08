const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// 提供静态文件（如 CSS, JS, 图片等）
router.use(express.static(path.resolve(__dirname, '../../public')));

// 中间件，用于解析 JSON 格式的请求体
router.use(express.json()); // 解析 JSON 数据

function readModeJSON() {
    //读取模式
    const data = fs.readFileSync(path.resolve(__dirname, '../../public/json/mode.json'));
    return JSON.parse(data.toString());
}
router.get('/mode', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.resolve(__dirname, '../../public/html/mode.html'));
});

router.post('/choice', (req, res) => {
    // console.log(req.body);
    if (req.body) {
        // res.set('Content-Type', 'text/plain; charset=utf-8');
        res.status(200);
        res.statusText = 'OK! 666';
        res.send(req.body.mode);
    }
    fs.writeFileSync(path.resolve(__dirname, '../../public/json/mode.json'), JSON.stringify(req.body));
});


router.get('/modeNum', (req, res) => {
    const dataJSON = readModeJSON();
    // console.log(dataJSON.mode);
    res.send(dataJSON.mode);
});


module.exports = router;
