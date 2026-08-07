require("dotenv").config({ path: ".env" });

const http = require("http");
const app = require("./src/app");
const { PORT, AUTH_SERVICE } = require("./src/config/env");

console.log("AUTH_SERVICE =", AUTH_SERVICE);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Gateway running at http://localhost:${PORT}`);
});
