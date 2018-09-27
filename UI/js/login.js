/* global document, window */
const loginForm = {
  loginForm: [],
  validate() {
    const email = document.getElementsByName('email')[0].value;
    const pass = document.getElementsByName('pass')[0].value;

    // console.log(email);
    const validEmail = (email !== '') ? this.checkEmail(email) : false;
    const validPass = (pass.length > 0);
    if (!validPass) {
      this.notif('warning', 'Please enter a password');
    }
    if (!validEmail) {
      this.notif('warning', 'Invalid Email');
    }
    const valid = (validEmail && validPass);
    return valid;
  },
  checkEmail(value) {
    let param = value;
    param = param.includes('@') ? param.split('@')[1] : 1;
    param = (param.includes('.')) ? (param).split('.')[1] : false;
    param = (param === false) ? false : param;
    const valid = !((typeof param === 'boolean' || param.length < 1));
    return valid;
  },
  notif(clas, message) {
    document.getElementById('notif').setAttribute('class', clas);
    document.getElementById('notif').innerHTML = '';
    document.getElementById('notif').innerHTML += message;
  },

};

const loginHandler = {
  loginHandler: [],
  validate() {
    if (loginForm.validate()) {
      window.location.href = 'restaurantmenu.html';
    }
  },
};

const loginBtn = document.getElementById('login');


loginBtn.addEventListener('click', () => {
  loginHandler.validate();
});
