const mongoose= require("mongoose");
const mongoUrl= "mongodb://127.0.0.1:27017/memes";
mongoose.set('strictQuery', true); //eroare terminal

const memesSchema= mongoose.Schema(
    {
        
        Description: {
            type: String
        }

    }
);

const Meme= mongoose.model("Meme", memesSchema);
module.exports= Meme;

