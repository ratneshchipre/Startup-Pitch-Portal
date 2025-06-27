import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const connectMongoDb = async (url) => {
  return mongoose.connect(url);
};

export default connectMongoDb;
