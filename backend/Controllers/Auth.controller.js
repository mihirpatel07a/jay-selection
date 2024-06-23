
import User from "../model.js/user.model.js"
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

        res.cookie("access_token" , token , {httpOnly : true}).status(200).json(rest);
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



export const google = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password , ...rest} = user._doc;

            res.cookie("access_token", token, { httpOnly: true }).status(200).json( rest  );
        } else {
            // Generate a secure random password
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.avatar
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password , ...rest} = newUser._doc;

            res.cookie("access_token", token, { httpOnly: true }).status(200).json(
     rest
            );
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred during sign-in"
        });
    }
}

export const Signout  = (req , res)=>{
    try{
        res.clearCookie('access-token');

        res.status(200).json({
            success: true ,
            message : "successfully signed out"
        })


    }
    catch(error)
    {
        res.status(401).json({
            success : false , 
            message : error.message
        })
    }
}



