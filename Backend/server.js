//test node againnn
const express= require("express");
const app=express();
const http = require("http");
const host = "127.0.0.1";
const port = 4000;
// const usersdb= require("../Backend/users");
const mongoose=require("mongoose");
const memesdb= require("./memes");
const bodyParser = require("body-parser")
const cors = require("cors");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
try {
    mongoose.connect("mongodb://localhost:27017/memedeb", () => {
        console.log("Mongoose Initialized");
    })
}
catch (err) {
    console.log(err)
}


app.listen(port, () => {
    console.log('Listening on '+ port );
});

app.get('/test', (req, res) => {
    res.send("Hello World!")
});

app.get ('/memes', async (req, res) => {
    const memes=await memesdb.find();
    res.send(memes);
});

app.get ('/memes/: ID', async(req, res) => {
    // const meme= await memesdb.memes.find($id);
    // res.send(meme);
    var id= req.params.ID;
    memesdb.findById(req.params.ID)
      .then(result => res.send(result))
      .catch(err => 
        {
            res.status(404);
            res.send("Meme with id "+ id +" was not find");
        }
        );
});

app.post ('/memes', async(req, res) => {
    
    const description= req.body.Description;

    await memesdb.create ({
        Description: description
    } , (err) => {
        if(err)
            console.log(err);
        
    }); 

    res.send("mesaj");
});

app.patch('/memes/:ID', async(req, res) => {

    const id= req.params;
    const description= req.body.Description;

    const updatedMeme= await memesdb.updateOne({ID: id},
         {Description: description});

   res.send(updatedMeme);
});

app.delete( '/memes/: ID', async (req, res) => {
    const id= req.params;
    const deleted= await memesdb.deleteOne({ id });
    res.send(deleted);
});





