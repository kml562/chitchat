import express from "express";
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";
import userRouter from './src/routes/userRouter.js'
const app= express();

// global middleware-----------------------------------------

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const server= http.createServer(app);
const io= new Server(server,{
    cors:{
        origin:`http://localhost:3000`,
        methods:["GET","POST"],
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  server.listen(3001, () => {
    console.log("SERVER RUNNING");
  });
  
// ---------------------------------------------------------------
app.use('/user', userRouter);


export default app;
