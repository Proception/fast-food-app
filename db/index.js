const { Pool } = require('pg');

 const connectionString = 'postgres://ugqbjscmkbgxak:45b67f7ecd7650e8514802034cca2906d5456f9b4ea059360fc455d2adfefe04@ec2-54-221-225-11.compute-1.amazonaws.com:5432/dd1b2686i5gk4i';
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'fastfood',
//   password: 'root',
//   port: 5432,
// });

// postgresql://postgres:root@localhost:5432/fastfood
//const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  // connectionString: 'postgresql://postgres:root@localhost:5432/fastfood',
  // ssl: true
 connectionString,
  ssl: true,
});


module.exports = {
  query: query => pool.query(query)
  ,
};
