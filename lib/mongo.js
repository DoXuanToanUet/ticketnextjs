// lib/mongo.js
import { MongoClient } from "mongodb";

// Lưu trữ client MongoDB để tránh kết nối lại mỗi lần
let client;
let clientPromise;

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"; // Sử dụng biến môi trường MONGO_URI để kết nối đến MongoDB

// Kết nối đến MongoDB
export const connectToMongoDB = async () => {
  if (client) return client;  // Trả lại client nếu đã kết nối

  if (clientPromise) {
    client = await clientPromise;
    return client;
  }

  // Kết nối lần đầu tiên
  clientPromise = MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client = await clientPromise;
  return client;
};

// Lấy client MongoDB
export const getMongoClient = () => {
  if (!client) throw new Error("MongoDB client is not connected yet.");
  return client;
};
