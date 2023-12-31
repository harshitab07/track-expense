import express from "express";
import categoryModel from "../models/categoryModel.js";

export const getCategoryController = async (req, res) => {
  try {
    console.log('API call getCategoryController');
    const categories = await categoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "Categories received successfully!",
      categories
    });
 } catch (error) {
    console.log('Failure in API call getCategoryController');
     return res.status(500).send({
         success: false,
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
    await new categoryModel({
      name
    }).save();

    console.log('Success in API call addCategoryController', { body: req?.body });
    return res.status(200).send({
      success: true,
      message: "Category added successfully!",
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

router.get("/get-categories", getCategoryController);
router.post("/add-category", addCategoryController);

export default router;
