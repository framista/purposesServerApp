const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');
  user = new User(req.body);
  await user.save();
  res.send('User created successfully');
});

module.exports = router;
