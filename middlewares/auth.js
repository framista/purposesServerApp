const { User } = require('../models/user');

module.exports = async function (req, res, next) {
  const user_id = req.header('x-user-id');
  if (!user_id) return res.status(401).send('Access denied. User not logged.');

  try {
    const user = await User.findOne({ user_id });
    if (!user) return res.status(400).send('Access denied. User not exist.');
    req.user_id = user_id;
    next();
  } catch (ex) {
    res.status(400).send('Not existing user.');
  }
};
