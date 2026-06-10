import React from 'react'
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import ProtectedLayout from './components/ProtectedLayout';
import AuthProtectedRoute from './components/AuthProtectedRoute';
import FallBackComponents from './components/FallBackComponents';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import Newinterview from './pages/Newinterview';
import History from './pages/History';

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

          <Route element={<Layout />}>

            <Route element={<ProtectedLayout />}>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
            </Route>

            <Route element={<AuthProtectedRoute />}>
              {/* <Route element={<Sidebar />}> */} // this is comment , another approch
              <Route path='*' element={<FallBackComponents />} />
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/new-interview' element={<Newinterview />} />
              <Route path='/history' element={<History />} />
            </Route>
            </Route>

          {/* </Route> */}



        </Routes>
      </BrowserRouter>
    </>
  )
}

function Layout() {
  const location = useLocation()
  const isBarHidden = location.pathname == '/login' || location.pathname == 'signup'

  return (
    <div className='h-screen flex' >
      {
        !isBarHidden && <div className='border w-46'>
          <Sidebar />
        </div>
      }

      <div className='w-full  overflow-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default App