const choices = document.querySelectorAll('.choice');

const endInput = document.querySelector('#hrefInput');

choices.forEach((c) => {
    c.addEventListener('click', function () {
        document.querySelector('.choice.selected').classList.remove('selected');
        this.classList.add('selected');
        document.querySelector('.iframe.selected').classList.remove('selected');
        if (this.id === 'yes') {
            document.querySelector('.iframe[data-id="3-2"]').classList.add('selected');
            endInput.value = 'http://' + window.location.host + '/end';


        } else {
            document.querySelector('.iframe[data-id="3-1"]').classList.add('selected');
            endInput.value = 'http://' + window.location.host + '/endNoCam';
        }
    });
});