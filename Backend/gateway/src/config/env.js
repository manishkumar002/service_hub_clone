require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  AUTH_SERVICE: process.env.AUTH_SERVICE,
  CATEGORY_SERVICE: process.env.CATEGORY_SERVICE,
};
