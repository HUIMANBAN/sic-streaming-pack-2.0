// 模式选择
let index = "0";
let name = "横屏模式";

let modes = document.querySelectorAll(".mode");
modes.forEach((mode) => {
    mode.addEventListener("click", function () {
        document.querySelector(".selected").classList.remove("selected");
        this.classList.add("selected");
        index = this.dataset.index;
        name = this.innerHTML;
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
        modes.forEach((mode) => {
            mode.classList.toggle("selected");
        });
    }
    const selected = document.querySelector(".selected");
    index = selected.dataset.index;
    name = selected.innerHTML;

});

function req() {
    axios({
        method: "POST",
        url: "/choice",
        data: {
            mode: index,
            name: name
        }
    }).then(res => {
        if (res.data === 0) {
            window.open("/set/horizontal");
        } else if (res.data === 1) {
            window.open("/set/vertical");
        }
    });
}

//点击发送
const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
    req();

});

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        req();
    }
});