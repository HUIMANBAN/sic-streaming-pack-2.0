//logo旋转
const sic_logo = document.querySelector("#sic-logo");
const login_wrapper = document.querySelector(".login-wrapper");
let currentRotation = 0;
login_wrapper.addEventListener("mouseenter", function () {
    currentRotation += 360;  // 每次鼠标进入时增加 360 度
    sic_logo.style.transform = `rotate(${currentRotation}deg)`;
});


//登录按钮提交数据
const theName = document.querySelector("#username");
const thePass = document.querySelector("#password");
const btn = document.querySelector(".btn");

function postLoginData() {
    if (theName.value === "" || thePass.value === "") {
        alert("用户名或密码不能为空！");
        return;
    }
    axios({
        method: "POST",
        url: "/loginData",
        data: {
            username: theName.value,
            password: thePass.value
        }
    }).then(res => {
        if (res.status === 200){
            window.open("mode", "_blank");
        }
    }).catch(err => {
        if (err) {
            alert("用户名或密码不正确！\n实在忘记了请重置用户");
        }
    });

}

btn.addEventListener("click", () => {
    postLoginData();
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        postLoginData();
    }
});


//重置按钮获取重置页面
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    // 页面重定向到重置用户
    window.location.href = "/reset";
});