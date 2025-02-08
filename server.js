const express = require('express');
const app = express();


const loginRouter = require('./src/routes/loginRouter');
app.use(loginRouter);

const modeRouter = require('./src/routes/modeRouter');
app.use(modeRouter);

const settingRouter = require('./src/routes/landscape/settingRouter');
app.use(settingRouter);

const loadingRouter = require('./src/routes/landscape/loadingRouter');
app.use(loadingRouter);

const pauseRouter = require('./src/routes/landscape/pauseRouter');
app.use(pauseRouter);

const endRouter = require('./src/routes/landscape/endRouter');
app.use(endRouter);

const settingPortraitRouter = require('./src/routes/portrait/settingRouter');
app.use(settingPortraitRouter);

const loadingPortraitRouter = require('./src/routes/portrait/loadingRouter');
app.use(loadingPortraitRouter);

const pausePortraitRouter = require('./src/routes/portrait/pauseRouter');
app.use(pausePortraitRouter);

const endPortraitRouter = require('./src/routes/portrait/endRouter');
app.use(endPortraitRouter);


app.listen(port = 54321, () => {
    console.log();
    console.log(
        '   /$$$$$$        /$$$$$$        /$$$$$$ \n' +
        '  /$$__  $$      |_  $$_/       /$$__  $$\n' +
        ' | $$  \\__/        | $$        | $$  \\__/\n' +
        ' |  $$$$$$         | $$        | $$      \n' +
        '  \\____  $$        | $$        | $$      \n' +
        '  /$$  \\ $$        | $$        | $$    $$\n' +
        ' |  $$$$$$/       /$$$$$$      |  $$$$$$/\n' +
        '  \\______/       |______/       \\______/ \n');
    console.log('程序原创：黄浩泓、刘梦云、马世龙\n程序重构：许文彬');
    console.log();
    console.log('=============================================================');
    console.log();
    console.log('Sever is running on port ' + port + '......');
    console.log('服务端正在运行 端口' + port +'......');
    console.log();
    console.log('Do not close the black window during the live broadcast');
    console.log('直播期间请勿关闭黑窗口');
});

