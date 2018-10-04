import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users';
import Response from '../models/response';
import { jsonIsEmpty as validate } from '../utils/validate';
import verifyjwt from '../utils/verifyJwt';
import db from '../db/index';
import orderquery from '../db/orders';
import userquery from '../db/users';

export default class UserController {
  constructor(response) {
    this.response = response;
  }

  // Display list of all Orders.
  async getUserList(req) {
    const token = verifyjwt(req.headers['x-access-token']);

    if (token === 3) {
      // console.log("result ",result);
      const result = await db.query(userquery.queryAllUsers());
      this.response = new Response('ok', 200, '', result.rows);
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }

  async loginUser(req) {
    const {
      email, password,
    } = req.body;

    const user = await db.query(userquery.queryUser(email));

    if (user.rowCount === 1) {
      const isSame = await bcrypt.compare(password, user.rows[0].password);
      // console.log('isSame ? :', isSame);
      const userObj = user.rows[0];

      if (isSame) {
        delete userObj.password;
        delete userObj.dateCreated;
        // jwt
        const token = jwt.sign(userObj, 'test', { expiresIn: 86400 });

        this.response = new Response('ok', 200, 'User has successfully logged in', token);
      } else {
        this.response = new Response('ok', 401, 'Credentials are incorrect', email);
      }
    } else {
      this.response = new Response('ok', 400, 'User doesnt exists, consider registering', email);
    }

    return this.response;
  }

  // Create New User.
  async createUser(req) {
    // Get POST params
    const {
      email, phoneNo, fullName, password,
    } = req.body;
    const roleId = 2;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User(email, fullName,
      phoneNo, hashedPassword, new Date(), roleId);

    const userFound = await db.query(userquery.queryUser(email));
    const status = (userFound.rowCount === 1) ? 409 : 201;

    // Populate List in Memory if object is not empty
    if (!(validate(newUser)) && status === 201) {
      await db.query(
        userquery.createUser(
          newUser.email, newUser.fullName,
          newUser.phoneNo, newUser.password,
          newUser.dateCreated, newUser.roleId,
        ),
      );

      delete newUser.password;
      this.response = new Response('ok', status, 'New user Created', newUser);
    } else {
      delete newUser.password;
      this.response = new Response('ok', status, 'User Already Exists, Consider Logging In', newUser);
    }
    return this.response;
  }

  // Get single User by email
  async getUser(req) {
    const token = verifyjwt(req.headers['x-access-token']);

    if (token === 3) {
      const { email } = req.params;
      // console.log('parameter : ', email);
      const userFound = await db.query(userquery.queryUser(email));
      // console.log('Found : ', userFound);
      const status = (userFound.rowCount === 0) ? 400 : 200;

      if (status === 400) {
        this.response = new Response('ok', status, 'User Doesnt Exist', '');
      } else {
        this.response = new Response('ok', status, '', userFound.rows[0]);
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }

    // res.status(status).send(response).end();
    return this.response;
  }

  // Get single User Order by email
  async getUserOrders(req) {
    const token = verifyjwt(req.headers['x-access-token']);

    if (token === 3) {
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
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }

  // Update User by email
  async updateUser(req) {
    const token = verifyjwt(req.headers['x-access-token']);

    if (token === 3) {
      const { email } = req.params;
      // Get params in body
      const { roleId } = req.body;
      const userFound = await db.query(userquery.updateUser(email, roleId));
      const status = (userFound.rowCount === 0) ? 400 : 200;

      // console.log(status)
      if (status === 200) {
        this.response = new Response('ok', status, 'User Role Successfully updated', email);
      } else {
        this.response = new Response('ok', status, 'User Doesnt exist', email);
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }

    return this.response;
  }

  // delete User by email
  async deleteUser(req) {
    const token = verifyjwt(req.headers['x-access-token']);

    if (token === 3) {
      const { email } = req.params;

      const result = await db.query(userquery.deleteUser(email));

      const status = (result.rowCount === 0) ? 400 : 202;
      // console.log("status", status);
      if (status === 202) {
        this.response = new Response('ok', status, 'User successsfully deleted', email);
      } else {
        this.response = new Response('ok', status, 'User Doesnt exist', email);
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }
}
