const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    if (connect) {
      console.log("Connected succesfully.");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
