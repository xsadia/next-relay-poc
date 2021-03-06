import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const mongoURL =
      process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/next_relay";
    await connect(mongoURL);
  } catch (e) {
    console.log(e);
  }
};
