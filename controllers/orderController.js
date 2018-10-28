import uuid from 'uuid/v4';
import Response from '../models/response';
import verifyjwt from '../utils/verifyJwt';
import checkrole from '../utils/checkrole';
import { jsonIsEmpty as validate } from '../utils/validate';
import orderdb from '../db/index';
import orderquery from '../db/orders';
import ordermenusquery from '../db/order_menu';

export default class OrderController {
  // Display list of all Orders.
  constructor(response) {
    this.response = response;
  }

  async getOrderList(req) {
    let token = verifyjwt(req.headers['x-access-token'], 'admin');
    token =  checkrole(token);

    if (token === 3) {
      const status = 200;
      await orderdb.query(orderquery.queryAllOrders())
        .then(data => this.response = new Response('Ok', status, '', data.rows));
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }

  // Create New Order.
  async createOrder(req) {
    const token = verifyjwt(req.headers['x-access-token'], '');
    if (token === 3) {
      // Get POST params
      const json = req.body;
      let status;
      const orderId = uuid();


      // Populate List in Memory if object is not empty
      if (!(validate(json))) {
        status = 201;
        // const response =
        await orderdb.query(
          orderquery.createOrder(
            orderId, new Date(), json.orderAmount, 'New', json.shippingAddress, json.userId,
          ),
        );
        // menu persistence
        if (json.menu !== undefined){
          const menu = typeof json.menu[0] === "object" ? json.menu : JSON.parse(json.menu);
          (menu).forEach(async (item) => {
            // console.log('item ', item);
          await orderdb.query(
            ordermenusquery.addOrderMenu(
              uuid(), orderId, item.quantity, item.menuId
              )
            );
          });
        }
        json.orderId = orderId;
        this.response = new Response('Ok', status, '', json);
        // console.log(response, status);
      } else {
        status = 400;
        this.response = new Response('Not OK', status, 'Unable To Create Order', json);
        // console.log(response, status);
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }

  // Get single Order by Id
  async getOrder(req) {
    let token = verifyjwt(req.headers['x-access-token'], 'admin');
    token =  checkrole(token);

    if (token === 3) {
      const { id } = req.params;
      const orderFound = await orderdb.query(orderquery.queryOrder(id));
      const orderMenu = await orderdb.query(ordermenusquery.queryOrderMenu(id));
      // console.log('Found : ', orderFound.rows);
      const status = (orderFound.rows.length === 0) ? 400 : 200;
      if (status === 200) {
        orderFound.rows[0].menu = orderMenu.rows;
        this.response = new Response('Ok', status, '', orderFound.rows);
        // console.log(response, status);
      } else {
        this.response = new Response('Ok', status, 'Order does not Exist', '');
        // console.log(response, status);
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }

  // Update Order by Id
  async updateOrder(req) {
    let token = verifyjwt(req.headers['x-access-token'], 'admin');
    token =  checkrole(token);

    if (token === 3) {
      const { id } = req.params;
      // Get params in body
      const { orderStatus } = req.body;
      console.log(' orderStatus ', orderStatus);

      const orderFound = await orderdb.query(orderquery.queryOrder(id));

      const status = (orderFound.rowCount === 0) ? 400 : await orderdb.query(
        orderquery.updateOrder(id, orderStatus),
      );

      // console.log("orderFound :", orderFound);
      // Set status
      if (status.rowCount === 1) {
        // console.log('rowCount', status.rowCount);

        orderFound.orderStatus = orderStatus;
        this.response = new Response('Ok', 201, '', orderFound.rows[0]);
        // console.log(response, status);
      } else {
        this.response = new Response('Not Ok', status, 'Order Does not exist', '');
        // console.log(response, status);
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }

  // delete Order by Id
  async deleteOrder(req) {
    let token = verifyjwt(req.headers['x-access-token'], 'admin');
    token =  checkrole(token);

    if (token === 3) {
      const { id } = req.params;
      const { rowCount } = await orderdb.query(orderquery.deleteOrder(id));

      // console.log('rowCount ', rowCount);
      const status = rowCount === 1 ? 201 : 400;
      if (status === 201) {
        this.response = new Response('Ok', status, 'Order has been successfully deleted', id);
      } else {
        this.response = new Response('Not Ok', status, 'Order Does not exist', '');
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }
}
