import express from 'express';
import fs from 'fs';
import path from 'path';
import sendHTML from '../utils/sendHTML.mjs';
import getCurrentTime from '../utils/getCurrentTime.mjs';

const renderRoutes = express.Router();
const __dirname = import.meta.dirname;


// 提供静态文件（如 CSS, JS, 图片等）
renderRoutes.use(express.static(path.resolve(__dirname, '../../public')));
// 中间件，用于解析 JSON 格式的请求体
renderRoutes.use(express.json()); // 解析 JSON 数据

//=========================================================================================
//loading页面
//横屏
renderRoutes.get('/h-loading', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    const filePath = path.resolve(__dirname, '../../public/views/render/h-loading.html');
    sendHTML(res, filePath);
});
//竖屏
renderRoutes.get('/v-loading', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    const filePath = path.resolve(__dirname, '../../public/views/render/v-loading.html');
    sendHTML(res, filePath);
});

//文本和时间
renderRoutes.get('/loadingData', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    let data;
    const filePath = path.resolve(__dirname, '../data/loading.json');
    try {
        data = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        if (err) {
            res.status(404).send('File not found');
            console.log(`${getCurrentTime()} [ERROR] File not found: ${filePath}`);
        } else {
            res.status(200);
        }
    } finally {
        if (res.statusCode === 200) {
            res.send(data);
            console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} OK]`);
        } else if (res.statusCode === 404) {
            console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} Not Found]`);
        }
    }
});

//=========================================================================================
//pause页面
//横屏
renderRoutes.get('/h-pause', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    const filePath = path.resolve(__dirname, '../../public/views/render/h-pause.html');
    sendHTML(res, filePath);
});
//竖屏
renderRoutes.get('/v-pause', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    const filePath = path.resolve(__dirname, '../../public/views/render/v-pause.html');
    sendHTML(res, filePath);
});

renderRoutes.get('/pauseData', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    let data;
    const filePath = path.resolve(__dirname, '../data/pause.json');
    try {
        data = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        if (err) {
            res.status(404).send('File not found');
            console.log(`${getCurrentTime()} [ERROR] File not found: ${filePath}`);
        } else {
            res.status(200);
        }
    } finally {
        if (res.statusCode === 200) {
            res.send(data);
            console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} OK]`);
        } else if (res.statusCode === 404) {
            console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} Not Found]`);
        }
    }
});

//=========================================================================================
//endNoCam页面
//横屏
renderRoutes.get('/h-endNoCam', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    const filePath = path.resolve(__dirname, '../../public/views/render/h-endNoCam.html');
    sendHTML(res, filePath);
});
//竖屏
renderRoutes.get('/v-endNoCam', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    const filePath = path.resolve(__dirname, '../../public/views/render/v-endNoCam.html');
    sendHTML(res, filePath);
});


//=========================================================================================
//end页面
//横屏
renderRoutes.get('/h-end', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    const filePath = path.resolve(__dirname, '../../public/views/render/h-end.html');
    sendHTML(res, filePath);
});


//=========================================================================================
//watermark页面
//横屏
renderRoutes.get('/h-watermark', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    const filePath = path.resolve(__dirname, '../../public/views/render/h-watermark.html');
    sendHTML(res, filePath);
});
//竖屏
renderRoutes.get('/v-watermark', (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    const filePath = path.resolve(__dirname, '../../public/views/render/v-watermark.html');
    sendHTML(res, filePath);
});

export default renderRoutes;