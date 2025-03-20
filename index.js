import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';

// make database connection
await mongoose.connect(process.env.MONGO_URI);

// create an express app
const app = express();

// use global middleware
app.use(express.json());

// use the product router
app.use(productsRouter);
app.use(userRouter)

// listen for incoming request
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on ${port}`);
})