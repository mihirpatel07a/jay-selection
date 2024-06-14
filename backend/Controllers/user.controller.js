import { trusted } from "mongoose";
import User from "../models.js";

export const test = (req, res)=> {
    res.send("hello this is temp page");
}

export const deleteUSer = async(req , res)=> {
    try{
        const user = await User.findById(req.params.id);

        if(!user) 
        {
            res.status(401).json({
                success : false , 
                message : "user not found"
            })

            return;
        }

        await User.findByIdAndDelete(req.params.id);

        res.clearCookie("access_token");
        res.status(200).json({
            success : true, 
            message : "successfully deleted"
        })

    }
    catch(err)
    {
        res.status(401).json({
            success : false, 
            message : "error occurs"
        })
    
    }
}


export const UpdateUser =  async (req ,res )=> {
    try
    {
        const user = await User.findById(req.params.id);

        if(!user)
            {
                res.status(401).json({
                    success : false , 
                    message : "user not found"
                })

                return ;
            }
        
        

       const updated_user =   await User.findByIdAndUpdate(req.params.id , {
            $set : {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password 
                
            }
         },
         {new : true}
        )

    
        const {password , ...rest } = updated_user._doc;

        res.status(200).json({
            success : true ,
            message : "successfully updated" ,
            data : rest
        })
         
    }
    catch(error)
    {
        res.status(401).json(
            {
                success :  false , 
                message : error.message 
            }
        )
    }
}

export const getUsers = async (req, res)=>{

    try{

        const users = await User.find();

        res.status(200).json(users);

    }
    catch(error)
    {
        res.status(401).json(
            {
                success :  false , 
                message : error.message 
            }
        )
    }
}