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

// GET request for returning user based on email
// router.post('/login', async (req, res) => {
//   // console.log("Without : ", users.getUserOrders(req, res));
//   const resObj = await users.getUserOrders(req, res);
//   // console.log(resObj);
//   res.status(resObj.code).json(resObj);
// });

// POST request for posting data
router.post('/signup', async (req, res) => {
  // console.log("Without : ", users.createUser(req, res));
  const resObj = await users.createUser(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});
export default router;
