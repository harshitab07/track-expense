import express from "express";
import expenseModel from "../models/expenseModel.js";
import Response from "../utils/response.js";

export const addExpenseController = async (req, res) => {
  try {
    console.log('API call addExpenseController', { body: req?.body });
    const { name, amount, date, category, email } = req.body;

    // validation
    if (!name || !amount || !date || !category || !email) {
      return res.send({
        success: false,
        message: "Expense information is incomplete",
      });
    }

    // save expense
    const newExpense = await new expenseModel({
      name, user: email, date, amount, category
    }).save();

    console.log('Success in API call addExpenseController', { body: req?.body });
    return res.status(200).send({
      success: true,
      message: "Expense added successfully!",
      newExpense,
    });
  } catch (err) {
    console.log('Failure in call addExpenseController', { body: req?.body });
    res.status(500).send({
      success: false,
      message: "Error in adding expense",
      error: err?.message || err
    });
  }
};

export const deleteExpenseController = async (req, res) => {
    try {
        console.log('API call addExpenseController', { body: req?.body });
        const { id: _id } = req.params;
        await expenseModel.findByIdAndDelete(_id);

        console.log('Success in addExpenseController', { body: req?.body });
        return Response(res, 200, "Expense deleted successfully!");
      } catch (error) {
        console.log('Failure in addExpenseController', { body: req?.body });
        return Response(res, 500, "Failed to delete expense", null, error?.message || error );
      }
};

export const editExpenseController = async (req, res) => {
    try {
        console.log('API call editExpenseController', { body: req?.body });
        const { id: _id } = req.params;
        const { name, amount, email, date, category } = req.body;

        const expense = await expenseModel.findByIdAndUpdate( _id, { name, amount, user: email, date, category }, { new: true } );

        console.log('Success in editExpenseController', { body: req?.body });
        return Response(res, 200, "Expense deleted successfully!", expense);
      } catch (error) {
        console.log('Failure in editExpenseController', { body: req?.body });
        return Response(res, 500, "Failed to edit expense", null, error?.message || error );
      }
};

const router = express.Router();

router.post("/add-expense", addExpenseController);
router.post("/remove-expense/:id", deleteExpenseController);
router.post('/edit-expense/:id', editExpenseController);

export default router;
