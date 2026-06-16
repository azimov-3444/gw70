import express from "express";
import mongoose from "mongoose";
import user from "../routes/userRoute.js";
import category from "../routes/categoryRoute.js";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
let app = express();
mongoose
.connect(process.env.MONGODB_URL
)
.then(() => {
   console.log("Mongo db ulandi");
})
.catch((err) => {
   console.log(`Mongodb ulanmadi: ${err}`);
});

app.use(cors({
   origin: "*",
   methods:["GET","POST","DELETE","PUT"]
}))

app.use(express.json())
app.use("/api/v1", user);
app.use("/api/v1", category);

app.listen(5000, () => {
  console.log(`Create run server 5000`);
});
