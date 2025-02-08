const express = require('express');
const path = require('path');
const router = express.Router();


// 提供静态文件（如 CSS, JS, 图片等）
router.use(express.static(path.resolve(__dirname, '../../../public')));

// 中间件，用于解析 JSON 格式的请求体
router.use(express.json()); // 解析 JSON 数据

router.get('/settings', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../public/html/landscape/settings.html'));
});

module.exports = router;