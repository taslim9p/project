import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import mongoose from "mongoose";


//configure env
dotenv.config();

const MONGO_URL = "mongodb://127.0.0.1:27017/pcrex";

main().then(()=>{
  console.log("connected to mongoosh");
}).catch(err=>{
  console.log(err);
})

//database config
// connectDB();
async function main() {
  await mongoose.connect(MONGO_URL);
}

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api

app.get("/", (req, res) => {
  res.send("<h1>welcome! to my app</h1>");
});

//port

const PORT = process.env.PORT || 8080;

//listen app

// app.listen(PORT, () => {
//   console.log("server running");
// });


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
