import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:[true,'Name is required']},
    email:{type:String,required:[true,'Email is required'],unique:[true,'Email already exists! Please login to continue'],match:[/.+\@.+\../,'Please enter a valid email']},
    password:{type:String,default:'NA'},
    googleId:{type:String,default:'NA'},
    githubId:{type:String,default:'NA'}
});
export const userModel=mongoose.model('user',userSchema);