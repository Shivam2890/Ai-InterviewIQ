import React from 'react'
import {
  LayoutDashboard,
  Mic,
  FileText,
  History,
  Settings,
  LogOut,
  BrainCircuit,
} from 'lucide-react'

import { NavLink, Outlet } from 'react-router-dom'

function Sidebar() {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/',
    },
    {
      title: 'AI Interviews',
      icon: <Mic size={20} />,
      path: '/interviews',
    },
    {
      title: 'Resume Review',
      icon: <FileText size={20} />,
      path: '/resume',
    },
    {
      title: 'Interview History',
      icon: <History size={20} />,
      path: '/history',
    },
    {
      title: 'Settings',
      icon: <Settings size={20} />,
      path: '/settings',
    },
  ]

  return (
    <div className='flex h-screen bg-[#050507] text-white overflow-hidden'>

      {/* SIDEBAR */}
      <aside
        className='
          w-72 shrink-0
          border-r border-white/10
          bg-[#0b0b11]
          flex flex-col
          justify-between
          px-5 py-6
        '
      >

        {/* TOP SECTION */}
        <div>

          {/* LOGO */}
          <div className='mb-10 flex items-center gap-3'>

            <div
              className='
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-indigo-500 to-purple-600
                shadow-lg shadow-indigo-500/20
              '
            >
              <BrainCircuit size={26} />
            </div>

            <div>
              <h1
                className='
                  text-xl font-black tracking-wide
                  bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
                  bg-clip-text text-transparent
                '
              >
                AI Interview
              </h1>

              <p className='text-xs text-slate-500'>
                Smart Practice Platform
              </p>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className='space-y-2'>

            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `
                  group flex items-center gap-3
                  rounded-2xl px-4 py-3
                  transition-all duration-200

                  ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }
                `
                }
              >
                <div className='transition-transform group-hover:scale-110'>
                  {item.icon}
                </div>

                <span className='text-sm font-medium tracking-wide'>
                  {item.title}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* BOTTOM SECTION */}
        <div>

          {/* USER CARD */}
          <div
            className='
              mb-4 rounded-2xl
              border border-white/10
              bg-white/5
              p-4
              backdrop-blur-xl
            '
          >
            <div className='flex items-center gap-3'>

              <div
                className='
                  flex h-12 w-12 items-center justify-center
                  rounded-full
                  bg-gradient-to-r from-indigo-500 to-purple-600
                  text-lg font-bold
                '
              >
                J
              </div>

              <div>
                <h3 className='text-sm font-semibold'>
                  John Doe
                </h3>

                <p className='text-xs text-slate-400'>
                  AI Candidate
                </p>
              </div>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            className='
              flex w-full items-center justify-center gap-2
              rounded-2xl
              border border-red-500/20
              bg-red-500/10
              py-3
              text-sm font-semibold text-red-400
              transition-all duration-200
              hover:bg-red-500/20
            '
          >
            <LogOut size={18} />

            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className='flex-1 overflow-y-auto p-6'>
        <Outlet />
      </main>
    </div>
  )
}

export default Sidebar