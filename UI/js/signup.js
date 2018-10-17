/* global document, window */
import Consumer from 'consumer';
import Decodejwt from 'decodejwt';

const consumerObj = new Consumer('http://127.0.0.1:3012/api/v1/auth/signup');
const tokenData = new Decodejwt(localStorage.getItem('token'));

const signupform = {
  signupform: [],
  validate() {
    const email = document.getElementsByName('email')[0].value;
    const name = document.getElementsByName('name')[0].value;
    const phoneNo = document.getElementsByName('pnumber')[0].value;
    const password = document.getElementsByName('pass')[0].value;
    const cpassword = document.getElementsByName('cpass')[0].value;

    // console.log(email, name, phoneNo, password);
    const validEmail = (email !== '') ? this.checkEmail(email) : false;
    const validName = (name !== '') ? this.checkName(name) : false;
    const validPhoneNo = (phoneNo !== '') ? this.checkPhoneNo(phoneNo) : false;
    const validPassword = (password !== '' && cpassword !== '') ? this.checkPassword(password, cpassword) : false;

    // console.log(validEmail, validName, validPhoneNo, validPassword);
    if (!validPassword) {
      this.notif('warning', 'Password Mismatch');
    }
    if (!validPhoneNo) {
      this.notif('warning', 'Phone Number Length should be 13. In the format : 2347123456789');
    }
    if (!validName) {
      this.notif('warning', 'Please Enter a Name');
    }
    if (!validEmail) {
      this.notif('warning', 'Please enter a valid email');
    }
    const valid = !!((validName && validPassword && validEmail && validPhoneNo));
    return valid;
  },
  checkEmail(value) {
    let param = value;
    const [, value2] = param.split('@');
    param = value2.includes('.') ? (value2).split('.')[1] : false;
    param = (param === false) ? false : param;
    const valid = !((typeof param === 'boolean' || param.length < 1));
    return valid;
  },
  checkName(value) {
    const valid = (value.length > 0);
    return valid;
  },
  checkPhoneNo(value) {
    const validlength = value.length === 13;
    const valid = !!(validlength);
    return valid;
  },
  checkPassword(pass, cpass) {
    const valid = (pass === cpass);
    return valid;
  },
  async submit() {
    const form = document.getElementById('signupForm');
    const formData = new FormData(form);
    const signupData = {
      email: formData.get('email'),
      fullName: formData.get('name'),
      phoneNo: formData.get('pnumber'),
      password: formData.get('pass'),
    }

    console.log('signupData : ', signupData);
    const res = await consumerObj.addItem(signupData)
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
  isLoggedIn() {
    const currentTime = (new Date()).getTime() / 1000;

    if(tokenData.getToken() !== null && tokenData.getExpTime() > currentTime) {
      return true;
    }else{
      return false;
    }
  },
  notif(clas, message) {
    document.getElementById('notif').setAttribute('class', clas);
    document.getElementById('notif').innerHTML = '';
    document.getElementById('notif').innerHTML += message;
  },
};


const signUphandlers = {
  handlers: [],
  async validate() {
    if (signupform.validate()) {
      const token = await signupform.submit();
      localStorage.setItem('token', token);

      signupform.notif('success', 'Registration Successful');
      window.location.href = 'index.html';
    }
  },
  userStatus(){
    if(signupform.isLoggedIn()){
      window.location.href = 'index.html';
      console.log('user token is active');
    }else{
      console.log('user token has expired or user is not logged in');
    }
  },
};

// signUphandlers.userStatus();

const signupBtn = document.getElementById('signup');


signupBtn.addEventListener('click', () => {
  signUphandlers.validate();
});
