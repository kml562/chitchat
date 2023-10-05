import express from "express";
import cors from 'cors'
import userRouter from './src/routes/userRouter.js'
const app= express();

// global middleware-----------------------------------------

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


// ---------------------------------------------------------------
app.use('/user', userRouter);


export default app;
