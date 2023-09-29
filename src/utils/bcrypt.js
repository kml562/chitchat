import bcrypt from 'bcryptjs';

export const hashPasswordfun= async(pass)=>{
  
        const salt= 10;
        const hashedPassword=   await bcrypt.hash(pass, salt);
        return hashedPassword
   
}