// Require controller modules.
import UserController from '../controllers/userController';
import User from '../models/users';

const express = require('express');

const router = express.Router();
// console.log('order router');

const user = new User('omasan.esimaje@gmail.com', 'Omasan Esimaje', '2347062257273', 'qwerty');
const user1 = new User('benedict.esimaje@gmail.com', 'Benedict Esimaje', '2347062257274', 'asdfg');
const user2 = new User('kene.esimaje@gmail.com', 'Kene Esimaje', '2347062257275', 'zxcvb');

let response;

const mapUserList = new Map([[user.email, user], [user1.email, user1],
  [user2.email, user2]]);

const users = new UserController(response, mapUserList);


// GET request for returning all Users
router.get('/', (req, res) => {
  // console.log("Without : ", users.getUserList(req, res));
  const resObj = users.getUserList();
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// GET request for returning user based on email
router.get('/:email', (req, res) => {
  // console.log("Without : ", users.getUser(req, res));
  const resObj = users.getUser(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// POST request for posting data
router.post('/', (req, res) => {
  // console.log("Without : ", users.createUser(req, res));
  const resObj = users.createUser(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// PUT request for updating a single user
router.put('/:email', (req, res) => {
  // console.log("Without : ", users.updateUser(req, res));
  const resObj = users.updateUser(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// DELETE request to Delete user by email
router.delete('/:email', (req, res) => {
  // console.log("Without : ", users.deleteUser(req, res));
  const status = users.deleteUser(req, res);
  // console.log(resObj);
  res.status(status).json();
});

export default router;
