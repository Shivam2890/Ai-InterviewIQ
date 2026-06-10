import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../apis/interceptors.js'
import axios from 'axios'
import socket from '../interviewSocket.js'
import { data } from 'react-router-dom'
import { startListening, stopListening, textToSpeech } from '../utils/speech.js'

const Home = () => {
  const aiContentContainer = useRef()

  const aiResponse = "The Gemini API offers programmatic access to Google's powerful, multimodal Gemini AI models. Developers can integrate this advanced AI into applications to understand and generate text, images, audio, and video. Build intelligent features like smart chatbots, content creation tools, and insightful data analysis, leveraging Gemini's versatile capabilities across diverse inputs."
  const [userText, setUserText] = useState("")
  const [answer, setAnswer] = useState("")
  async function callAi(e) {
    e.preventDefault()
    if (!userText) {
      toast("ADD PROMPT TO AI", { theme: "dark" })
      return
    }

    try {
      // const response = await axios.post('http://localhost:4000/interview/liveInterview', { prompt: userText }
      //   , {
      //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      //   }
      // )
      const response = await api.post('/interview/liveInterview', {
        prompt: userText
      })
      console.log(response, response?.data?.data, 'ai response')
      aiContentContainer.current.innerText = response.data.data
    } catch (err) {
      console.log(err, 'error while calling api')
      toast.error(err.message)
    }

    console.log('calling ai', userText)
  }

  function firstMessage() {
    socket.emit('first-message', { data: 'lets start interview' })
  }

  function startInterview() {
    socket.emit('start-interview', { data: 'interview started' })
  }

  let interviewQue = ''

  useEffect(() => {
    socket.connect()

    socket.on('confirm-interview', (data) => {
      console.log(data, 'confirm interview')
      if (data.message) {
        textToSpeech(data.message)
      }
      console.log(data.message, 'message recieved form backend')
    })

    // socket.on('start-interview', (data) => {

    //   console.log(data, 'start-interview data')
    //   interviewQue = data
    // })

    return () => { //clean up 
      socket.off('confirm-interview')
      socket.disconnect()
    }
  }, [])
  // console.log(interviewQue, 'interveiwQUes')

  return (
    <div className='has-[900px]'>
      {/* <form className='flex justify-center gap-4 mt-4' onSubmit={callAi}>
        <textarea type='text' className='w-80 border shadow-2xl ' placeholder='Ask AI' value={userText} onChange={(e) => setUserText(e.target.value)} />
        <input type="submit" value='Submit' disabled={!userText.length ? true : false} className={`${!userText.length ? 'bg-blue-100' : 'bg-blue-200 cursor-pointer'} rounded text-white`} />
      </form>

      <div ref={aiContentContainer}>

      </div> */}

      <button onClick={firstMessage}>Frist Message</button>
      <br />
      <button>Confirsm message</button>
      <br />
      <button onClick={startInterview}>start-interview</button>

      <div>
        <p>{interviewQue}</p>
      </div>
      <br />
      <div>
        <button className='cursor-pointer' onClick={() => startListening(setAnswer)}>Listen</button>
        <br />

        <button className='cursor-pointer' onClick={stopListening}>Submit Answer</button>
      </div>

      <textarea onChange={(e) => setAnswer(e.target.value)} value={answer}></textarea>
    </div>
  )
}

export default Home