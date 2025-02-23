import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import sendHTML from "../utils/sendHTML.mjs";
import getDirName from "../utils/getDirName.mjs";

const setRoutes = express.Router();

const dirname = getDirName(import.meta.url);

// 提供静态文件（如 CSS, JS, 图片等）
setRoutes.use(express.static(path.resolve(dirname, "../../frontend")));

// 中间件，用于解析 JSON 格式的请求体
setRoutes.use(express.json()); // 解析 JSON 数据


//横屏模式设置页面
setRoutes.get("/landscape", (req, res) => {
    const filePath = path.resolve(dirname, "../../frontend/views/set/L-set.html");
    sendHTML(res, filePath);
});

//竖屏模式设置页面
setRoutes.get("/portrait", (req, res) => {
    const filePath = path.resolve(dirname, "../../frontend/views/set/P-set.html");
    sendHTML(res, filePath);
});

//loading提交的数据路由
setRoutes.post("/loadingData", (req, res) => {
    fs.writeFile(path.resolve(dirname, "../data/loading.json"), JSON.stringify(req.body), "utf-8", (err) => {
        if (!err) res.status(200).send(null);
    });
});

//海报上传
const dirPath = path.resolve(dirname, "../../frontend/upload");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, dirPath);
    },
    filename: (req, file, callback) => {
        callback(null, "poster");
    }
});

const upload = multer({storage: storage});

setRoutes.post("/upload", upload.single("poster"), (req, res) => {
    if (req.file) {
        res.status(200);
    }
});
//=================================================================================================
//pause提交的数据路由
setRoutes.post("/pauseData", (req, res) => {
    fs.writeFile(path.resolve(dirname, "../data/pause.json"), JSON.stringify(req.body), "utf-8", (err) => {
        if (!err) res.status(200).send(null);
    });
});

export default setRoutes;