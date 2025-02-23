import express from "express";
import fs from "fs";
import path from "path";
import sendHTML from "../utils/sendHTML.mjs";
import getDirName from "../utils/getDirName.mjs";

const renderRoutes = express.Router();

const dirname = getDirName(import.meta.url);

// 提供静态文件（如 CSS, JS, 图片等）
renderRoutes.use(express.static(path.resolve(dirname, "../../frontend")));
// 中间件，用于解析 JSON 格式的请求体
renderRoutes.use(express.json());

//=========================================================================================
//loading页面
//横屏
renderRoutes.get("/L-loading", (request, response) => {
    const filePath = path.resolve(dirname, "../../frontend/views/render/L-loading.html");
    sendHTML(response, filePath);
});
//竖屏
renderRoutes.get("/P-loading", (request, response) => {
    const filePath = path.resolve(dirname, "../../frontend/views/render/P-loading.html");
    sendHTML(response, filePath);
});

//文本和时间
renderRoutes.get("/loadingData", (request, response) => {
    const filePath = path.resolve(dirname, "../data/loading.json");
    fs.readFile(filePath, "utf8",(err, data)=>{
        response.send(data);
    });
});

//=========================================================================================
//pause页面
//横屏
renderRoutes.get("/L-pause", (request, response) => {
    const filePath = path.resolve(dirname, "../../frontend/views/render/L-pause.html");
    sendHTML(response, filePath);
});
//竖屏
renderRoutes.get("/P-pause", (request, response) => {
    const filePath = path.resolve(dirname, "../../frontend/views/render/P-pause.html");
    sendHTML(response, filePath);
});

renderRoutes.get("/pauseData", (request, response) => {
    const filePath = path.resolve(dirname, "../data/pause.json");
    fs.readFile(filePath, "utf8",(err, data)=>{
        response.send(data);
    });
});

//=========================================================================================
//endNoCam页面
//横屏
renderRoutes.get("/L-endNoCam", (request, response) => {
    const filePath = path.resolve(dirname, "../../frontend/views/render/L-endNoCam.html");
    sendHTML(response, filePath);
});
//竖屏
renderRoutes.get("/P-endNoCam", (request, response) => {
    const filePath = path.resolve(dirname, "../../frontend/views/render/P-endNoCam.html");
    sendHTML(response, filePath);
});


//=========================================================================================
//end页面
//横屏
renderRoutes.get("/L-end", (request, response) => {
    const filePath = path.resolve(dirname, "../../frontend/views/render/L-end.html");
    sendHTML(response, filePath);
});


//=========================================================================================
//watermark页面
//横屏
renderRoutes.get("/L-watermark", (request, response) => {
    const filePath = path.resolve(dirname, "../../frontend/views/render/L-watermark.html");
    sendHTML(response, filePath);
});
//竖屏
renderRoutes.get("/P-watermark", (request, response) => {
    const filePath = path.resolve(dirname, "../../frontend/views/render/P-watermark.html");
    sendHTML(response, filePath);
});

export default renderRoutes;