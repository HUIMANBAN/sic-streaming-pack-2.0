const mainHeaderElement = document.querySelector('#top p');//主标题
const subHeaderElement = document.querySelector('#host');//副标题
const hourElement = document.querySelector('#hour');//时
const minElement = document.querySelector('#min');//分
const secElement = document.querySelector('#sec');//秒

//倒计时函数
function startCountdown(timestamp) {
    // 格式化数字为两位数
    const formatNumber = num => num < 10 ? '0' + num : String(num);

    // 更新倒计时显示
    function updateDisplay(hours, minutes, seconds) {
        hourElement.innerHTML = formatNumber(hours);
        minElement.innerHTML = formatNumber(minutes);
        secElement.innerHTML = formatNumber(seconds);
    }

    let timeDifference = timestamp - Date.now();
    if (timeDifference > 0) {
        // 初始化倒计时
        timeDifference = Math.floor(timeDifference / 1000); // 转换为秒
        let hours = Math.floor(timeDifference / 3600);
        let minutes = Math.floor((timeDifference % 3600) / 60);
        let seconds = timeDifference % 60;
        updateDisplay(hours, minutes, seconds);
        // 开始倒计时
        const interval = setInterval(function () {
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(interval);
                        updateDisplay(0, 0, 0);
                        return;
                    }
                    hours--;
                    minutes = 59;
                } else {
                    minutes--;
                }
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay(hours, minutes, seconds);
        }, 1000);
    } else {
        updateDisplay(0, 0, 0);
    }
}

axios({
    method: 'get',
    url: '/render/loadingData',
})
    .then(response => {
        //主副标题渲染
        mainHeaderElement.innerHTML = response.data.mainHeader;
        subHeaderElement.innerHTML = response.data.subHeader;
        //开始倒计时
        startCountdown(response.data.timestamp);
    });