//logo旋转
const sic_logo = document.querySelector('#sic-logo');
const reset_wrapper = document.querySelector('.reset-wrapper');
let currentRotation = 0;
reset_wrapper.addEventListener('mouseenter', function () {
    currentRotation += 360;  // 每次鼠标进入时增加 360 度
    sic_logo.style.transform = `rotate(${currentRotation}deg)`;
});

const SICBtn = document.querySelector('#SICBtn');
const inputSIC = document.querySelector('#inputSIC');
const setNewUser = document.querySelector('#setNewUser');


//失败提示
let count = 0;

function checkSICName() {
    const SICInput = document.getElementById('SICInput').value;
    if (SICInput === '校学生信息网络中心') {
        inputSIC.style.display = 'none';
        setNewUser.style.display = 'block';
    } else if (SICInput !== '校学生信息网络中心') {
        count++;
        if (count === 1) {
            alert('SIC的全称都忘记了？(•́へ•́ ╬)');
        } else if (count === 2) {
            alert('算了，劳资直接告诉你吧╮(╯▽╰)╭，照着写会吧\n校学生信息网络中心');
        } else if (count === 3) {
            alert('刚刚不是告诉你了吗？o(一︿一+)o\n校学生信息网络中心');
        } else {
            alert('你干嘛，诶哟，是不是香翅捞饭是不是');
        }
    }
}

SICBtn.addEventListener('click', function () {
    checkSICName();
});


function postResetData() {
    const theName = document.querySelector('#username').value;
    const thePass = document.querySelector('#password').value;
    if (theName === '' || thePass === '') {
        alert('用户名和密码不能为空');
    } else {
        axios({
            method: 'post',
            url: '/resetData',
            data: {
                newName: theName,
                newPass: thePass
            }
        }).then(res => {
            if (res.status === 200) {
                alert(`请记住你的用户名和密码\n用户名：${theName}\n密码：${thePass}\n然后请重新登入`);
                window.location.href = '/login';
            }
        });

    }
}

//重置按钮提交数据
const userBtn = document.querySelector('#userBtn');
userBtn.addEventListener('click', function () {
    postResetData();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        if (setNewUser.style.display === 'none') {
            checkSICName();
        } else {
            postResetData();
        }
    }
});