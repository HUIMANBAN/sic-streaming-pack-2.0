import express from 'express';
import path from 'path';
import sendHTML from '../utils/sendHTML.mjs';
import getDirName from '../utils/getDirName.mjs';

//模式路由
const modeRoutes = express.Router();

//dirname为当前文件所在目录的绝对路径
const dirname = getDirName(import.meta.url);

//提供静态文件
modeRoutes.use(express.static(path.resolve(dirname, '../../frontend')));

//中间件，解析JSON格式的请求体
modeRoutes.use(express.json());

modeRoutes.get('/mode', (request, response) => {
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    const filePath = path.resolve(dirname, '../../frontend/views/set/mode.html');
    sendHTML(response, filePath);
});

export default modeRoutes;
