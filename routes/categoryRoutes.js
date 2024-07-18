import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import { categoryControlller, categoryPhotoController, createCategoryController, deleteCategoryCOntroller, singleCategoryController, updateCategoryController } from "./../controllers/categoryController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  formidable(),
  createCategoryController
);

//get photo 
router.get("/category-photo/:cid", categoryPhotoController);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryCOntroller
  );

export default router;
