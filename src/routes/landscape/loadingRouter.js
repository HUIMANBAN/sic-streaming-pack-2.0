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

router.post('/loadingData', (req, res) => {
    fs.writeFileSync(path.resolve(__dirname, '../../../public/json/loading.json'), JSON.stringify(req.body), 'utf-8');
    //替换的文件位置
    const loadingFilePath = path.resolve(__dirname, '../../../public/html/landscape/loading.html');
    // 读取文件内容
    let loadingData = fs.readFileSync(loadingFilePath, 'utf-8');
    loadingData = loadingData.replace(/<div id="top"><p>.*<\/p><\/div>/g,
        `<div id="top"><p>${req.body.mainHeader}</p></div>`);
    loadingData = loadingData.replace(/<div id="host">.*<\/div>/g,
        `<div id="host">${req.body.subHeader}</div>`);
    fs.writeFileSync(loadingFilePath, loadingData, 'utf-8');

    const settingsFilePath = path.resolve(__dirname, '../../../public/html/landscape/settings.html');
    let settingsData = fs.readFileSync(settingsFilePath, 'utf-8');
    settingsData = settingsData.replace(/<input id="main" type="text" name="mainHeadingInput" value=".*">/g,
        `<input id="main" type="text" name="mainHeadingInput" value="${req.body.mainHeader}">`);
    settingsData = settingsData.replace(/<input type="text" name="subHeadingInput" value=".*">/g,
        `<input type="text" name="subHeadingInput" value="${req.body.subHeader}">`);
    settingsData = settingsData.replace(/<input type="datetime-local" name="timeInput" value=".*">/g,
        `<input type="datetime-local" name="timeInput" value="${req.body.startTime}">`);
    fs.writeFileSync(settingsFilePath, settingsData, 'utf-8');

    //替换的文件位置
    const loadingPortraitFilePath = path.resolve(__dirname, '../../../public/html/portrait/loading-portrait.html');
    // 读取文件内容
    let loadingPortraitData = fs.readFileSync(loadingPortraitFilePath, 'utf-8');
    loadingPortraitData = loadingPortraitData.replace(/<div id="top"><p>.*<\/p><\/div>/g,
        `<div id="top"><p>${req.body.mainHeader}</p></div>`);
    loadingPortraitData = loadingPortraitData.replace(/<div id="host">.*<\/div>/g,
        `<div id="host">${req.body.subHeader}</div>`);
    fs.writeFileSync(loadingPortraitFilePath, loadingPortraitData, 'utf-8');

    const settingsPortraitFilePath = path.resolve(__dirname, '../../../public/html/portrait/settings-portrait.html');
    let settingsPortraitData = fs.readFileSync(settingsPortraitFilePath, 'utf-8');
    settingsPortraitData = settingsPortraitData.replace(/<input id="main" type="text" name="mainHeadingInput" value=".*">/g,
        `<input id="main" type="text" name="mainHeadingInput" value="${req.body.mainHeader}">`);
    settingsPortraitData = settingsPortraitData.replace(/<input type="text" name="subHeadingInput" value=".*">/g,
        `<input type="text" name="subHeadingInput" value="${req.body.subHeader}">`);
    settingsPortraitData = settingsPortraitData.replace(/<input type="datetime-local" name="timeInput" value=".*">/g,
        `<input type="datetime-local" name="timeInput" value="${req.body.startTime}">`);
    fs.writeFileSync(settingsPortraitFilePath, settingsPortraitData, 'utf-8');

    res.send('OK');
});

const dirPath = path.resolve(__dirname, '../../../public/image/upload');
router.post('/upload', (req, res) => {
    fse.emptyDirSync(dirPath);
    let pic;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    pic = req.files.posterInput;
    uploadPath = path.resolve(__dirname, '../../../public/image/upload/poster');
    pic.mv(uploadPath, null);
    res.send('OK');
});


router.get('/loading', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../public/html/landscape/loading.html'));
});

router.get('/time', (req, res) => {
    let data = (fs.readFileSync(path.resolve(__dirname, '../../../public/json/loading.json'), 'utf-8')).toString();
    let json = JSON.parse(data);
    let startTime = json.timestamp;
    res.send(String(startTime));
});

module.exports = router;