export default class Users {
  constructor(email, fullName, phoneNo, password, dateCreated, roleId) {
    this.email = email;
    this.fullName = fullName;
    this.phoneNo = phoneNo;
    this.password = password;
    this.dateCreated = dateCreated;
    this.roleId = roleId;
  }
}
