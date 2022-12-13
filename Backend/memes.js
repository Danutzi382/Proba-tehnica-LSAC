const mongoose= require("mongoose");


const memesSchema= new mongoose.Schema({
        Description: {
            type: String
        }
});

const Meme= mongoose.model("Meme", memesSchema);
module.exports= Meme;