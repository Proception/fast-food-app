module.exports = {
  queryAllOrders: () => {
  	const query = {
	  // give the query a unique name
	  name: 'fetch-orders',
	  text: 'SELECT * FROM public.orders'
	};
    return query;
  },
  queryOrder: (id) => {
  	const query = {
	  // give the query a unique name
	  name: 'fetch-single-order',
	  text: 'SELECT * FROM public.orders WHERE order_id = $1',
	  values: [id]
	};
    return query;
  },
  userOrder: (user_id) => {
  	const query = {
	  // give the query a unique name
	  name: 'fetch-user-orders',
	  text: 'SELECT * FROM public.orders WHERE user_id = $1',
	  values: [user_id]
	};
    return query;
  },
  updateOrder: (id, status) => {
  	const query = {
	  // give the query a unique name
	  name: 'update-order',
	  text: 'UPDATE public.orders SET order_status = $1 WHERE order_id = $2',
	  values: [status, id]
	};
    return query;
  },
  deleteOrder: (id) => {
  	const query = {
	  // give the query a unique name
	  name: 'delete-order',
	  text: 'DELETE from public.orders WHERE order_id = $1',
	  values: [id]
	};
    return query;
  },
  createOrder: (order_id,order_date,order_amount,order_status,shipping_address,user_id) => {
  	const query = {
	  // give the query a unique name
	  name: 'create-order',
	  text: 'INSERT INTO public.orders(order_id, order_date, order_amount, order_status, shipping_address, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
	  values: [order_id, order_date, order_amount, order_status, shipping_address, user_id]
	};
    return query;
  },
};