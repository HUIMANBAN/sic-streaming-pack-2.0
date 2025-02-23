const Main = document.querySelector("input[name='main-title']");
const Sub = document.querySelector("input[name='sub-title']");
const Time = document.querySelector("input[name='time-input']");

const Header = document.querySelector("input[name='header']");
const Describe = document.querySelector("input[name='describe']");

const Cameras = document.querySelectorAll(".camera");

//设置页面切换
let id = "1";
const Url = document.querySelector("#url");
const Iframe = document.querySelector(".iframe");

let endPoint = Mode === 0 ? `L-loading` : `P-loading`;
Iframe.src = Url.value = `http://${window.location.host}/render/${endPoint}`;

function changePage() {
    document.querySelector(".setting.selected").classList.remove("selected");
    document.querySelector(`.setting[data-index="${id}"]`).classList.add("selected");

    const modePrefix = Mode === 0 ? "L-" : "P-";
    const pageMapping = {
        "1": "loading",
        "2": "pause",
        "3": "endNoCam",
        "4": "watermark"
    };
    const page = pageMapping[id];
    endPoint = `${modePrefix}${page}`;
    Iframe.src = Url.value = `http://${window.location.host}/render/${endPoint}`;
}

const Tabs = document.querySelectorAll(".tab");
Tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
        document.querySelector(".tab.selected").classList.remove("selected");
        this.classList.add("selected");
        id = this.dataset.index;
        changePage();
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
        const selected = document.querySelector(".selected");
        const tabIndexNum = (Number(selected.dataset.index) % 4) + 1;
        selected.classList.remove("selected");
        document.querySelector(`.tab[data-index="${tabIndexNum}"]`).classList.add("selected");
        id = String(tabIndexNum);
        changePage();
    }
});

//iframe功能按钮
const Open = document.querySelector("#open");
Open.addEventListener("click", function () {
    window.open(Url.value);
});

const Refresh = document.querySelector("#refresh");
Refresh.addEventListener("click", function () {
    Iframe.contentWindow.location.reload();
});

const Copy = document.querySelector("#copy");
Copy.addEventListener("click", function () {
    const textToCopy = Url.value;
    navigator.clipboard.writeText(textToCopy).then(() => {
        Copy.innerHTML = "复制成功";
        Copy.style.color = "var(--theme-blue)";
        setTimeout(() => {
            Copy.innerHTML = "复制";
            Copy.style.color = "black";
        }, 1500);
    });
});

