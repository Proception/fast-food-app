export default class Orders {
  constructor(orderId, orderDate, orderAmount, orderStatus, shippingAddress) {
    this.orderId = orderId;
    this.orderDate = orderDate;
    this.orderAmount = orderAmount;
    this.orderStatus = orderStatus;
    this.shippingAddress = shippingAddress;
  }
  // // Getter
  // get area() {
  //   return this.calcArea();
  // }
  // // Method
  // calcArea() {
  //   return this.height * this.width;
  // }
}
