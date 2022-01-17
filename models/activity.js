const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    category_id: {
      type: String,
      required: true,
    },
    task_id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

const Activity = mongoose.model('Activity', activitySchema);

exports.Activity = Activity;
