module.exports = {
  queryOrderMenu: (id) => {
    const query = {
      // give the query a unique name
      name: 'fetch-order-menu',
      text: 'SELECT * FROM public.order_menus WHERE order_id = $1',
      values: [id],
    };
    return query;
  },
  addOrderMenu: (orderMenuId, orderId, quantity, menuId) => {
    const query = {
      // give the query a unique name
      name: 'add-order-menu',
      text: 'INSERT INTO public.order_menus(order_menu_id, order_id, quantity, menu_id)VALUES ($1, $2, $3, $4)',
      values: [orderMenuId, orderId, quantity, menuId],
    };
    return query;
  },
};
