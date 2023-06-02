import mongoose from "mongoose";

(async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("db connected!");
  });
})();
