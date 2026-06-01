import React from 'react'
import { Sparkles, BrainCircuit, Mic, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#050507] text-white overflow-hidden relative'>

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

      <div className='absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-3xl' />

      {/* CONTENT */}
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center'>

        {/* BADGE */}
        <div
          className='
            mb-6 flex items-center gap-2 rounded-full
            border border-indigo-500/20
            bg-indigo-500/10
            px-5 py-2
            backdrop-blur-xl
          '
        >
          <Sparkles size={16} className='text-indigo-400' />

          <span className='text-sm tracking-wide text-indigo-300'>
            AI Powered Mock Interviews
          </span>
        </div>

        {/* HEADING */}
        <h1
          className='
            max-w-5xl text-5xl font-black leading-tight
            md:text-7xl
          '
        >
          Crack Your Next
          <br />

          <span
            className='
              bg-gradient-to-r
              from-indigo-400
              via-purple-400
              to-pink-400
              bg-clip-text
              text-transparent
            '
          >
            AI Interview
          </span>
        </h1>

        {/* SUBTEXT */}
        <p
          className='
            mt-6 max-w-2xl text-lg leading-relaxed
            text-slate-400
          '
        >
          Practice real interview questions with our advanced AI interviewer.
          Get instant feedback, confidence analysis, and improve your chances
          of landing your dream job.
        </p>

        {/* STATS */}
        <div className='mt-10 flex flex-wrap items-center justify-center gap-5'>

          <div
            className='
              rounded-2xl border border-white/10
              bg-white/5 px-6 py-4 backdrop-blur-xl
            '
          >
            <h2 className='text-3xl font-black text-indigo-400'>
              10K+
            </h2>

            <p className='mt-1 text-sm text-slate-400'>
              Interviews Taken
            </p>
          </div>

          <div
            className='
              rounded-2xl border border-white/10
              bg-white/5 px-6 py-4 backdrop-blur-xl
            '
          >
            <h2 className='text-3xl font-black text-purple-400'>
              95%
            </h2>

            <p className='mt-1 text-sm text-slate-400'>
              Success Improvement
            </p>
          </div>

          <div
            className='
              rounded-2xl border border-white/10
              bg-white/5 px-6 py-4 backdrop-blur-xl
            '
          >
            <h2 className='text-3xl font-black text-pink-400'>
              AI
            </h2>

            <p className='mt-1 text-sm text-slate-400'>
              Real-time Feedback
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className='mt-12 flex flex-wrap items-center justify-center gap-4'>

          {/* START INTERVIEW */}
          <button
            onClick={() => navigate('/interview')}
            className='
              group flex items-center gap-3
              rounded-2xl
              bg-gradient-to-r from-indigo-600 to-purple-600
              px-8 py-4
              text-lg font-bold
              transition-all duration-200
              hover:scale-105
              hover:shadow-[0_10px_40px_rgba(99,102,241,0.35)]
            '
          >
            <Mic size={22} />

            Start AI Interview

            <ArrowRight
              size={20}
              className='transition-transform group-hover:translate-x-1'
            />
          </button>

          {/* LEARN MORE */}
          <button
            className='
              flex items-center gap-2
              rounded-2xl border border-white/10
              bg-white/5 px-8 py-4
              text-lg font-semibold
              backdrop-blur-xl
              transition-all duration-200
              hover:bg-white/10
            '
          >
            <BrainCircuit size={22} />

            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home