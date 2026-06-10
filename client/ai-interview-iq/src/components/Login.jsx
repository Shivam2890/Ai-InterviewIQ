import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const login = async (e) => {
    e.preventDefault()
    try {
      const data = await axios.post('http://localhost:4000/auth/login', userCredentials)
      console.log(data, 'this is data')
      localStorage.setItem('token', data.data.token)

      localStorage.setItem('user', JSON.stringify(data.data.userDetails))
      navigate('/')
    } catch (err) {
      console.log(err, err.message)
      toast.error(err?.response?.data?.message)
    }
  }

  return (
  <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-6 py-10'>

    {/* GRID BACKGROUND */}
    <div
      className='absolute inset-0 opacity-20'
      style={{
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)
        `,
        backgroundSize: '45px 45px',
      }}
    />

    {/* GLOW EFFECTS */}
    <div className='absolute top-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl' />

    <div className='absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl' />

    {/* LOGIN CARD */}
    <div
      className='
        relative z-10 w-full max-w-md
        rounded-3xl border border-white/10
        bg-[#0c0c12]/80
        p-8
        backdrop-blur-2xl
      '
    >

      {/* LOGO */}
      <div className='mb-8 text-center'>

        <div
          className='
            mx-auto mb-4 flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-3xl font-black text-white
            shadow-lg shadow-indigo-500/30
          '
        >
          AI
        </div>

        <h1
          className='
            text-4xl font-black
            bg-gradient-to-r
            from-indigo-400 via-purple-400 to-pink-400
            bg-clip-text text-transparent
          '
        >
          Welcome Back
        </h1>

        <p className='mt-2 text-sm text-slate-500'>
          Login to continue your AI interview journey
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={login} className='space-y-5'>

        {/* EMAIL */}
        <div>
          <label
            htmlFor='email'
            className='mb-2 block text-sm font-medium text-slate-300'
          >
            Email Address
          </label>

          <input
            type='email'
            name='email'
            required
            id='email'
            value={userCredentials.email}
            onChange={handleChange}
            placeholder='john@example.com'
            className='
              w-full rounded-2xl
              border border-white/10
              bg-white/5
              px-4 py-3
              text-sm text-white
              outline-none
              backdrop-blur-xl
              transition-all duration-200
              placeholder:text-slate-500
              focus:border-indigo-500
              focus:ring-4 focus:ring-indigo-500/10
            '
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor='password'
            className='mb-2 block text-sm font-medium text-slate-300'
          >
            Password
          </label>

          <input
            type='password'
            name='password'
            required
            id='password'
            value={userCredentials.password}
            onChange={handleChange}
            placeholder='••••••••'
            className='
              w-full rounded-2xl
              border border-white/10
              bg-white/5
              px-4 py-3
              text-sm text-white
              outline-none
              backdrop-blur-xl
              transition-all duration-200
              placeholder:text-slate-500
              focus:border-indigo-500
              focus:ring-4 focus:ring-indigo-500/10
            '
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div className='flex justify-end'>
          <button
            type='button'
            className='text-sm text-indigo-400 transition hover:text-indigo-300'
          >
            Forgot Password?
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type='submit'
          id='submit'
          className='
            w-full rounded-2xl
            bg-gradient-to-r from-indigo-600 to-purple-600
            py-3
            text-sm font-bold tracking-wide text-white
            transition-all duration-200
            hover:scale-[1.02]
            hover:shadow-[0_10px_40px_rgba(99,102,241,0.35)]
          '
          value='Submit'
        >
          Login to AI Interview
        </button>
      </form>

      {/* FOOTER */}
      <p className='mt-6 text-center text-sm text-slate-500'>
        Don&apos;t have an account?

        <button
          type='button'
          onClick={() => navigate('/signup')}
          className='ml-2 text-indigo-400 transition hover:text-indigo-300'
        >
          Create Account
        </button>
      </p>
    </div>
  </div>
)
}

export default Login