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
        type: mongoose.ObjectId,
        ref: 'categories',
        required: true
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'users',
        required: true
    },
}, { timestamps: true });

export default mongoose.model("expenses", expenseSchema);