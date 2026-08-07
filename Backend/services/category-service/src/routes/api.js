const express = require("express");
const router = express.Router();
const {getCategories,getCategoryDetails,createCategory,updateCategory,deleteCategory,} = require("../controllers/categoryController");
//middleware
const {checkRole,checkRoles,isAuthenticatedUser} = require("../middleware/verifyToken");
//validator
const {createCategoryValidator,updateCategoryValidator,categoryIdValidator} = require("../validators/categoryValidator");
//auth
router.get("/categories",isAuthenticatedUser,checkRoles("admin", "provider", "client"),getCategories);
router.get("/categories/:id",isAuthenticatedUser,checkRoles("admin", "provider", "client"),categoryIdValidator, getCategoryDetails);
router.post("/categories",isAuthenticatedUser,checkRole("admin"),createCategoryValidator,createCategory);
router.put("/categories/:id",isAuthenticatedUser,checkRole("admin"),updateCategoryValidator,updateCategory);
router.delete("/categories/:id",isAuthenticatedUser,checkRole("admin"),categoryIdValidator,deleteCategory);

module.exports = router;