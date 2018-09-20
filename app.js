import express from 'express';
import ordersRouter from './routes/orders';
import usersRouter from './routes/users';

const app = express();

app.use(express.json());

app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/users', usersRouter);

app.listen(process.env.PORT || 3012, () => {
  // console.log('Example app listening on port 3000!');
});

export default app;
