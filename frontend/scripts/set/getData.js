// 使用AJAX(axios框架)向后端获取数据
axios({
    method: "get",
    url: "/render/loadingData"
})
    .then(response => {
        Main.value = response.data.mainHeader;
        Sub.value = response.data.subHeader;
        Time.value = response.data.startTime;
    });

axios({
    method: "get",
    url: "/render/pauseData"
})
    .then(response => {
        Header.value = response.data.headerText;
        Describe.value = response.data.describeText;
    });


const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
    if (input.name !== "time-input") {
        input.addEventListener("mouseenter", function () {
            this.focus();
        });
        input.addEventListener("mouseleave", function () {
            this.blur();
        });
    }
});

