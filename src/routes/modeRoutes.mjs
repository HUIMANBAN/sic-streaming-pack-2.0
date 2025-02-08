import express from "express";
import fs from "fs";
import path from "path";
import getCurrentTime from "../utils/getCurrentTime.mjs";
import {getIsLogin} from "./loginRoutes.mjs";
import sendHTML from "../utils/sendHTML.mjs";

const modeRoutes = express.Router();
const __dirname = import.meta.dirname;

// 提供静态文件（如 CSS, JS, 图片等）
modeRoutes.use(express.static(path.resolve(__dirname, "../../public")));

// 中间件，用于解析 JSON 格式的请求体
modeRoutes.use(express.json()); // 解析 JSON 数据

modeRoutes.get("/mode", (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    if (!getIsLogin()) {
        res.status(302);
        res.redirect("/login");
        console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} Found]`);
        console.log(`${getCurrentTime()} [INFO] Redirecting user from ${req.url} to /login`);
        return;
    }
    res.setHeader("Content-Type", "text/html");
    const filePath = path.resolve(__dirname, "../../public/views/set/mode.html");
    sendHTML(res, filePath);
});

modeRoutes.post("/choice", (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url} ${JSON.stringify(req.body)}`);
    const mode = req.body.mode;
    if (mode === "0" || mode === "1") {
        res.status(200).send(mode);
        console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} OK]`);
        fs.writeFileSync(path.resolve(__dirname, "../data/mode.json"), JSON.stringify(req.body));
        console.log();
    } else {
        res.status(400);
        console.log(`${getCurrentTime()} [ERROR] Bad request received at /choice`);
        console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} Bad Request]`);
        console.log();
    }
});


export default modeRoutes;
