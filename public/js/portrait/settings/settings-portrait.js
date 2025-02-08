let id;

const hrefInput = document.querySelector('#hrefInput');

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

function changePage() {
    document.querySelector('.setting.selected').classList.remove('selected');
    document.querySelector(`.setting[data-id="${id}"]`).classList.add('selected');
    document.querySelector('.iframe.selected').classList.remove('selected');
    switch (id) {
        case '1':
            document.querySelector('.iframe[data-id="1"]').classList.add('selected');
            hrefInput.value = 'http://' + window.location.host + '/loading_portrait';
            break;
        case '2':
            document.querySelector('.iframe[data-id="2"]').classList.add('selected');
            hrefInput.value = 'http://' + window.location.host + '/pause_portrait';

            break;
        case '3':
            document.querySelector('.iframe[data-id="3-1"]').classList.add('selected');
            hrefInput.value = 'http://' + window.location.host + '/endNoCam_portrait';
            break;
        case '4':
            document.querySelector('.iframe[data-id="4"]').classList.add('selected');
            hrefInput.value = 'http://' + window.location.host + '/watermark_portrait';
            break;

    }
}

//tab栏切换
//点击切换
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



