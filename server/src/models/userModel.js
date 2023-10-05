import { Schema,model} from "mongoose";

const userSchema= new Schema({
    full_name:{
        type:String,
        trim:true,
        minLength:5,
        require:true
    },email:{
        type:String,
        trim:true,
        required: true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required: true,
      
    },
    mobile:{
        type:String,
        require:true
    }
},{timestamps:true});


const models = new model("User", userSchema);
export default models;