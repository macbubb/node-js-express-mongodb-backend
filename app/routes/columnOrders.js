const express = require('express');
const router = express.Router();
const columnOrderModel = require('../models/ColumnOrder');

//Create
router.route('/create').post(async (req, res) => {
  columnOrder = new columnOrderModel({ columnOrder: req.body.columnOrder });
  try {
    const newColumnOrder = await columnOrder.save();
    res.status(201).json({ newColumnOrder });
  } catch {
    res.status(400).json({ message: err.message });
  }
});

//Read
router.route('/').get(async (req, res) => {
  try {
    const columnOrder = await columnOrderModel.find();
    res.json(columnOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update
router.route('/update/:id').patch(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedColumnOrder = await columnOrderModel.findByIdAndUpdate(
      id,
      {
        columnOrder: req.body.columnOrder,
      },
      { new: true }
    );
    res.status(201).json({ updatedColumnOrder });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete
router.route('/delete/:id').delete(async (req, res) => {
  const id = req.params.id;
  try {
    const deletedColumnOrder = await columnOrderModel.findByIdAndDelete(id);
    res.status(201).json({ deletedColumnOrder });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
