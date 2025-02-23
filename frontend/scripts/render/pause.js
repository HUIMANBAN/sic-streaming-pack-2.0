const pauseTitleElement = document.querySelector('#pauseTitle');
const pauseHtmlElement = document.querySelector('#pauseHtml');

axios({
    method: 'get',
    url: '/render/pauseData',
})
    .then(response => {
        //主副标题渲染
        pauseTitleElement.innerHTML = response.data.headerText;
        pauseHtmlElement.innerHTML = response.data.describeText;
    });
