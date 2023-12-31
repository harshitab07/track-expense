import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Layout from '../components/layout/layout';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
        const { data } = await axios.post(`/api/v1/expense/get-expenses`);
        if (data?.success) {
            setProducts(data.data);
        } else {
            toast.error(data?.message);
        }
    } catch (error) {
        console.log('Failed to retrieve all expenses', { error });
        toast.error('Cannot retrieve expenses at this moment!');
    }
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

  return (
    <Layout title='Home : My-Expense-Tracker'>
      <ToastContainer />
    </Layout>
  )
}

export default Home
