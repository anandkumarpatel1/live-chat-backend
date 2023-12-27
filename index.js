const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const router = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(
  "*",
  cors({
    origin: "*",
    credentials: true,
    headers:
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTION",
  })
);
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectDB();

app.use("/api/v1/user", router);

app.listen(6000, () => {
  console.log("server is started on 6000 port");
});
