import User from "../models/User.js"

export const updateUser = async (req,res,next)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{$set : req.body},{new : true})

        return res.status(200).json({
            success: true,
            data : user
        });

    }catch(err){
        return next(err);
    }
}

export const deleteUser = async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success: true,
            message : "User deleted successfully"
        });

    }catch(err){
        next(err);
    }
}

export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!User){
            return next(createError(404,"User not found"));
        } 

        return res.status(200).json({
            success: true,
            data : user
        });

    }catch(err){
        return next(err);
    }
}

export const getUsers = async (req,res,next)=>{
    try{
        const users = await User.find()

        return res.status(200).json({
            success: true,
            data : users
        });

    }catch(err){
        return next(err)
    }
}