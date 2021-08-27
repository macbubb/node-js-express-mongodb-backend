const express = require('express');
const router = express.Router();
const taskModel = require('../models/Task');
//list
router.route('/').get(async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create
router.route('/create').post(async (req, res) => {
  const task = new taskModel({
    text: req.body.text,
    done: req.body.done || false,
  });
  try {
    const newTask = await task.save();
    res.status(201).json({ newTask });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update
router.route('/update/:id').patch(async (req, res) => {
  const id = req.params.id;
  try {
    const oldTask = await taskModel.findById(id);
    const updatedTask = await taskModel.findByIdAndUpdate(id, {
      text: req.body.text || oldTask.text,
      done: req.body.done || oldTask.done,
    });
    res.status(201).json({ updatedTask });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete
router.route('/delete/:id').delete(async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTask = await taskModel.findByIdAndDelete(id);
    res.status(201).json({ deletedTask });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
