import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './pages/auth/Forgot';

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='*' element={<Error />} />
    </Routes>
    </>
  );
}

export default App;
