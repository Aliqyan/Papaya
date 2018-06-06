var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InstrumentSchema = new Schema({
  instrument: String,
  status: String,
  loanee: String,
  serial: String,
  tags: Array,
  qrID: String
});

var Instrument = mongoose.model("Instrument", InstrumentSchema);
module.exports = Instrument;