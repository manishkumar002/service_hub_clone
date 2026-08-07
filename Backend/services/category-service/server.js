// require("dotenv").config({ path: ".env" });
// const http = require("http");
// const app = require("./src/app");
// const connectDB = require("./src/config/db");
// const PORT = process.env.PORT || 8081;

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", err.message);
//   process.exit(1);
// });

// connectDB();

// const server = http.createServer(app);

// server.listen(PORT, () => {
//   console.log(`Hi Manish, your server is running at http://localhost:${PORT}`);
// });

// process.on("unhandledRejection", (err) => {
//   console.error("Unhandled Rejection:", err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

require("dotenv").config({ path: ".env" });

const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const redisClient = require("./src/config/redis");

const PORT = process.env.PORT || 8081;

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

async function startServer() {
  try {
    // MongoDB Connect
    await connectDB();

    // Redis Connect
    await redisClient.connect();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err.message);

      server.close(async () => {
        await redisClient.quit();
        process.exit(1);
      });
    });
  } catch (error) {
    console.error("Server Startup Error:", error);
    process.exit(1);
  }
}

startServer();
