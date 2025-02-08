//导入模块
import express from "express";
import path from "path";
import fs from "fs";
import getCurrentTime from "../utils/getCurrentTime.mjs";
import sendHTML from "../utils/sendHTML.mjs";
import LogInfo from '../utils/printInfo.mjs';
import printInfo from '../utils/printInfo.mjs';

//__dirname获取当前文件的目录名
const __dirname = import.meta.dirname;

const loginRoutes = express.Router();
loginRoutes.use(express.static(path.resolve(__dirname, "../../public")));
loginRoutes.use(express.json());

//登录状态
let isLogin;

//检测登录状态中间件
function checkLogin(req, res, next) {
    if (isLogin) {
        res.redirect("/mode");
    } else {
        next();
    }
}

//登录路由
loginRoutes.get("/login", checkLogin, (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const filePath = path.resolve(__dirname, "../../public/views/set/login.html");
    sendHTML(res,filePath);
});

//检测用户数据中间件
function checkUser(req, res, next) {
    //前端输入的用户数据
    const userReq = req.body;
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    //服务端的用户数据
    let userData;
    try {
        userData = JSON.parse(fs.readFileSync(
            path.resolve(__dirname, "../data/user.json"), "utf-8"));
    } catch (err) {
        if (err) {
            console.log();
        }
    }

    // 验证用户
    if (userReq.username === userData.username &&
        userReq.password === userData.password) {
        res.status(200).send("/mode");
        console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} OK]`);
        console.log(`${getCurrentTime()} [INFO] User "${userReq.username}" logged in`);
        console.log();
        next();
    } else {
        res.status(401).send("用户名或密码不正确！");
        console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} Unauthorized]`);
        console.log(`${getCurrentTime()} [WARN] Login failed: Invalid username or password for user "${userReq.username}"`);
        console.log();
    }
}

//用户数据请求路由
loginRoutes.post("/loginData", checkUser, (req, res) => {
    isLogin = true;
});

export default loginRoutes;

export function getIsLogin() {
    return isLogin;
}

