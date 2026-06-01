import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import ProtectedLayout from './components/ProtectedLayout';
import AuthProtectedRoute from './components/AuthProtectedRoute';
import FallBackComponents from './components/FallBackComponents';
import Sidebar from './components/Sidebar';

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
          <Route element={<ProtectedLayout />}>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Route>

          <Route element={<AuthProtectedRoute />}>
            <Route element={<Sidebar />}>
              <Route path='/' element={<Home />} />
              <Route path='*' element={<FallBackComponents />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App