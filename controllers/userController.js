import User from '../models/users';
import { jsonIsEmpty as validate } from '../utils/validate';

const user = new User('omasan.esimaje@gmail.com', 'Omasan Esimaje', '2347062257273', 'qwerty');
const user1 = new User('benedict.esimaje@gmail.com', 'Benedict Esimaje', '2347062257274', 'asdfg');
const user2 = new User('kene.esimaje@gmail.com', 'Kene Esimaje', '2347062257275', 'zxcvb');

const mapUserList = new Map([[user.email, user], [user1.email, user1],
  [user2.email, user2]]);

// Display list of all Orders.
function getUserList(req, res) {
  res.status(200).send(mapUserList);
}

// Create New User.
function createUser(req, res) {
  // Get POST params
  const {
    email, phoneNo, fullName, password,
  } = req.body;

  const newUser = new User(email, fullName,
    phoneNo, password);

  const userFound = mapUserList.get(email);
  const status = (userFound === undefined) ? 204 : 201;

  // Populate List in Memory if object is not empty
  if (!(validate(newUser)) && status === 201) {
    mapUserList.set(newUser.email, newUser);
  }
  res.status(status).end();
}

// Get single User by email
function getUser(req, res) {
  const { email } = req.params;
  // console.log('parameter : ', email);
  const userFound = mapUserList.get(email);
  // console.log('Found : ', userFound);
  const status = (userFound === undefined) ? 204 : 200;
  res.status(status).send(userFound);
}

// Update User by email
function updateUser(req, res) {
  const { email } = req.params;
  // Get params in body
  const { phoneNo } = req.body;
  const { fullName } = req.body;
  const { password } = req.body;

  const updatedData = new User(email, fullName,
    phoneNo, password);

  let userFound = mapUserList.get(email);
  const status = (userFound === undefined) ? 204 : 201;

  // Set user
  if (status === 201) {
    userFound = updatedData;
    // userFound.phoneNo = (phoneNo === undefined) ? userFound.phoneNo : phoneNo;
    // userFound.fullName = (fullName === undefined) ? userFound.fullName : fullName;
    // userFound.password = (password === undefined) ? userFound.password : password;
    mapUserList.set(userFound.email, userFound);
  }
  res.status(status).end();
}

// delete User by email
function deleteUser(req, res) {
  const { email } = req.params;
  //get email
  const status = (mapUserList.delete(email)) ? 201 : 204;
  res.status(status).end();
}
// exports a function declared earlier
export {
  getUserList, createUser, getUser, updateUser, deleteUser,
};
