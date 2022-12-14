//test node againnn
const express= require("express");
const app=express();
const http = require("http");
const host = "127.0.0.1";
const port = 4000;
const usersdb= require("../Backend/users");
const mongoose=require("mongoose");
const memesdb= require("./memes");
const bodyParser = require("body-parser")
const cors = require("cors");
var ObjectId = require('mongodb').ObjectId; 
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const cookieParser= require("cookie-parser");
const expressSession=require("express-session");
const cookieTime=6*60*60*1000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(expressSession({
    secret: "passwd12356",
    resave: false ,
    saveUninitialized:true,
    cookie: { maxAge: cookieTime }
}));

try {
    mongoose.connect("mongodb://127.0.0.1:27017/memedeb", () => {
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

app.get ('/memes/:_id', async(req, res) => {
    // const id= req.params._id;
    // const meme=await memesdb.findById({"_id": id});
    // res.send(meme);
    
    try{
        const meme = await memesdb.findById(req.params.id);
        res.json(meme);
    }
    catch(error){
        res.status(404).json({message: "Meme was not found"});
    }
    
    //const meme= await memesdb.memes.findById({"_id": ObjectId('$id')});

    // //var id=ObjectId(req.params._id);
    // //const meme= await memesdb.memes.findById({"_id": id});
    // //res.send(meme);
    // const meme= await memesdb.find(entry => entry._id === id);

    // memesdb.find({_id:id}, function(err, meme) {
    //     res.send(meme);
    //     console.log("meme");
    // });
    
    // memesdb.findOne(req.params._id)
    //   .then(result => res.send(result))
    //   .catch(err => 
    //     {
    //         res.status(404);
    //         res.send("Meme with id "+ id +" was not find");
    //     }
    //     );

    // console.log("text");
    // var id = req.params.gonderi_id;   
    // var o_id = new ObjectId(id);
    // memesdb.test.find({_id:o_id});

    //nici macar atata :////
    // const id=req.params;
    // memedb.memes.findById('6399e6b47590eb6d41f8768e');
});

app.post ('/memes', [
    check('Description', 'The length of the description must not exceed 2500 characters').isLength({min: 0, max : 2500}) ],
    async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
    }
    
    const description= req.body.Description;
    console.log(description)
    await memesdb.create ({
        Description: description
    } , (err) => {
        if(err)
            console.log(err);
    }); 

    res.send("mesaj");
});

app.patch('/memes/:_id', [
    check('Description', 'The length of the description must not exceed 2500 characters').isLength({min: 0, max : 2500}) ],
    async(req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
    }

    const id= req.params;
    const description= req.body.Description;

    const updatedMeme= await memesdb.updateOne({_id: id},
         {Description: description});

   res.send(updatedMeme);
});

app.delete( '/memes/: _id', async (req, res) => {
    const id= req.params;
    const deleted= await memesdb.deleteOne({ id });
    res.send(deleted);
});

app.post('/users/register', [
    check('Username', 'The length of the username must be between 8 and 32 characters').isLength({min: 8, max : 32}),
    check('Password', 'The length of the password must be between 8 and 32 characters').isLength({min: 8, max : 32}),
    check('Email', 'The field must be a valid email').isEmail(),
    check('Email','The field must end in @stud.acs.upb.ro').endsWith('(@stud.acs.upb.ro')],
    async(req, res) => {   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    const email=req.body.Email;
    const username=req.body.Username;
    const password= req.body.Password;
    const hash = bcrypt.hashSync(password, 10);
    await usersdb.create ({Email: email, Username: username, Password: hash}, (err) =>
    {
        if(err)
            console.log(err);
    });
});

app.post('/users/login', [
    check('Username', 'The length of the username must be between 8 and 32 characters').isLength({min: 8, max : 32}),
    check('Password', 'The length of the password must be between 8 and 32 characters').isLength({min: 8, max : 32}) ],
    async(req, res) => {
    const username=req.body.Username;
    const password= req.body.Password;
    const response= await usersdb.find({Username: username, Password: password}, (err) =>
        {
            if(err)
                {
                    res.send("User not found").status(404);
                }
            else
                {
                    const session= req.session;
                    res.send(session);
                }
        });
});

