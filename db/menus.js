module.exports = {
  queryAllMenus: () => {
    const query = {
      // give the query a unique name
      name: 'fetch-menus',
      text: 'SELECT * FROM public.menus',
    };
    return query;
  },
  queryMenu: (menuId) => {
    const query = {
      // give the query a unique name
      name: 'fetch-single-menu',
      text: 'SELECT * FROM public.menus WHERE menu_id = $1',
      values: [menuId],
    };
    return query;
  },
  updateMenu: (menuId, price) => {
    const query = {
      // give the query a unique name
      name: 'update-menu',
      text: 'UPDATE public.menus SET price = $1 WHERE menu_id = $2',
      values: [price, menuId],
    };
    return query;
  },
  deleteMenu: (menuId) => {
    const query = {
      // give the query a unique name
      name: 'delete-menu',
      text: 'DELETE from public.menus WHERE menu_id = $1',
      values: [menuId],
    };
    return query;
  },
  createMenu: (menuId, name, price, quantity, type, createdAt, createdBy, imgUrl) => {
    const query = {
      // give the query a unique name
      name: 'create-menu',
      text: 'INSERT INTO public.menus(menu_id, name, price, quantity, type, created_at, created_by, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [menuId, name, price, quantity, type, createdAt, createdBy, imgUrl],
    };
    return query;
  },
};
