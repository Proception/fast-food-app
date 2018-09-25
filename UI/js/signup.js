

var signupform = {
	signupform:[],
	validate: function(){
		const email = document.getElementsByName("email")[0].value;
		const name = document.getElementsByName("name")[0].value;
		const phoneNo = document.getElementsByName("pnumber")[0].value;
		const password = document.getElementsByName("pass")[0].value;
		const cpassword = document.getElementsByName("cpass")[0].value;

		console.log(email,name,phoneNo,password)
		const validEmail = (email !== "") ? this.checkEmail(email) : false;
		const validName = (name !== "") ? this.checkName(name) : false;
		const validPhoneNo = (phoneNo !== "") ? this.checkPhoneNo(phoneNo) : false;
		const validPassword = (password !== "" && cpassword !== "") ? this.checkPassword(password, cpassword) : false;

		console.log(validEmail,validName,validPhoneNo,validPassword);
		const valid = (validName && validPassword && validEmail && validPhoneNo) ? true : false;
		return valid;
	},
	checkEmail: function (value) {
		value = value.split('@')[1];
		value = value.includes('.') ? (value).split('.')[1] : false;
		value = (value === false) ? false : value;
		const valid = (typeof value === "boolean" || value.length < 1 ) ? false : true; 
		return valid;
	},
	checkName: function(value) {
		const valid = (value.length > 0) ? true : false;
		return valid;
	},
	checkPhoneNo: function (value) {
		const validlength = value.length === 12 ? true : false;
		const valid = (validlength) ? true : false;
		if(!(validlength)){
			alert('Phone Number Length should be 13. In the format : 2347123456789');
		}
		return valid;
	},
	checkPassword: function(pass, cpass) {
		const valid = (pass === cpass) ? true : false;
		if (!(valid)){
			alert('Password Mismatch');
		}

		return valid;
	}
}


var handlers = {
	handlers : [],
	validate : function () {
		if(signupform.validate()){
			alert('Registration Successful');
			window.location.href = "login.html";
		}
	}
}


const submitform = {
	submitform:[],
	host: "",
	port: "",
	endPoint: "",
}