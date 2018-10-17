/* global document, window */
import Decodejwt from 'decodejwt';

const tokenData = new Decodejwt(localStorage.getItem('token'));

console.log('Role Id : ', tokenData.getRole(), tokenData.getExpTime());

const handlers = {
    handlers: [],
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
}

const currentTime = (new Date()).getTime() / 1000;

console.log('Token Expiry time ',tokenData.getExpTime());
console.log('Current TIme ',currentTime);
console.log('user ',tokenData.getId());

if(tokenData.getToken() !== null && tokenData.getExpTime() > currentTime) {
	handlers.hideLogoutMenus();
	if(tokenData.getRole() === 200){
		handlers.showAdminMenus();
	}else{
		handlers.hideAdminMenus();
	}

}else{
	handlers.hideLoginMenus();
	handlers.hideAdminMenus();
	handlers.showLogoutMenus();
}