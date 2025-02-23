import "./backend/routes/index.mjs"

import port from "./backend/utils/setPort.mjs";

function printInfo() {
    console.log("\n" +
        "   /$$$$$$        /$$$$$$        /$$$$$$ \n" +
        "  /$$__  $$      |_  $$_/       /$$__  $$\n" +
        " | $$  \\__/        | $$        | $$  \\__/\n" +
        " |  $$$$$$         | $$        | $$      \n" +
        "  \\____  $$        | $$        | $$      \n" +
        "  /$$  \\ $$        | $$        | $$    $$\n" +
        " |  $$$$$$/       /$$$$$$      |  $$$$$$/\n" +
        "  \\______/       |______/       \\______/\n");
    console.log("程序原创：黄浩泓、刘梦云、马世龙（1.0版本）\n程序重构：许文彬（2.0版本）");
    console.log("温馨提示：直播期间请勿关闭黑窗口！！！");
    console.log("当前版本：\x1b[32mv2.2.0\x1b[0m");
    console.log(`Node.js Server started successfully on port ${port}`);
}
printInfo()

