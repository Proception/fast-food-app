import express from 'express';
import ordersRouter from './routes/orders';

const app = express();

app.use(express.json());

app.use('/api/v1/orders', ordersRouter);


app.listen(process.env.PORT || 3000, () => {
  // console.log('Example app listening on port 3000!');
});

// exports a function declared earlier
// export { app };
// export default class {}
export default app;
