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
};
