const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoRoute = require("./routes/todo");
const mlbRoute = require("./routes/MLB");
const cors = require("cors");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })
  .then(() => console.log("DB connection successfull."))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoute);
app.use("/api/mlb", mlbRoute);

app.use(express.static(path.join(__dirname, "/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
