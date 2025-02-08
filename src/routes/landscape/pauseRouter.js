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
    //替换的文件位置
    const pauseFilePath = path.resolve(__dirname, '../../../public/html/landscape/pause.html');
    // 读取文件内容
    let pauseData = fs.readFileSync(pauseFilePath, 'utf-8');
    pauseData = pauseData.replace(/<h1 class="pause-title" id="pauseTitle">.*<\/h1>/g,
        `<h1 class="pause-title" id="pauseTitle">${req.body.headerText}</h1>`);
    pauseData = pauseData.replace(/<h2 class="pause-description-html" id="pauseHtml">.*<\/h2>/g,
        `<h2 class="pause-description-html" id="pauseHtml">${req.body.describeText}</h2>`);
    fs.writeFileSync(pauseFilePath, pauseData, 'utf-8');

    const settingsFilePath = path.resolve(__dirname, '../../../public/html/landscape/settings.html');
    let settingsData = fs.readFileSync(settingsFilePath, 'utf-8');
    settingsData = settingsData.replace(/<input type="text" name="header" value=".*">/g,
        `<input type="text" name="header" value="${req.body.headerText}">`);
    settingsData = settingsData.replace(/<input type="text" name="describe" value=".*">/g,
        `<input type="text" name="describe" value="${req.body.describeText}">`);
    fs.writeFileSync(settingsFilePath, settingsData, 'utf-8');

    //替换的文件位置
    const pausePortraitFilePath = path.resolve(__dirname, '../../../public/html/portrait/pause-portrait.html');
    // 读取文件内容
    let pausePortraitData = fs.readFileSync(pausePortraitFilePath, 'utf-8');
    pausePortraitData = pausePortraitData.replace(/<h1 class="pause-title" id="pauseTitle">.*<\/h1>/g,
        `<h1 class="pause-title" id="pauseTitle">${req.body.headerText}</h1>`);
    pausePortraitData = pausePortraitData.replace(/<h2 class="pause-description-html" id="pauseHtml">.*<\/h2>/g,
        `<h2 class="pause-description-html" id="pauseHtml">${req.body.describeText}</h2>`);
    fs.writeFileSync(pausePortraitFilePath, pausePortraitData, 'utf-8');

    const settingsPortraitFilePath = path.resolve(__dirname, '../../../public/html/portrait/settings-portrait.html');
    let settingsPortraitData = fs.readFileSync(settingsPortraitFilePath, 'utf-8');
    settingsPortraitData = settingsPortraitData.replace(/<input type="text" name="header" value=".*">/g,
        `<input type="text" name="header" value="${req.body.headerText}">`);
    settingsPortraitData = settingsPortraitData.replace(/<input type="text" name="describe" value=".*">/g,
        `<input type="text" name="describe" value="${req.body.describeText}">`);
    fs.writeFileSync(settingsPortraitFilePath, settingsPortraitData, 'utf-8');
    res.send('OK');
});

router.get('/pause', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.resolve(__dirname, '../../../public/html/landscape/pause.html'));
});


module.exports = router;