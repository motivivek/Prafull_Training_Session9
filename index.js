const express = require('express')
const app = express()
const bodyParser= require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use("/home", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   });

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node_demo', { useNewUrlParser: true });

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String
   });

var User = mongoose.model("User", nameSchema);

app.post("/add", (req, res) => {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database" +myData);
    console.log(myData)
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });

app.get('/get/:firstName',function(req,res){
    var pathParam = req.params.firstName
    console.log(pathParam)
    User.find({firstName:pathParam}, function(err,data){
        if(err){
    res.send(err)
        }else{
    res.json(data)
        }
    })

})



app.listen(4000)




// var mongoose =require('mongoose');
// var userModel = require('./model/user');
// const express = require('express')
// const bodyParser= require('body-parser')
// const app = express()

// app.use(bodyParser.urlencoded({extended: true}))

// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())

// mongoose.connect('mongodb://localhost:27017/test')

// var db = mongoose.connection
// db.once('open',function(){
//     console.log("Connected to database!")
// })


// app.get('/', function(req,res){
//     res.send("Hello from Express REST API!!!")
// })


// app.get('/get', function(req,res){
// userModel.find({},function(err,data){
//     if(err){
//         res.send(err)
//     }else {
//         res.json(data)
//     }
// })
// })

// app.get('/get/:x',function(req,res){
//     var pathParam = req.params.location
//     console.log(pathParam)
//     userModel.find({location:pathParam}, function(err,data){
//         if(err){
//     res.send(err)
//         }else{
//     res.json(data)
//         }
//     })

// })



