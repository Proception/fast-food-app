module.exports = {
  queryAllUsers: () => {
    const query = {
      // give the query a unique name
      name: 'fetch-users',
      text: 'SELECT email, full_name, phone_no, role_id FROM public.users',
    };
    return query;
  },
  queryUser: (email) => {
    const query = {
      // give the query a unique name
      name: 'fetch-single-user',
      text: 'SELECT * FROM public.users WHERE email = $1',
      values: [email],
    };
    return query;
  },
  updateUser: (email, roleId) => {
    const query = {
      // give the query a unique name
      name: 'update-user',
      text: 'UPDATE public.users SET role_id = $1 WHERE email = $2',
      values: [roleId, email],
    };
    return query;
  },
  deleteUser: (email) => {
    const query = {
      // give the query a unique name
      name: 'delete-user',
      text: 'DELETE from public.users WHERE email = $1',
      values: [email],
    };
    return query;
  },
  createUser: (email, fullName, phoneNo, password, dateCreated, roleId) => {
    const query = {
      // give the query a unique name
      name: 'create-user',
      text: 'INSERT INTO public.users(email, full_name, phone_no, password, date_created, role_id) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [email, fullName, phoneNo, password, dateCreated, roleId],
    };
    return query;
  },
};
