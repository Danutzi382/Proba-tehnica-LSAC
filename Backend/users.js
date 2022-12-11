const mongoose= require("mongoose");

const usersSchema= mongoose.Schema(
    {
        ID: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Username: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        }
    }
);

