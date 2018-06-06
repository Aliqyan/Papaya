const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


var mongoose = require('mongoose');
//online
mongoose.connect('mongodb://heroku_w6sts3lf:64s41q26nd240e0k0kk5ntejcj@ds119650.mlab.com:19650/heroku_w6sts3lf');
//local host
//mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  isworking = true;
  console.log("Connection success");
});

var Post = require("../models/post");
/*
app.get('/posts', (req, res) => {
      res.send(
        [{
          title: "Hello World!",
          description: "Hi there! How are you?"
        }]
      )

})
*/

// Add new post
app.post('/posts', (req, res) => {
  console.log('I am here...'); 
  var db = req.db;
  var name = req.body.name;
  var status = req.body.status;
  var loanee = req.body.loanee;
  var serial = req.body.serial;

  var new_post = new Post({
    name: name,
    status: status,
    loanee: loanee,
    serial: serial,
  })

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch single post
app.get('/post/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'instrument status serial loanee', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

// Update a post
app.put('/posts/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'instrument status serial loanee', function (error, post) {
    if (error) { console.error(error); }

    post.instrument = req.body.instrument
    post.status = req.body.status
    post.loanee = req.body.loanee
    post.serial = req.body.serial

    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a post
app.delete('/posts/:id', (req, res) => {
  console.log('delete me...');
  var db = req.db;
  Post.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
      Post.find({}, 'instrument status serial loanee', function (error, posts) {
      if (error) { console.error(error); }
      res.send({
        posts: posts
      })
    }).sort({_id:-1})
  })
})

// Fetch all posts
app.get('/posts', (req, res) => {
  Post.find({}, 'instrument status serial loanee', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})

//local host
//app.listen(8081)
//online version
app.listen(process.env.PORT)