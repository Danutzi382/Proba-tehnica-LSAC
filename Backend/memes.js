const mongoose= require("mongoose");

const memesSchema= mongoose.Schema(
    {
        ID: {
            type: String,
            required: true
        },
        Description: {
            type: String
        }

    }
);