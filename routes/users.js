// Require controller modules.
import UserController from '../controllers/userController';

const express = require('express');

const router = express.Router();

let response;

const users = new UserController(response);


// GET request for returning all Users
router.get('/', async (req, res) => {
  // console.log("Without : ", users.getUserList(req, res));
  const resObj = await users.getUserList(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// GET request for returning user based on email
router.get('/:email', async (req, res) => {
  // console.log("Without : ", users.getUser(req, res));
  const resObj = await users.getUser(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// GET request for returning user based on email
router.get('/:email/orders', async (req, res) => {
  // console.log("Without : ", users.getUserOrders(req, res));
  const resObj = await users.getUserOrders(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// // POST request for posting data
// router.post('/', (req, res) => {
//   // console.log("Without : ", users.createUser(req, res));
//   const resObj = users.createUser(req, res);
//   // console.log(resObj);
//   res.status(resObj.code).json(resObj);
// });

// PUT request for updating a single user
router.put('/:email', async (req, res) => {
  // console.log("Without : ", users.updateUser(req, res));
  const resObj = await users.updateUser(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// DELETE request to Delete user by email
router.delete('/:email', async (req, res) => {
  // console.log("Without : ", users.deleteUser(req, res));
  const resObj = await users.deleteUser(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

export default router;
