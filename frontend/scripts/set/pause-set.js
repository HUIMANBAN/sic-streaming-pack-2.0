//暂停页面设置
const pause_submit = document.querySelector("#pause-submit");

function changePauseSubmitStatus() {
    pause_submit.style.pointerEvents = "none";
    pause_submit.style.color = "grey";
    let num = 3;
    pause_submit.innerHTML = `重新提交(${num})`;
    let a = setInterval(() => {
        if (num === 1) {
            clearInterval(a);
            pause_submit.innerHTML = `提交`;
            pause_submit.style.pointerEvents = "auto";
            pause_submit.style.color = "initial";
            return;
        }
        num--;
        pause_submit.innerHTML = `重新提交(${num})`;
    }, 1000);
}

function pausePost() {
    changePauseSubmitStatus();
    axios.post("/set/pauseData", {
        headerText: Header.value,
        describeText: Describe.value
    }).then((res) => {
        if (res.status === 200) {
            Iframe.contentWindow.location.reload();
        }
    });
}

pause_submit.addEventListener("click", ()=>{
    pausePost()
});

window.addEventListener("keydown", function (e) {
    if (pause_submit.style.pointerEvents !== "none") {
        if (e.key === "Enter" && id === "2") {
            e.preventDefault();
            pausePost();
        }
    }
});