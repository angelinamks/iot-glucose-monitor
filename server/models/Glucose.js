const mongoose = require('mongoose');

const glucoseSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  period: String,
  comment: String,
  source: {
    type: String,
    default: 'manual'
  }
});

module.exports = mongoose.model('Glucose', glucoseSchema);
