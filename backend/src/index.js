import { config } from "dotenv";
config({ path: "src/config/.env" });
import express from "express";
import { dbConnected } from "./config/db.js";
import cookieParser from "cookie-parser";
import router from "./router/index.js";
import cors from "cors";
const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "api is running on port ",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  dbConnected();
});
