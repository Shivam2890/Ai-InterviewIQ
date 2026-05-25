import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer
        // position="top-right"
        // autoClose={5000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick={false}
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme="light"
      // transition={Bounce}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App