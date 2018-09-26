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
      document.getElementById('notif').setAttribute('class', 'warning');
      document.getElementById('notif').innerHTML = '';
      document.getElementById('notif').innerHTML += 'Please enter a password';
    }
    if (!validEmail) {
      document.getElementById('notif').setAttribute('class', 'warning');
      document.getElementById('notif').innerHTML = '';
      document.getElementById('notif').innerHTML += 'Invalid Email';
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

};

const loginHandler = {
  loginHandler: [],
  validate() {
    if (loginForm.validate()) {
      window.location.href = 'restaurantmenu.html';
    }
  },
};