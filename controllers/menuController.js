import uuid from 'uuid/v4';
import verifyjwt from '../utils/verifyJwt';
import Menu from '../models/menus';
import checkrole from '../utils/checkrole';
import Response from '../models/response';
import { jsonIsEmpty as validate } from '../utils/validate';
import db from '../db/index';
import menuquery from '../db/menus';

export default class MenuController {
  constructor(response) {
    this.response = response;
  }

  // Display list of all Menus.
  async getMenuList(req) {
    // const status = 200;
    const token = verifyjwt(req.headers['x-access-token'], '');

    if (token === 3) {
      const result = await db.query(menuquery.queryAllMenus());
      // console.log("result ",result);
      this.response = new Response('ok', 200, '', result.rows);
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }

  // Create New Menu.
  async createMenu(req) {
    let token = verifyjwt(req.headers['x-access-token'], 'admin');
    token =  checkrole(token);

    if (token === 3) {
      // Get POST params
      const json = req.body;
      let status;
      // Populate List in Memory if object is not empty
      if (!(validate(json))) {
        const newMenu = new Menu(uuid(), json.name,
          json.price, json.quantity,
          json.type, new Date(), '', json.imgUrl);
        await db.query(
          menuquery.createMenu(
            newMenu.menuId, newMenu.name,
            newMenu.price, newMenu.quantity,
            newMenu.type, newMenu.dateCreated,
            newMenu.createdBy, newMenu.imgUrl,
          ),
        );
        this.response = new Response('Ok', 201, 'Menu Creation was successful', newMenu);
      } else {
        status = 400;
        this.response = new Response('NOK', status, 'Menu Creation Failed, due to incomplete request', json);
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    // res.status(status).send(this.response).end();
    return this.response;
  }

  // Get single menu by Id
  async getMenu(req) {
    let token = verifyjwt(req.headers['x-access-token'], 'admin');
    token =  checkrole(token);

    if (token === 3) {
      const { menuid } = req.params;
      const menuFound = await db.query(menuquery.queryMenu(menuid));
      const status = (menuFound.rowCount === 1) ? 200 : 400;
      if (status === 400) {
        this.response = new Response('Ok', status, 'Menu item Not available', '');
        // console.log(response, status);
      } else {
        this.response = new Response('Ok', status, '', menuFound.rows[0]);
        // console.log(response, status);
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }

  // Update menu by Id
  async updateMenu(req) {
    let token = verifyjwt(req.headers['x-access-token'], 'admin');
    token =  checkrole(token);

    if (token === 3) {
      const { menuid } = req.params;
      // Get params in body
      const {
        price,
      } = req.body;

      const menuFound = await db.query(menuquery.updateMenu(menuid, price));
      const status = (menuFound.rowCount === 1) ? 201 : 400;
      // update if the menu object
      if (status === 201) {
        this.response = new Response('Ok', status, 'Menu successfully updated', menuid);
        // console.log(response, status);
      } else {
        this.response = new Response('Ok', status, 'Menu Updated failed', menuid);
        // console.log(response, status);
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }

  // delete menu by menuid
  async deleteMenu(req) {
    let token = verifyjwt(req.headers['x-access-token'], 'admin');
    token =  checkrole(token);

    if (token === 3) {
      const { menuid } = req.params;

      const result = await db.query(menuquery.deleteMenu(menuid));

      const status = (result.rowCount === 0) ? 400 : 202;
      // console.log("status", status);
      if (status === 202) {
        this.response = new Response('ok', status, 'Menu successsfully deleted', menuid);
      } else {
        this.response = new Response('ok', status, 'Menu Doesnt exist', menuid);
      }
    } else if (token === 2) {
      this.response = new Response('ok', 401, 'You are not authorized to access this route', '');
    } else {
      this.response = new Response('ok', 400, 'Token verification failed', '');
    }
    return this.response;
  }
}
