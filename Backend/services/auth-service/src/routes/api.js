const express = require("express");
const router = express.Router();
const { register, login,getMyProfile,updateMyProfile } = require("../controllers/authController");

//middleware
const {checkRole,checkRoles,isAuthenticatedUser} = require("../middleware/verifyToken");
//validator
const {registerValidator,loginValidator,updateProfileValidator} = require("../validators/authValidator");
//auth
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/profile",isAuthenticatedUser,checkRoles("provider", "client"),getMyProfile);
router.put("/profile",isAuthenticatedUser,checkRoles("provider", "client"),updateProfileValidator,updateMyProfile);

module.exports = router;