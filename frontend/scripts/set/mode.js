//模式切换
let modes = document.querySelectorAll(".mode");
let id = "landscape";

modes.forEach((mode) => {
    mode.addEventListener("click", function () {
        const selected = document.querySelector(".selected");
        selected.classList.remove("selected");
        this.classList.add("selected");
        id = this.id;
    });
});

//打开设置页面
function openSetPage() {
    window.open(id === "landscape" ? "/set/landscape" : "/set/portrait");
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
        modes.forEach((mode) => {
            mode.classList.toggle("selected");
        });
        const selected = document.querySelector(".selected");
        id = selected.id;
    } else if (event.key === "Enter") {
        openSetPage();
    }
});

//logo的title
const logo = document.querySelector("#logo");
const title = "程序作者：硬件运维部\n美术指导：设计部";
logo.title = title;

try {
    const item = localStorage.getItem("FirstUse");
    if (item === null) {
        localStorage.setItem("FirstUse", "true");
        window.onload = function () {
            alert("第一次使用可以调节浏览器右上角设置的缩放\n以达到合适的显示比例");
        };
    }
} catch (err) {

}
