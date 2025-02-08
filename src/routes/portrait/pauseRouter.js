const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

// 提供静态文件（如 CSS, JS, 图片等）
router.use(express.static(path.resolve(__dirname, '../../../public')));
// 中间件，用于解析 JSON 格式的请求体
router.use(express.json()); // 解析 JSON 数据

router.post('/pauseData', (req, res) => {
    fs.writeFileSync(path.resolve(__dirname, '../../../public/json/pause.json'), JSON.stringify(req.body), 'utf-8');


    res.send('OK')
});

router.get('/pause_portrait', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.resolve(__dirname, '../../../public/html/portrait/pause-portrait.html'));
});


module.exports = router;