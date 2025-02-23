//海报提交
const DropArea = document.querySelector("#drop-area");
const FileUpload = document.querySelector("#file-upload");
const FileInfo = document.querySelector("#upload-text span");
const BodyDropArea = document.querySelector("#body-drop-area");

//定义海报文件变量
let file;

//验证文件格式
function isCorrectFile(file) {
    const fileType = file.type;
    const imageMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (imageMimes.includes(fileType)) {
        FileInfo.innerHTML = `<br>已选择: ${file.name}`;
        FileInfo.style.color = "initial";
        return true;
    } else {
        FileInfo.innerHTML = `<br>图片格式不支持，不会被上传，请重新选择`;
        FileInfo.style.color = "red";
        return false;
    }
}

//海报上传
if (id === "1") {

}
DropArea.addEventListener("mousedown", function () {
    if (id === "1") {
        FileUpload.click();
    }
});
FileUpload.addEventListener("change", function () {
    if (id === "1") {
        file = this.files[0];
        isCorrectFile(file);
    }
});

document.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (id === "1") {
        BodyDropArea.classList.add("dragover");
    }
    document.body.classList.add("no-points");
});
document.addEventListener("dragleave", (e) => {
    e.preventDefault();
    if (id === "1") {
        BodyDropArea.classList.remove("dragover");
    }
});
document.addEventListener("mouseenter", function () {
    document.body.classList.remove("no-points");
});

document.addEventListener("drop", (e) => {
    e.preventDefault();
    if (id === "1") {
        BodyDropArea.classList.remove("dragover");
        file = e.dataTransfer.files[0];
        isCorrectFile(file);
    }
    document.body.classList.remove("no-points");
});


//===================================================================================
const loading_submit = document.querySelector("#loading-submit");
//提交按钮
function changeLoadingSubmitStatus() {
    loading_submit.style.pointerEvents = "none";
    loading_submit.style.color = "grey";
    let num = 3;
    loading_submit.innerHTML = `重新提交(${num})`;
    let a = setInterval(() => {
        if (num === 1) {
            clearInterval(a);
            loading_submit.innerHTML = `提交`;
            loading_submit.style.pointerEvents = "auto";
            loading_submit.style.color = "initial";
            return;
        }
        num--;
        loading_submit.innerHTML = `重新提交(${num})`;
    }, 1000);
}

function loadingPost() {
    changeLoadingSubmitStatus();
    const dataStr = Time.value;
    let timestamp = new Date(dataStr).getTime();

    if (file && isCorrectFile(file)) {
        const formData = new FormData();
        formData.append("poster", file);
        axios({
            method: "post",
            url: "/set/upload",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    axios({
        method: "post",
        url: "/set/loadingData",
        data: {
            mainHeader: Main.value,
            subHeader: Sub.value,
            startTime: Time.value,
            timestamp: timestamp
        }
    }).then((res) => {
        if (res.status === 200) {
            Iframe.contentWindow.location.reload();
        }
    });
}

loading_submit.addEventListener("click", function () {
    loadingPost();
});
window.addEventListener("keydown", function (e) {
    if (loading_submit.style.pointerEvents !== "none"){
        if (e.key === "Enter" && id === "1") {
            e.preventDefault();
            loadingPost();
        }
    }
});







