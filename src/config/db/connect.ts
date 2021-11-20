import mongoose from "mongoose";

async function connectDB() {
  return await mongoose
    .connect("mongodb://root:root@localhost:27017/contactsApi?authSource=admin")
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log("Error connecting with Database: ", error.message);
      process.exit(1);
    });
}

export default connectDB;
