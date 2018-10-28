/* global document, window */
import Decodejwt from 'decodejwt';
// localStorage.clear();
const tokenData = new Decodejwt(localStorage.getItem('token'));
// console.log('aa')
// console.log('Role Id : ', tokenData.getRole(), tokenData.getExpTime());
// console.log('bb', tokenData)
const handlers = {
    handlers: [],
    logout(){
        localStorage.clear();
        window.location.href = "login.html";
    },
    hideAdminMenus(){
    	const adminMenus = document.getElementsByClassName("admin");
    	[].forEach.call( adminMenus, menu => {
    		menu.style.display = "none";
    	});
    },
    showAdminMenus(){
    	const adminMenus = document.getElementsByClassName("admin");
    	[].forEach.call( adminMenus, menu => {
    		menu.style.display = "block";
    	});
    },
    hideLoginMenus(){
    	const loginMenus = document.getElementsByClassName("on-login");
    	[].forEach.call( loginMenus, menu => {
    		menu.style.display = "none";
    	});
    },
    showLoginMenus(){
    	const loginMenus = document.getElementsByClassName("on-login");
    	[].forEach.call( loginMenus, menu => {
    		menu.style.display = "block";
    	});
    },
    hideLogoutMenus(){
    	const loginMenus = document.getElementsByClassName("on-logout");
    	[].forEach.call( loginMenus, menu => {
    		menu.style.display = "none";
    	});
    },
    showLogoutMenus(){
    	const loginMenus = document.getElementsByClassName("on-logout");
    	[].forEach.call( loginMenus, menu => {
    		menu.style.display = "block";
    	});
    },
    displayCurrentUserName(user){
        document.getElementsByClassName("user")[0].childNodes[0].childNodes[0].textContent = 'Welcome, ' + user;
    },
}

const logoutBtn = document.getElementById('logout');

if(logoutBtn !== null){
    logoutBtn.addEventListener('click', () => {
        console.log('clicked');
        handlers.logout();
    });
}


const currentTime = (new Date()).getTime() / 1000;

// console.log('Token Expiry time ',tokenData.getExpTime());
// console.log('Current TIme ',currentTime);
// console.log('user ',tokenData.getId());

if(tokenData.token !== "undefined" && tokenData.getToken() !== null && tokenData.getExpTime() > currentTime) {
	handlers.hideLogoutMenus();
	if(tokenData.getRole() === 200){
		handlers.showAdminMenus();
	}else{
		handlers.hideAdminMenus();
	}
    console.log('Logged in user : ', tokenData.getName())
    handlers.displayCurrentUserName(tokenData.getName());

}else{
	handlers.hideLoginMenus();
	handlers.hideAdminMenus();
	handlers.showLogoutMenus();
}