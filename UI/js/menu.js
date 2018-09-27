// import Manus from 'manu';

export default class Menu {
  constructor(menuList) {
    this.menuList = menuList;
  }

  getAllItems() {
    return this.menuList;
  }

  // addItem(menuObj) {
  //   const newMenu = new Manus(this.getId(), menuObj.name,
  //     menuObj.price, menuObj.quantity,
  //     menuObj.type, menuObj.imgUrl,
  //     new Date());
  //   this.menuList.set(newMenu.menuId, newMenu);
  // }

  getItem(menuItemId) {
    // console.log('Type ', typeof menuItemId);
    return this.menuList.get(menuItemId);
  }

  // getId() {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  //     const r = Math.random() * 16 | 0; const
  //       v = c == 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //     });
  // }
}
