import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db.js';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import expenseRoutes from './routes/expenseRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import path from 'path';
import morgan from 'morgan';

// rest obj
const app = express();

// config env
dotenv.config();

// config db
connectDb();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')));

app.use('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Angular Login/Signup  Page</h1>`);
} );

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/category', categoryRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on mode at port ${port}.`);
})