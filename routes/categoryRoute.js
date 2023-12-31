import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import categoryModel from "../models/categoryModel.js";

export const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find();
    res.json(category);
 } catch (error) {
     return res.status(500).send({
         status: false,
         message: 'Failed to get all categories',
         error
     })
 }
}

export const addCategoryController = async (req, res) => {
  try {
    console.log('API call addCategoryController', { body: req?.body });
    const { name } = req.body;

    // validation
    if (!name ) {
      return res.send({
        success: false,
        message: "Category information is incomplete",
      });
    }

    // save expense
    const newCategory = await new categoryModel({
      name
    }).save();

    console.log('Success in API call addCategoryController', { body: req?.body });
    return res.status(200).send({
      success: true,
      message: "Category added successfully!",
      newCategory,
    });
  } catch (err) {
    console.log('Failure in call addCategoryController', { body: req?.body });
    res.status(500).send({
      success: false,
      message: "Error in adding category",
      error: err?.message || err
    });
  }
};

const router = express.Router();

router.post("/get-categories", requireSignIn ,getCategoryController);
router.post("/add-category", addCategoryController);

export default router;
