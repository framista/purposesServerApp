const express = require('express');
const router = express.Router();
const { Activity } = require('../models/activity');
const auth = require('../middlewares/auth');

router.post('/', auth, async (req, res) => {
  const { user_id } = req;
  try {
    const activity = new Activity({ ...req.body, user_id });
    await activity.save();
    res.send({ id: activity._id });
  } catch (err) {
    return res.status(400).send('Unexpected error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!activity) return res.status(404).send('The activity was not found');
    res.send(activity);
  } catch (err) {
    return res.status(404).send('Unexpected error');
  }
});

router.get('/', auth, async (req, res) => {
  const { user_id } = req;
  const { startDate, endDate } = req.query;
  try {
    const activities = await Activity.find({
      user_id,
      date: { $gte: startDate, $lte: endDate },
    })
      .select('task_id user_id date points category_id')
      .sort({
        date: 1,
      });
    res.send(activities);
  } catch (err) {
    return res.status(400).send('Unexpected error');
  }
});

module.exports = router;
