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

//remove id
router.route('/remove-task/:id').patch(async (req, res) => {
  const id = req.params.id;
  //grab the columns
  const oldColumns = await columnModel.find();
  let newTaskList = [];
  let oldColumnId;
  let found = false;
  let time = new Date();
  if (process.env.VERBOSE)
    console.log(
      `\n${time} \nSearching for taskId: ${id} ... \n current column data \n ${oldColumns}`
    );
  //look in each column until id is found
  for (let columnIndex = 0; columnIndex < oldColumns.length; columnIndex++) {
    for (
      let taskIndex = 0;
      taskIndex < oldColumns[columnIndex].taskIds.length;
      taskIndex++
    ) {
      if (oldColumns[columnIndex].taskIds[taskIndex] === id) {
        if (process.env.VERBOSE)
          console.log(
            `------\nfound task ${id} at index of ${taskIndex} in the column: ${oldColumns[columnIndex].title}\n------`
          );
        found = true;
        oldColumns[columnIndex].taskIds.splice(taskIndex, 1);
        newTaskList = oldColumns[columnIndex].taskIds;
        //remove id from taskIds
        oldColumnId = oldColumns[columnIndex]._id;
        if (process.env.VERBOSE)
          console.log(
            `new task list for column \n${oldColumns[columnIndex].title}: ${newTaskList}`
          );
        break;
      }
    }
  }
  if (!found) {
    res.status(404).json(`task: ${id} not found.`);
  } else {
    //update just that column
    try {
      const updatedColumn = await columnModel.findByIdAndUpdate(oldColumnId, {
        taskIds: newTaskList,
      });
      if (process.env.VERBOSE) console.log(`\nupdatting column taskList...`);
      res.status(201).json({ updatedColumn });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
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
