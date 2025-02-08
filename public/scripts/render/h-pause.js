//获取页面动态元素
const pauseTitleElement = document.querySelector('#pauseTitle');
const pauseHtmlElement = document.querySelector('#pauseHtml');


//使用AJAX(axios框架)向后端获取数据
axios({
    method: 'get',
    url: '/render/pauseData',
})
    .then(response => {
        const headerText = response.data.headerText;
        const describeText = response.data.describeText;
        //主副标题渲染
        pauseTitleElement.innerHTML = headerText;
        pauseHtmlElement.innerHTML = describeText;
    });
