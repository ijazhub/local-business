const mongoose = require('mongoose');
const { mongoUri } = require('./index');

module.exports = async function connectDb() {
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};
