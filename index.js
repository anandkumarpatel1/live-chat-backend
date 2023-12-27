const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const router = require("./routes/userRoutes");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/v1/user", router);

app.listen(6000, () => {
  console.log("server is started on 6000 port");
});
