
import User from "../models.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Signin = async (req, res, next) => {

    try{
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user)
        {
            return  res.status(200).json({
                success : false , 
                message : "user is not registered"
            })
           
        }

        const validpassword = bcrypt.compareSync(  password ,  user.password);

        if(!validpassword) return res.json({message : "wrong password"  , success : false});

        const token = jwt.sign({id : user._id }, process.env.JWT_SECRET);

        const { password : pass , ...rest } = user._doc;

        res.cookie("access_token" , token , {httpOnly : true}).status(200).json({
            success : true , 
            message : "successfully signed in" , 
            data : rest
        })
    }
    catch(err)
    {
        res.status(401).json({
            success : false , 
            message : err.message || "something wrong"
        })
    }
     
}

export const Signup = async (req, res, next) => {

    try {

        const { username, email, password } = req.body;
        const existuser = await User.findOne({ email });


        if (existuser) {
            return res.status(200).json({
                success: false,
                message: "user already exist"
            });
        }

        const hashpassword = bcrypt.hashSync(password , 10);

        const newuser = new User({ email, username, password : hashpassword });
        


        await newuser.save();

        res.status(200).json({
            success: true,
            message: "user successfully registered", 
           
        })

    }
    catch (err) {
        res.status(401).json({
            message: err.message,
            success : false
        })
    }

}




