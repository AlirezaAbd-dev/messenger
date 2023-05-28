import mongoose from "mongoose";

const dbConnect = async () => {
  return (
    (!mongoose.connections[0].readyState &&
      (await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
          console.log("db connected!");
        })
        .catch((err) => {
          console.log(err);
        }))) ||
    null
  );
};

export default dbConnect;
