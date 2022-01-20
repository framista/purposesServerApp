const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getDailyPoints } = require('./statistics.helpers');

router.get('/', auth, async (req, res) => {
  const { user_id } = req;
  const { startDate, endDate } = req.query;
  try {
    const dailyPoints = await getDailyPoints(user_id, startDate, endDate);
    res.send({ dailyPoints });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Unexpected error');
  }
});

module.exports = router;
