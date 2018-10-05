import UserController from '../controllers/userController';
import User from '../models/users';

const express = require('express');

const router = express.Router();

let response;

const users = new UserController(response);

// GET request for returning user based on email
router.post('/login', async (req, res) => {
  // console.log("login : ", req.body);
  const resObj = await users.loginUser(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// POST request for posting data
router.post('/signup', async (req, res) => {
  // console.log("Without : ", users.createUser(req, res));
  const resObj = await users.createUser(req, res);
  res.status(resObj.code).json(resObj);
});
export default router;
