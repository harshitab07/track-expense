import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Layout from '../components/layout/layout';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import AddCategory from '../components/addCategory';
import AddExpense from '../components/addExpense';
import { mapExpense } from '../data/expense';
import ExpenseTable from '../components/expenseTable';
import '../styles/home.css';

const Home = () => {
  const [expenses, setExpenses] = useState(mapExpense([]));
  const [tableData, setTableData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [showExpense, setShowExpense] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-categories');

      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log("Error in getting categories", { error });
      toast.error("Something went wrong in getting category!");
    }
  };

  const getAllExpenses = async () => {
    try {
        const { data } = await axios.post(`/api/v1/expense/get-expenses`, { email: auth?.user?.email });
        if (data?.success) {
            setExpenses(mapExpense(data.expenses));
            setTableData(data.expenses)
        } else {
            toast.error(data?.message);
        }
    } catch (error) {
        console.log('Failed to retrieve all expenses', { error });
        toast.error('Cannot retrieve expenses at this moment!');
    }
}

const handleAddCategory = async () => {
  try {
    const { data } = await axios.post('/api/v1/category/add-category', { name: newCategory });

    if (data?.success) {
      setCategories(data.categories);
      toast.success("Category added successfully");
      getAllCategories();
    }
  } catch (error) {
    console.log("Error in adding category", { error });
    toast.error("Something went wrong in adding category!");
  }
  setShowCategory(false);
}

const handleAddExpense = async () => {
  try {
    const { data } = await axios.post('/api/v1/expense/add-expense', { name: title, category, amount, date, email: auth?.user?.email });

    if (data?.success) {
      setCategories(data.categories);
      toast.success("Expense added successfully");
      getAllExpenses();
    }
  } catch (error) {
    console.log("Error in adding expense", { error });
    toast.error("Something went wrong in adding expense!");
  }
  setShowExpense(false);
}

useEffect(() => {
  if (auth?.token) {
    getAllExpenses();
    getAllCategories();
  } else {
    navigate('/login');
  } 
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
console.log(expenses)
  return (
    <Layout title='Home : My-Expense-Tracker'>
      <ToastContainer />
      <div className='add-buttons'>
      <button className='btn btn-primary' onClick={() => setShowCategory(true)}>Add Category</button>
      {showCategory && <AddCategory closeCategory={() => setShowCategory(false)} addCategory={handleAddCategory} category={newCategory} setCategory={setNewCategory} />}
      <button className='btn btn-primary' onClick={() => setShowExpense(true)}>Add Expense</button>
      {showExpense && <AddExpense closeExpense={() => setShowExpense(false)} addExpense={handleAddExpense}  title={title} setTitle={setTitle} category={category} setCategory={setCategory} amount={amount} setAmount={setAmount} data={date} setDate={setDate} />}
      </div>
      <div className='container d-flex expense-cards'>
        <div className='monthly'>
          <h4>Monthly Expense</h4>
          <h5>{expenses?.month?.total || 0}</h5>
          <h6>Category Wise Expense</h6>
          <table className='table'>
          <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(expenses?.month?.categoryWise).map(([category, amount]) => (
            <tr key={category}>
              <td>{category}</td>
              <td>{amount}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
        <div className='yearly'>
          <h4>Yearly Expense</h4>
          <h5>{expenses?.year?.total || 0}</h5>
          <h6>Category Wise Expense</h6>
          <table className='table'>
          <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(expenses?.year?.categoryWise).map(([category, amount]) => (
            <tr key={category}>
              <td>{category}</td>
              <td>{amount}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
      </div>
      <ExpenseTable expenses={tableData} getAllExpenses={getAllExpenses} />
    </Layout>
  )
}

export default Home
