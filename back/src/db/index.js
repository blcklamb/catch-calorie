import mongoose from "mongoose";
import { User } from "./models/User.js";

const DB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017"

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () => console.log("정상적으로 MongoDB 서버에 연결되었습니다. "+ DB_URL));
db.on("error", (error) => console.error("MongoDB 연결에 실패하였습니다." +DB_URL + "\n" + error));

export { User };