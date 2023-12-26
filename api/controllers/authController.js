import User from "../models/User.js";
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req,res,next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);

        const user = await new User(req.body)
        const savedUser = await user.save();

        return res.status(200).json({
            success : true,
            data : savedUser
        })
    }catch(err){
        next(err);
    }
}

export const login = async (req, res, next) => {
    try{
        const user = await User.findOne({
            username : req.body.username
        });

        if(!user) return next(createError(400,"username or password wrong"));

        const valideUser = bcrypt.compare(user.password, req.body.password);

        if(!valideUser) return next(createError(400,"username or password wrong"))

        const {password,username, ...otherDetails} = user._doc;

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
          );

        return res.
        cookie("access_token", token, {
            httpOnly: true
        }).
        status(200).json({
            success: true,
            data : otherDetails,
        })

    }catch(err){
        next(err);
    }
}