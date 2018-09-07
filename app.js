import express from 'express';
import ordersRouter from './routes/orders';

const app = express();

app.use(express.json());

app.use('/api/v1/orders', ordersRouter);


app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

// exports a function declared earlier
// export { app };
// export default class {}
export default app;
