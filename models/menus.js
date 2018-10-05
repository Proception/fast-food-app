export default class Menus {
  constructor(menuId, name, price, quantity, type, dateCreated, createdBy, imgUrl) {
    this.menuId = menuId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
    this.dateCreated = dateCreated;
    this.createdBy = createdBy;
    this.imgUrl = imgUrl;
  }
}
