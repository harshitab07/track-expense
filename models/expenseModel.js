import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("expenses", expenseSchema);