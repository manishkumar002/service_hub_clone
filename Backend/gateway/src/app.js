const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes/index");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Gateway Running 🚀");
});

app.use("/api", routes);

app.use(express.json());

module.exports = app;
