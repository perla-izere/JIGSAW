const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  score: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  moves: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Score', scoreSchema);
