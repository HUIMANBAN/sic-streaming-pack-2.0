//动态元素获取
const main = document.querySelector('input[name="mainHeadingInput"]');
const sub = document.querySelector('input[name="subHeadingInput"]');
const time = document.querySelector('input[name="timeInput"]');
const poster = document.querySelector('input[name="posterInput"]');
const loadingIframe = document.querySelector('.iframe[data-id="1"]');
const submit = document.querySelector('#loading-submit');
//
const headerInput = document.querySelector('#headerInput input');
const describeInput = document.querySelector('#describeInput input');
const pauseSubmit = document.querySelector('#pause-submit');
const pauseIframe = document.querySelector('iframe[data-id="2"]');
//
const hrefInput = document.querySelector('#hrefInput');
hrefInput.value = `http://${window.location.host}/render/v-loading`;

//使用AJAX(axios框架)向后端获取数据

axios({
    method: 'get',
    url: '/render/loadingData',
})
    .then(response => {
        const mainHeader = response.data.mainHeader;
        const subHeader = response.data.subHeader;
        const startTime = response.data.startTime;
        //文本框内容渲染
        main.value = mainHeader;
        sub.value = subHeader;
        time.value = startTime;
    });

axios({
    method: 'get',
    url: '/render/pauseData'
})
    .then(response => {
        const headerText = response.data.headerText;
        const describeText = response.data.describeText;
        headerInput.value = headerText;
        describeInput.value = describeText;
    });


//设置页面切换
let id;

function changePage() {
    document.querySelector('.setting.selected').classList.remove('selected');
    document.querySelector(`.setting[data-id="${id}"]`).classList.add('selected');
    document.querySelector('.iframe.selected').classList.remove('selected');
    switch (id) {
        case '1':
            document.querySelector('.iframe[data-id="1"]').classList.add('selected');
            hrefInput.value = `http://${window.location.host}/render/v-loading`;
            break;
        case '2':
            document.querySelector('.iframe[data-id="2"]').classList.add('selected');
            hrefInput.value = `http://${window.location.host}/render/v-pause`;
            break;
        case '3':
            document.querySelector('.iframe[data-id="3"]').classList.add('selected');
            hrefInput.value = `http://${window.location.host}/render/v-endNoCam`;
            break;
        case '4':
            document.querySelector('.iframe[data-id="4"]').classList.add('selected');
            hrefInput.value = `http://${window.location.host}/render/v-watermark`;
            break;

    }
}

const tabs = document.querySelectorAll('.tab-in');
tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
        document.querySelector('.tab-in.selected').classList.remove('selected');
        this.classList.add('selected');
        id = this.dataset.id;
        changePage();
    });
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        let selected = document.querySelector('.selected');
        let tabIndex = selected.dataset.id;
        let tabIndexNum = Number(tabIndex);
        tabIndexNum++;
        tabIndex = String(tabIndexNum);
        if (tabIndex === '5') {
            tabIndex = '1';
        }
        selected.classList.remove('selected');
        document.querySelector(`.tab-in[data-id="${tabIndex}"]`).classList.add('selected');
        id = tabIndex;
        changePage();
    }
});


//iframe功能按钮
const open = document.querySelector('#open');
open.addEventListener('click', function () {
    window.open(hrefInput.value);
});

const refresh = document.querySelector('#refresh');
refresh.addEventListener('click', function () {
    const iframe = document.querySelector('.iframe.selected');
    iframe.contentWindow.location.replace(iframe.src);
});

const copy = document.querySelector('#copy');
copy.addEventListener('click', function () {
    hrefInput.select();
    document.execCommand('copy');
});

//=============================================================================================
//待机页面设置
let isSubmitting = false;

function req() {
    if (isSubmitting) return;
    isSubmitting = true;
    const dataStr = time.value;
    let timestamp = new Date(dataStr).getTime();
    let message1;
    axios({
        method: 'post',
        url: '/set/loadingData',
        data: {
            mainHeader: main.value,
            subHeader: sub.value,
            startTime: time.value,
            timestamp: timestamp
        }
    }).then(response => {
        message1 = response.data;
    });

    let message2;
    const file = poster.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('posterInput', file);
        axios({
            method: 'post',
            url: '/set/upload',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData
        }).then(response => {
            message2 = response.data;
        });
    }
    // 使用 contentWindow 的 reload 方法刷新
    setTimeout(function () {
        loadingIframe.contentWindow.location.reload();
    }, 50);

    setTimeout(function () {
        isSubmitting = false;
    }, 1000);
}

submit.addEventListener('click', function () {
    req();
});

window.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (id === '1') {
            req();
        }
    }
});

//=============================================================================================
//暂停页面设置
let isPauseSubmitting = false;

function PauseReq() {
    if (isPauseSubmitting) return;
    isPauseSubmitting = true;
    axios({
        method: 'post',
        url: '/set/pauseData',
        data: {
            headerText: headerInput.value,
            describeText: describeInput.value
        }
    });
    // 使用 contentWindow 的 reload 方法刷新
    setTimeout(function () {
        pauseIframe.contentWindow.location.reload();
    }, 50);

    setTimeout(function () {
        isPauseSubmitting = false;
    }, 1000);
}

pauseSubmit.addEventListener('click', function () {
    PauseReq();
});

window.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (id === '2') {
            PauseReq();
        }
    }
});






