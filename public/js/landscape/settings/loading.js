const main = document.querySelector('input[name="mainHeadingInput"]');
const sub = document.querySelector('input[name="subHeadingInput"]');
const time = document.querySelector('input[name="timeInput"]');
const poster = document.querySelector('input[name="posterInput"]');


const loadingIframe = document.querySelector('.iframe[data-id="1"]');

let isSubmitting = false;

function req() {
    if (isSubmitting) return;
    isSubmitting = true;

    if (main.value === '') {
        alert('主标题不能为空');
        return;
    }
    if (time.value === '') {
        alert('日期不能为空');
        return;
    }
    const dataStr = time.value;
    let timestamp = new Date(dataStr).getTime();


    let message1;
    axios({
        method: 'post',
        url: '/loadingData',
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
            url: '/upload',
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

const submit = document.querySelector('#loading-submit');
submit.addEventListener('click', function () {
    req();
});

window.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        let settingSelected = document.querySelector('.setting.selected');
        if (settingSelected.dataset.id === '1') {
            req();
        }
    }
});