const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const fse = require('fs-extra');
const fileUpload = require('express-fileupload');

// 提供静态文件（如 CSS, JS, 图片等）
router.use(express.static(path.resolve(__dirname, '../../../public')));

// 中间件，用于解析 JSON 格式的请求体
router.use(express.json()); // 解析 JSON 数据
router.use(fileUpload(null));

// routes.post('/loadingData', (req, res) => {
//     fs.writeFileSync(path.resolve(__dirname, '../../public/json/loading.json'), JSON.stringify(req.body), 'utf-8');
//
//     res.send('OK');
// });
//
// const dirPath = path.resolve(__dirname, '../../public/image/upload');

// router.post('/upload', (req, res) => {
//     fse.emptyDirSync(dirPath);
//     let pic;
//     let uploadPath;
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     pic = req.files.posterInput;
//     uploadPath = path.resolve(__dirname, '../../public/image/upload/poster');
//     pic.mv(uploadPath, null);
//     res.send('OK');
// });


router.get('/loading_portrait', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../public/html/portrait/loading-portrait.html'));
});

router.get('/time', (req, res) => {
    let data = (fs.readFileSync(path.resolve(__dirname, '../../../public/json/loading.json'), 'utf-8')).toString();
    let json = JSON.parse(data);
    let startTime = json.timestamp;
    res.send(String(startTime));
});

module.exports = router;