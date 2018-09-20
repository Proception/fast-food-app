// Require controller modules.
import * as userController from '../controllers/userController';

const express = require('express');

const router = express.Router();
// console.log('order router');


// GET request for returning all Users
router.get('/', userController.getUserList);

// GET request for returning user based on email
router.get('/:email', userController.getUser);

// POST request for posting data
router.post('/', userController.createUser);

// PUT request for updating a single user
router.put('/:email', userController.updateUser);

// DELETE request to Delete user by email
router.delete('/:email', userController.deleteUser);

export default router;
