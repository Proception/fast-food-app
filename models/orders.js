export default class Orders {
  constructor(orderId, orderDate, orderAmount, orderStatus, shippingAddress, userId) {
    this.orderId = orderId;
    this.orderDate = orderDate;
    this.orderAmount = orderAmount;
    this.orderStatus = orderStatus;
    this.shippingAddress = shippingAddress;
    this.userId = userId;
  }
}
