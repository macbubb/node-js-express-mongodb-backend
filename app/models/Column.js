const mongoose = require('mongoose');
const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  taskIds: { type: [String], required: true },
});
module.exports = mongoose.model('Column', ColumnSchema);
