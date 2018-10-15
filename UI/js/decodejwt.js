export default class Decodejwt {
  constructor(token) {
    this.token = token;
    this.tokenData = (token) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    }

  }

  getRole() {
    return this.token !== null ? this.tokenData(this.token).role_id : null;
  }

  getName() {
    return this.token !== null ? this.tokenData(this.token).full_name : null;
  }
  getId() {
    return this.token !== null ? this.tokenData(this.token).id : null;
  }
  getExpTime() {
    console.log(this.token);
    return this.token !== null ? this.tokenData(this.token).exp : null;
  }

  getToken(){
    return this.token;
  }

}
