import uuid from 'uuid/v4';
import Menu from '../models/menus';
import Response from '../models/response';
import { jsonIsEmpty as validate } from '../utils/validate';

export default class MenuController {
  constructor(response, mapMenuList) {
    this.response = response;
    this.mapMenuList = mapMenuList;
  }

  // Display list of all Menus.
  getMenuList() {
    const status = 200;
    this.response = new Response('Ok', status, '', this.mapMenuList);
    // res.status(status).send(this.response);
    return this.response;
  }

  // Create New Menu.
  createMenu(req) {
    // Get POST params
    const json = req.body;
    let status;


    // Populate List in Memory if object is not empty
    if (!(validate(json))) {
      const newMenu = new Menu(uuid(), json.name,
        json.price, json.quantity,
        json.type, new Date());
      this.mapMenuList.set(newMenu.menuId, newMenu);
      status = 201;
      this.response = new Response('Ok', status, '', newMenu);
      // console.log(response, status);
    } else {
      status = 204;
      this.response = new Response('NOK', status, 'Menu Creation Failed', json);
      // console.log(response, status);
    }
    // res.status(status).send(this.response).end();
    return this.response;
  }

  // Get single menu by Id
  getMenu(req) {
    const { menuid } = req.params;
    const menuFound = this.mapMenuList.get(menuid);

    const status = (menuFound === undefined) ? 204 : 200;

    if (status === 204) {
      this.response = new Response('Ok', status, 'Menu item Not available', '');
      // console.log(response, status);
    } else {
      this.response = new Response('Ok', status, '', menuFound);
      // console.log(response, status);
    }

    return this.response;
  }

  // Update menu by Id
  updateMenu(req) {
    const { menuid } = req.params;
    // Get params in body
    const {
      name, price, quantity, type,
    } = req.body;

    const updateData = new Menu(menuid, name, price, quantity, type, new Date());

    const menuFound = this.mapMenuList.get(menuid);
    const status = (menuFound === undefined) ? 204 : 201;
    // update if the menu object
    if (status === 201) {
      this.mapMenuList.set(updateData.menuId, updateData);
      this.response = new Response('Ok', status, '', updateData);
      // console.log(response, status);
    } else {
      this.response = new Response('Ok', status, 'Update failed', '');
      // console.log(response, status);
    }
    // res.status(status).send(this.response).end();
    return this.response;
  }

  // delete menu by menuid
  deleteMenu(req) {
    const { menuid } = req.params;
    // res.status((this.mapMenuList.delete(menuid)) ? 201 : 204).end();
    return (this.mapMenuList.delete(menuid)) ? 201 : 204;
  }
}
