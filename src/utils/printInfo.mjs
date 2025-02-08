import getCurrentTime from "./getCurrentTime.mjs";
import port from "./setPort.mjs";


function printInfo() {
    console.log();
    console.log(
        "   /$$$$$$        /$$$$$$        /$$$$$$ \n" +
        "  /$$__  $$      |_  $$_/       /$$__  $$\n" +
        " | $$  \\__/        | $$        | $$  \\__/\n" +
        " |  $$$$$$         | $$        | $$      \n" +
        "  \\____  $$        | $$        | $$      \n" +
        "  /$$  \\ $$        | $$        | $$    $$\n" +
        " |  $$$$$$/       /$$$$$$      |  $$$$$$/\n" +
        "  \\______/       |______/       \\______/");
    console.log();
    console.log("程序原创：黄浩泓、刘梦云、马世龙\n程序重构：许文彬");
    console.log("温馨提示：直播期间请勿关闭黑窗口！！！");
    console.log("==========================================================================================================");
    console.log(`${getCurrentTime()} [INFO] Node.js ${process.version} Development Server started successfully on port ${port}`);
}

export default printInfo;