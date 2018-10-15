import express from 'express';
import bodyParser from 'body-parser';
import ordersRouter from './routes/orders';
import usersRouter from './routes/users';
import menusRouter from './routes/menus';
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import validateuser from './utils/validateuser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Add headers
app.use((req, res, next) => {
    // Add access control header to responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token, content-type');
    next();
});

app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/users', validateuser, usersRouter);
app.use('/api/v1/menus', menusRouter);
app.use('/api/v1/auth', authRouter);
app.use('*', indexRouter);

app.listen(process.env.PORT || 3012, () => {
  // console.log('Example app listening on port 3000!');
});

export default app;
