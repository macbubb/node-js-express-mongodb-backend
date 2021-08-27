const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean },
});
module.exports = mongoose.model('Task', TaskSchema);
