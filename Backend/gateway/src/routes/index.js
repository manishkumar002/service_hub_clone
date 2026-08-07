const router = require("express").Router();

const authProxy = require("../proxy/auth.proxy");
const categoryProxy = require("../proxy/category.proxy");

router.use("/auth", authProxy);
router.use("/category", categoryProxy);

module.exports = router;
