import mongoose from "mongoose";

export const startServer= async(app,port,uri)=>{
    try {
       await mongoose.connect(uri);
       console.log("mongo connected");
       app.listen(port,()=>{
        console.log("connected in port "+port);
       })
    } catch (error) {
        console.log(error);
    }
}