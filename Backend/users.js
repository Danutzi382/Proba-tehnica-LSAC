const mongoose= require("mongoose");
const mongoUrl= "mongodb://127.0.0.1:27017/users";
mongoose.set('strictQuery', true); //eroare terminal

const usersSchema= mongoose.Schema(
    {
        ID: {
            type: String,
            required: true,
            unique: true
        },
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
