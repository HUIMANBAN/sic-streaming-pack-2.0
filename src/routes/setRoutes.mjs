import express from "express";
import path from "path";
import fse from "fs-extra";
import fs from "fs";
import multer from "multer";
import getCurrentTime from "../utils/getCurrentTime.mjs";
import sendHTML from "../utils/sendHTML.mjs";

const setRoutes = express.Router();
const __dirname = import.meta.dirname;

// 提供静态文件（如 CSS, JS, 图片等）
setRoutes.use(express.static(path.resolve(__dirname, "../../public")));

// 中间件，用于解析 JSON 格式的请求体
setRoutes.use(express.json()); // 解析 JSON 数据

//=================================================================================================
//横屏模式设置页面
setRoutes.get("/horizontal", (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const filePath = path.resolve(__dirname, "../../public/views/set/h-set.html");
    sendHTML(res, filePath);
});
//=================================================================================================
//竖屏模式设置页面
setRoutes.get("/vertical", (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const filePath = path.resolve(__dirname, "../../public/views/set/v-set.html");
    sendHTML(res, filePath);
});
//=================================================================================================
//loading提交的数据路由
setRoutes.post("/loadingData", (req, res) => {
    fs.writeFileSync(path.resolve(__dirname, "../data/loading.json"), JSON.stringify(req.body), "utf-8");
    res.send("OK");
});

//海报上传
const dirPath = path.resolve(__dirname, "../../public/upload");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, dirPath);
    },
    filename: (req, file, callback) => {
        callback(null, "poster");
    }
});

const upload = multer({storage: storage});

function emptyDir(req, res, next) {
    fse.emptyDirSync(dirPath);
    next();
}

setRoutes.post("/upload", emptyDir, upload.single("posterInput"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("没有文件上传");
    } else {
    }
    res.send(`文件上传成功！文件名：${req.file.filename}`);
});
//=================================================================================================
//pause提交的数据路由
setRoutes.post("/pauseData", (req, res) => {
    fs.writeFileSync(path.resolve(__dirname, "../data/pause.json"), JSON.stringify(req.body), "utf-8");
    res.send("OK");
});


export default setRoutes;