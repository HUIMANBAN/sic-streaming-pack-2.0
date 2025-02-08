const express = require('express');
const path = require('path');
const router = express.Router();

// 提供静态文件（如 CSS, JS, 图片等）
router.use(express.static(path.resolve(__dirname, '../../../public')));
// 中间件，用于解析 JSON 格式的请求体
router.use(express.json()); // 解析 JSON 数据


router.get('/watermark', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.resolve(__dirname, '../../../public/html/landscape/watermark.html'));
});

router.get('/endNoCam', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.resolve(__dirname, '../../../public/html/landscape/end-noCam.html'));
});

router.get('/end', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.resolve(__dirname, '../../../public/html/landscape/end.html'));
});
module.exports = router;