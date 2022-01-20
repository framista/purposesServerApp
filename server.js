require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const categories = require('./routes/categories');
const tasks = require('./routes/tasks');
const activities = require('./routes/activities');
const statistics = require('./routes/statistics');

const connectionMongo = `mongodb+srv://framista:${process.env.MONGO_PASSWORD}@cluster0.ot39a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(connectionMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

const app = express();
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', users);
app.use('/api/categories', categories);
app.use('/api/tasks', tasks);
app.use('/api/activities', activities);
app.use('/api/statistics', statistics);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
