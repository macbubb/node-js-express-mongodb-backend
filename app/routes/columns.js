const express = require('express');
const router = express.Router();
const columnModel = require('../models/Column');
const dotenv = require('dotenv');
dotenv.config();

//list
router.route('/').get(async (req, res) => {
  try {
    const columns = await columnModel.find();
    res.json(columns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//create
router.route('/create').post(async (req, res) => {
  const column = new columnModel({
    title: req.body.title,
    taskIds: req.body.taskIds,
  });
  try {
    const newColumn = await column.save();
    res.status(201).json({ newColumn });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update (change order, add taskId)
router.route('/update/:id').patch(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedColumn = await columnModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        taskIds: req.body.taskIds,
      },
      { new: true }
    );
    res.status(201).json({ updatedColumn });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete
router.route('/delete/:id').delete(async (req, res) => {
  const id = req.params.id;
  try {
    const deletedColumn = await columnModel.findByIdAndDelete(id);
    res.status(201).json({ deletedColumn });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
