/* global document, window */

const signupform = {
  signupform: [],
  validate() {
    const email = document.getElementsByName('email')[0].value;
    const name = document.getElementsByName('name')[0].value;
    const phoneNo = document.getElementsByName('pnumber')[0].value;
    const password = document.getElementsByName('pass')[0].value;
    const cpassword = document.getElementsByName('cpass')[0].value;

    console.log(email, name, phoneNo, password);
    const validEmail = (email !== '') ? this.checkEmail(email) : false;
    const validName = (name !== '') ? this.checkName(name) : false;
    const validPhoneNo = (phoneNo !== '') ? this.checkPhoneNo(phoneNo) : false;
    const validPassword = (password !== '' && cpassword !== '') ? this.checkPassword(password, cpassword) : false;

    console.log(validEmail, validName, validPhoneNo, validPassword);
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
    const validlength = value.length === 12;
    const valid = !!(validlength);
    if (!(validlength)) {
      alert('Phone Number Length should be 13. In the format : 2347123456789');
    }
    return valid;
  },
  checkPassword(pass, cpass) {
    const valid = (pass === cpass);
    if (!(valid)) {
      alert('Password Mismatch');
    }

    return valid;
  },
};


const handlers = {
  handlers: [],
  validate() {
    if (signupform.validate()) {
      alert('Registration Successful');
      window.location.href = 'login.html';
    }
  },
};


const submitform = {
  submitform: [],
  host: '',
  port: '',
  endPoint: '',
};
