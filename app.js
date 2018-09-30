import express from 'express';
import bodyParser from 'body-parser';
import ordersRouter from './routes/orders';
import usersRouter from './routes/users';
import menusRouter from './routes/menus';
import indexRouter from './routes/index';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/menus', menusRouter);
app.use('*', indexRouter);

app.listen(process.env.PORT || 3012, () => {
  // console.log('Example app listening on port 3000!');
});

export default app;
