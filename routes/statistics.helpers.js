const { Activity } = require('../models/activity');

const getDailyPoints = async (user_id, startDate, endDate) =>
  await Activity.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lte: new Date(`${endDate}T23:59:59Z`),
        },
        user_id,
      },
    },
    {
      $group: {
        _id: {
          categoryId: '$category_id',
          dateToString: { format: '%Y-%m-%d', date: '$date' },
        },
        totalDailyPoints: {
          $sum: '$points',
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

const getCategorySummary = async (user_id, startDate, endDate) =>
  await Activity.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lte: new Date(`${endDate}T23:59:59Z`),
        },
        user_id,
      },
    },
    {
      $group: {
        _id: '$category_id',
        totalCategoryPoints: {
          $sum: '$points',
        },
      },
    },
  ]);

const getDatesForCategories = async (user_id, startDate, endDate) =>
  await Activity.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lte: new Date(`${endDate}T23:59:59Z`),
        },
        user_id,
      },
    },
    {
      $group: {
        _id: '$category_id',
        dates: {
          $addToSet: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        },
      },
    },
  ]);

module.exports = { getDailyPoints, getCategorySummary, getDatesForCategories };
