import bcrypt from 'bcrypt';
import User from '../models/users';
import Response from '../models/response';
import { jsonIsEmpty as validate } from '../utils/validate';
import db from '../db/index';
import orderquery from '../db/orders';
import userquery from '../db/users';

const roleId = 2;

// const bcrypt = require('bcrypt');

export default class UserController {
  constructor(response, mapUserList) {
    this.response = response;
    this.mapUserList = mapUserList;
  }

  // Display list of all Orders.
  getUserList() {
    const status = 200;
    this.response = new Response('ok', status, '', this.mapUserList);
    // res.status(status).send(response).end();
    return this.response;
  }

  // Create New User.
  async createUser(req) {
    // Get POST params
    const {
      email, phoneNo, fullName, password,
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User(email, fullName,
      phoneNo, hashedPassword, new Date(), roleId);

    const userFound = await db.query(userquery.queryUser(email));
    const status = (userFound.rowCount === 1) ? 409 : 201;

    // Populate List in Memory if object is not empty
    if (!(validate(newUser)) && status === 201) {
      const success = await db.query(
        userquery.createUser(
          newUser.email, newUser.fullName,
          newUser.phoneNo, newUser.password,
          newUser.dateCreated, newUser.roleId,
        ),
      );
      if (success.rowCount === 1) {
        delete newUser.password;
        this.response = new Response('ok', status, 'New user Created', newUser);
      }
    } else {
      delete newUser.password;
      this.response = new Response('ok', status, 'User Already Exists, Consider Logging In', newUser);
    }
    return this.response;
  }

  // Get single User by email
  getUser(req) {
    const { email } = req.params;
    // console.log('parameter : ', email);
    const userFound = this.mapUserList.get(email);
    // console.log('Found : ', userFound);
    const status = (userFound === undefined) ? 400 : 200;

    if (status === 400) {
      this.response = new Response('ok', status, 'User Doesnt Exist', '');
    } else {
      this.response = new Response('ok', status, '', userFound);
    }
    // res.status(status).send(response).end();
    return this.response;
  }

  // Get single User Order by email
  async getUserOrders(req) {
    const { email } = req.params;
    // console.log('parameter : ', email);
    const orders = await db.query(orderquery.userOrder(email));
    // console.log('Found : ', orders);
    const status = (orders.rowCount === 0) ? 400 : 200;

    if (status === 400) {
      this.response = new Response('ok', status, 'There are no previous orders for user', '');
    } else {
      this.response = new Response('ok', status, '', orders.rows);
    }
    return this.response;
  }

  // Update User by email
  updateUser(req) {
    const { email } = req.params;
    // Get params in body
    const { phoneNo } = req.body;
    const { fullName } = req.body;
    const { password } = req.body;

    const updatedData = new User(email, fullName,
      phoneNo, password);
    // console.log(email)
    const userFound = this.mapUserList.get(email);
    const status = (userFound === undefined) ? 400 : 200;
    // console.log(status)
    // Set user
    if (status === 200) {
      // userFound = updatedData;
      // userFound.phoneNo = (phoneNo === undefined) ? userFound.phoneNo : phoneNo;
      // userFound.fullName = (fullName === undefined) ? userFound.fullName : fullName;
      // userFound.password = (password === undefined) ? userFound.password : password;
      this.mapUserList.set(updatedData.email, updatedData);

      this.response = new Response('ok', status, 'User Updated', updatedData);
    } else {
      this.response = new Response('ok', status, 'User Update failed', updatedData);
    }
    return this.response;
  }

  // delete User by email
  deleteUser(req) {
    const { email } = req.params;
    // get email
    const status = (this.mapUserList.delete(email)) ? 202 : 400;
    // res.status(status).end();
    return status;
  }
}
// exports a function declared earlier
// export {
//   getUserList, createUser, getUser, updateUser, deleteUser,
// };
