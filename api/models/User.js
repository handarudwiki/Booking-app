import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username : {
        type : 'string',
        required : true,
        unique : true
    },
    email : {
        type : 'string',
        required : true,
        unique : true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin : {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("User", UserSchema)