const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const authRoutes = require("./routes/api");

const app = express();

/* Middlewares */
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

/* Test Route */
app.get("/", (req, res) => {
  res.send("Server is Running! 🚀");
});

app.use(errorMiddleware);

/* Routes */
app.use("/api/category", authRoutes);

module.exports = app;
