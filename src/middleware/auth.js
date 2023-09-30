import jwt from "jsonwebtoken";

export const authentication = async(req,res,next)=>{
    try {
        let header= req.headers["x-api-token"];
        const {JWT_SECRET}= process.env;
        if(!header){
            return res.status(400).json({error:"bad request", message:"headers is requried"});  }
             jwt.verify(header,JWT_SECRET,(err,token)=>{
if(err){
    return res.status(400).json({error:"bad request", message:err});
}else{
    req.decodedtoken- token;
    next()
}



             })

    } catch (error) {
        return res.status(500).json({error:"server error", message:error.message});
    }
};

// export const authorization =(req,res,next)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }