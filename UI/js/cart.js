export default class Cart {
  constructor(cartList) {
    this.cartList = cartList;
  }

  getAllItems() {
    return this.cartList;
  }

  addItem(menuObj, qty) {
    // console.log('Cart Menu Obj : ', menuObj);
    if (this.cartList.has(menuObj.menuId)) {
      const updateItem = this.getItem(menuObj.menuId);
      updateItem.price += (menuObj.price * qty);
      updateItem.quantity += qty;
      this.cartList.set(updateItem.menuId, updateItem);
    } else {
      const newMenuObj = menuObj;
      newMenuObj.quantity = qty;
      newMenuObj.price *= qty;
      this.cartList.set(newMenuObj.menuId, newMenuObj);
    }
  }

  removeItem(itemId) {
    this.cartList.delete(itemId);
  }

  getItem(itemId) {
    return this.cartList.get(itemId);
  }

  getSize() {
    return this.cartList.size;
  }
}
