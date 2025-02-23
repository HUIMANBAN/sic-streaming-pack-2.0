//结束页面设置
Cameras.forEach((c) => {
    c.addEventListener('click', function () {
        document.querySelector('.camera.selected').classList.remove('selected');
        this.classList.add('selected');

        let endPoint;
        if (this.id === 'no') {
            endPoint = Mode === 0 ? '/render/L-endNoCam' : '/render/P-endNoCam';
        } else {
            endPoint = '/render/L-end';
        }

        Iframe.src = Url.value = `http://${window.location.host}${endPoint}`;
    });
});
