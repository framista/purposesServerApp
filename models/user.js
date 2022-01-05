const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

const User = mongoose.model('User', userSchema);

exports.User = User;
