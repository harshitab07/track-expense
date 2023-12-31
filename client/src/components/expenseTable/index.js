import React, { useState, useEffect } from 'react';
import './style.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const ExpenseTable = ({ expenses = [], getAllExpenses }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    // Filter expenses based on the current month and year
    const filtered = expenses?.filter(expense => {
      const date = new Date(expense?.date);
      return date?.getMonth() + 1 === currentMonth && date?.getFullYear() === currentYear;
    });
    setFilteredExpenses(filtered);
  }, [currentMonth, currentYear, expenses]);

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 1 ? 12 : prevMonth - 1));
    setCurrentYear(prevYear => (currentMonth === 1 ? prevYear - 1 : prevYear));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 12 ? 1 : prevMonth + 1));
    setCurrentYear(prevYear => (currentMonth === 12 ? prevYear + 1 : prevYear));
  };

  const handleDeleteExpense = async (id) => {
    try {
        await axios.post(`/api/v1/expense/delete-expense/${id}`);
        getAllExpenses();
    } catch (error) {
        console.log("Error in deleting expense", { error });
        toast.error("Something went wrong in deleting expense!");
    }
  }

  return (
    <div className='expense-table-overlay'>
      <h3>Expense for Month {currentMonth}/{currentYear}</h3>
      <div className='btn-group'>
      <button className='btn btn-light' onClick={handlePreviousMonth}>Previous Month</button>
      <button className='btn btn-dark' onClick={handleNextMonth}>Next Month</button>
      </div>
      <table className='table table-striped expense-table'>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Category</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses?.map(expense => (
            <tr key={expense?._id}>
              <td>{expense?.name}</td>
              <td>{expense?.amount}</td>
              <td>{expense?.date}</td>
              <td>{expense?.category}</td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
