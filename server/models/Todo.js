const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  text: { type: String },
  completed: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

module.exports = model('Todo', TodoSchema);
