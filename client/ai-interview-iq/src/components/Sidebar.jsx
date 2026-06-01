import React from 'react'
import { navItems } from '../utils/navItems'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  function logOut() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className='flex flex-col justify-between h-screen py-5 pl-2'>
      <div>
        <header>
          <h1>Ai-InterviewIQ</h1>
        </header>

        <nav className='mt-10'>
          <ul>
            {navItems.map((item) => {
              return <li key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            })}
          </ul>

        </nav>
      </div>

      <div>
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  )
}

export default Sidebar