const express = require('express');
const router = express.Router();
const { Task } = require('../models/task');
const auth = require('../middlewares/auth');

router.post('/', auth, async (req, res) => {
  const { user_id } = req;
  try {
    const task = new Task({ ...req.body, user_id });
    await task.save();
    res.send({ id: task._id });
  } catch (err) {
    return res.status(400).send('Unexpected error');
  }
});

router.get('/', auth, async (req, res) => {
  const { user_id } = req;
  try {
    const tasks = await Task.find({ user_id })
      .select('name description user_id color points category_id')
      .sort({
        name: 1,
      });
    res.send(tasks);
  } catch (err) {
    return res.status(400).send('Unexpected error');
  }
});

module.exports = router;
