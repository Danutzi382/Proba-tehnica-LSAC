const mongoose= require("mongoose");


const usersSchema= new mongoose.Schema(
    {
        Email: {
            type: String,
            required: true,
            unique: true
        },
        Username: {
            type: String,
            required: true,
            unique: true
        },
        Password: {
            type: String,
            required: true
        }
    }
);

const User= mongoose.model("User", usersSchema);
module.exports= User;