module.exports = {
  queryDrop: () => {
    const query = {
      // give the query a unique name
      name: 'drop-users',
      text: 'DROP TABLE IF EXISTS public.users ;',
    };
    return query;
  },
  queryReset: () => {
    const query = {
      // give the query a unique name
      name: 'reset-users',
      text: 'CREATE TABLE public.users(id SERIAL NOT NULL,email character varying(100) COLLATE pg_catalog."default" NOT NULL,full_name character varying(50) COLLATE pg_catalog."default",phone_no bigint,password character varying(100) COLLATE pg_catalog."default",date_created date,role_id integer,CONSTRAINT users_pkey PRIMARY KEY (id),CONSTRAINT email UNIQUE (email)) WITH (OIDS =FALSE) TABLESPACE pg_default;',
    };
    return query;
  },
  queryAllOrders: () => {
    const query = {
      // give the query a unique name
      name: 'fetch-orders',
      text: 'SELECT * FROM public.orders',
    };
    return query;
  },
  queryOrder: (id) => {
    const query = {
      // give the query a unique name
      name: 'fetch-single-order',
      text: 'SELECT * FROM public.orders WHERE order_id = $1',
      values: [id],
    };
    return query;
  },
  userOrder: (userId) => {
    const query = {
      // give the query a unique name
      name: 'fetch-user-orders',
      text: 'SELECT * FROM public.orders WHERE user_id = $1',
      values: [userId],
    };
    return query;
  },
  updateOrder: (id, status) => {
    const query = {
      // give the query a unique name
      name: 'update-order',
      text: 'UPDATE public.orders SET order_status = $1 WHERE order_id = $2',
      values: [status, id],
    };
    return query;
  },
  deleteOrder: (id) => {
    const query = {
      // give the query a unique name
      name: 'delete-order',
      text: 'DELETE from public.orders WHERE order_id = $1',
      values: [id],
    };
    return query;
  },
  createOrder: (orderId, orderDate, orderAmount, orderStatus, shippingAddress, userId) => {
    const query = {
      // give the query a unique name
      name: 'create-order',
      text: 'INSERT INTO public.orders(order_id, order_date, order_amount, order_status, shipping_address, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [orderId, orderDate, orderAmount, orderStatus, shippingAddress, userId],
    };
    return query;
  },
};
