const mongoose = require('mongoose');
const ColumnOrderSchema = new mongoose.Schema({
  columnOrder: { type: [String], required: true },
});
module.exports = mongoose.model('ColumnOrder', ColumnOrderSchema);
