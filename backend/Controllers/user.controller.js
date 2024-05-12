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