const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


var mongoose = require('mongoose');
// mongo url --> online db
mongoose.connect('mongodb://heroku_s88x8z9j:grrt50o2nn2115urhjlkhrm6m6@ds237770.mlab.com:37770/heroku_s88x8z9j');

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  isworking = true;
  console.log("Connection success");
});

//declare models used
var Instrument = require("../models/instrument");
var Tag = require("../models/tag");


// Add new instrument
app.post('/instruments', (req, res) => {
  var db = req.db;
  var instrument = req.body.instrument;
  var status = req.body.status;
  var loanee = req.body.loanee;
  var serial = req.body.serial;
  var tags = req.body.tags;
  var qrID = req.body.qrID;

  var new_instrument = new Instrument({
    instrument: instrument,
    status: status,
    loanee: loanee,
    serial: serial,
    tags: tags,
    qrID: qrID
  })

  new_instrument.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Instrument saved successfully!'
    })
  })
})

// Fetch a single instrument
app.get('/instruments/:id', (req, res) => {
  var db = req.db;
  Instrument.findById(req.params.id, 'instrument status serial loanee tags qrID', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

// Search instrument by QR
app.get('/instruments/searchQR/:code', (req, res) => {
  var db = req.db;
  console.log(req.params.code);
  Instrument.find({instrument: req.params.code}, 'instrument status serial loanee tags qrID', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})


// Search instrument by any field
app.get('/instruments/search/:query', (req, res) => {
  var db = req.db;
  console.log(req.params.query);
  Instrument.find({$or:[{instrument: req.params.query}, {status: req.params.query}, {loanee: req.params.query}, {serial: req.params.query}, {tags: req.params.query}]}, 'instrument status serial loanee tags', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

// search instruments by tags
app.get('/instruments/tag/:tag', (req, res) => {
  var db = req.db;
  console.log(req.params.tag);
  var arr = (req.params.tag).split("+");
  Instrument.find( {tags : { $all: arr }}, 'instrument status serial loanee tags qrID', function (error, post) {
  if (error) { console.error(error); }
    res.send(post)
  })
})

// Update an instrument
app.put('/instruments/:id', (req, res) => {
  var db = req.db;
  Instrument.findById(req.params.id, 'instrument status serial loanee tags qrID', function (error, instrument) {
    if (error) { console.error(error); }

    instrument.instrument = req.body.instrument
    instrument.status = req.body.status
    instrument.loanee = req.body.loanee
    instrument.serial = req.body.serial
    instrument.tags = req.body.tags
    instrument.qrID = req.body.qrID
    instrument.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})



// Delete an instrument
app.delete('/instruments/:id', (req, res) => {
  console.log('delete me...');
  var db = req.db;
  Instrument.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
      Instrument.find({}, 'instrument status serial loanee tags qrID', function (error, instruments) {
      if (error) { console.error(error); }
      res.send({
        instruments: instruments
      })
    }).sort({_id:-1})
  })
})

// Fetch all instruments
app.get('/instruments', (req, res) => {
  Instrument.find({}, 'instrument status serial loanee tags qrID', function (error, instruments) {
    if (error) { console.error(error); }
    res.send({
      instruments: instruments
    })
  }).sort({_id:-1})
})

// Fetch all tags
app.get('/tags', (req, res) => {
  Tag.find({}, 'tagName', function (error, tags) {
    if (error) { console.error(error); }
    res.send({
      tags: tags
    })
  }).sort({_id:-1})
})

// Add new tag to tag collection
app.post('/tags', (req, res) => {
  var db = req.db;
  var tagName = req.body.tagName;

  var new_tag = new Tag({
    tagName: tagName
  })

  new_tag.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Tag saved successfully!'
    })
  })
})

// Delete a tag
app.delete('/tags/:tagName', (req, res) => {
  console.log('delete me...');
  var db = req.db;
  Tag.remove({
    tagName: req.params.tagName
  }, function(err, post){
    if (err)
      res.send(err)
      Tag.find({}, 'tagName', function (error, tags) {
      if (error) { console.error(error); }
      res.send({
        tags: tags
      })
    }).sort({_id:-1})
  })
})

// local host --> for local testing
// app.listen(8081)

// online version
app.listen(process.env.PORT)