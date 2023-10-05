import dotenv from 'dotenv';
dotenv.config();

import app from "./app.js";
// import { Server } from "socket.io";
// import http from 'http';
import { startServer } from './config/database.js';

const {port,uri}= process.env

// const server= http.createServer(app);
// const io = new Server(server,{
//     cors:{
//         //react server---------------------
//         origin:'http://localhost:5173/',
//         methods:["GET","POST"]
//     }
// });

// io.on("connection",(socket)=>{
// console.log(socket.id);
// socket.on("disconnect",()=>{
//     console.log("user disconnected", socket.id);
// })
// })

startServer(app,port,uri)