const pauseSubmit = document.querySelector('#pause-submit');
const pauseIframe = document.querySelector('iframe[data-id="2"]');

let isPauseSubmitting = false;

function PauseReq() {
    if (isPauseSubmitting) return;
    isPauseSubmitting = true;
    let headerInput = document.querySelector('#headerInput input');
    let describeInput = document.querySelector('#describeInput input');
    axios({
        method: 'post',
        url: 'pauseData',
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
        let settingSelected2 = document.querySelector('.setting.selected');
        if (settingSelected2.dataset.id === '2') {
            PauseReq();
        }
    }
});