import path from "path";
import fs from "fs";
import express from "express";
import sendHTML from "../utils/sendHTML.mjs";
import getCurrentTime from "../utils/getCurrentTime.mjs";

//__dirname获取当前文件的目录名
const __dirname = import.meta.dirname;
console.log(__dirname);
const resetRoutes = express.Router();
resetRoutes.use(express.static(path.resolve(__dirname, "../../public")));
resetRoutes.use(express.json());

resetRoutes.get("/reset", (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    res.setHeader("Content-Type", "text/html;utf-8");
    const filePath = path.resolve(__dirname, "../../public/views/set/reset.html");
    sendHTML(res,filePath);
});

resetRoutes.post("/resetData", (req, res) => {
    console.log(`${getCurrentTime()} [INFO] Incoming Request: [${req.method}] ${req.url}`);
    const {newName, newPass} = req.body;
    const str = {
        "username": `${newName}`,
        "password": `${newPass}`
    };
    fs.writeFileSync(path.resolve(__dirname, "../data/user.json"), JSON.stringify(str));
    res.status(200).send("/login")
    console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} OK]`);
});

export default resetRoutes;