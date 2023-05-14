import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("db connected!");
  });
};

export default dbConnect;
