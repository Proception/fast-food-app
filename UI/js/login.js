/* global document, window */
import Consumer from 'consumer';
import Decodejwt from 'decodejwt';

const consumerObj = new Consumer('http://127.0.0.1:3012/api/v1/auth/login');
const tokenData = new Decodejwt(localStorage.getItem('token'));


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
  async submit() {
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const loginData = {
      email: formData.get('email'),
      password: formData.get('pass'),
    }

    // console.log('loginData : ', loginData);
    const res = await consumerObj.addItem(loginData)
    .then(response => response.json())
    .then(response => {
      console.log('Success:', JSON.stringify(response));
      return response;
    }).catch(error => {
      // return error;
      this.notif('warning', 'There was a problem, please try again');
    });

    console.log('res : ', res);
    if (res !== undefined && res.data !== ''){
      return res.data;
    }

  },
  notif(clas, message) {
    document.getElementById('notif').setAttribute('class', clas);
    document.getElementById('notif').innerHTML = '';
    document.getElementById('notif').innerHTML += message;
  },
  isLoggedIn() {
    const currentTime = (new Date()).getTime() / 1000;

    if(tokenData.getToken() !== null && tokenData.getExpTime() > currentTime) {
      return true;
    }else{
      return false;
    }
  },
};

const loginHandler = {
  loginHandler: [],
  async validate() {
    if (loginForm.validate()) {
      const token = await loginForm.submit();
      localStorage.setItem('token', token);
      window.location.href = 'index.html';
    }
  },
  userStatus(){
    if(loginForm.isLoggedIn()){
      window.location.href = 'index.html';
      console.log('user token is active');
    }else{
      console.log('user token has expired or user is not logged in');
    }
  },
};

loginHandler.userStatus();

const loginBtn = document.getElementById('login');


loginBtn.addEventListener('click', () => {
  loginHandler.validate();
});
