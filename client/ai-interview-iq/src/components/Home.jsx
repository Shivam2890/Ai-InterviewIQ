import React, { use, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../apis/interceptors.js'
import axios from 'axios'
import socket from '../interviewSocket.js'
import { data, useAsyncError } from 'react-router-dom'
import { startListening, stopListening, textToSpeech } from '../utils/speech.js'
import aiIcon from '../assets/image.png';
import INTERVIEW_STAGE from '../constants.js'

const Home = () => {
  const aiContentContainer = useRef()

  const aiResponse = "The Gemini API offers programmatic access to Google's powerful, multimodal Gemini AI models. Developers can integrate this advanced AI into applications to understand and generate text, images, audio, and video. Build intelligent features like smart chatbots, content creation tools, and insightful data analysis, leveraging Gemini's versatile capabilities across diverse inputs."
  const [userText, setUserText] = useState("")
  const [answer, setAnswer] = useState("")
  const [userStopped, setUserStopped] = useState(false)
  const [question, setQuestion] = useState("")
  const [buttonText, setButtonText] = useState("Start")
  const [currentStage, setCurrentStage] = useState(INTERVIEW_STAGE.DID_NOT_ANSWER_YET)
  const [buttonColor, setButtonColor] = useState("bg-blue-400")
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)
  // const [startInterview, setStartInterview] = useState(false)

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


  function handleStartButton() {

    // if (!startInterview) {
    //   socket.emit('start-interview', { })
    //   setStartInterview(true)
    //   return
    // }
    if (currentStage == INTERVIEW_STAGE.DID_NOT_ANSWER_YET) {
      startListening(setAnswer)
      setButtonText("Stop")
      setCurrentStage(INTERVIEW_STAGE.ANSWERING)
      setButtonColor("bg-orange-400")
    }
    if (currentStage == INTERVIEW_STAGE.ANSWERING) {
      stopListening()
      setButtonText("Submit")
      setCurrentStage(INTERVIEW_STAGE.COMPLETED_ANSWERING)
      setButtonColor("bg-green-400")


    }
    if (currentStage == INTERVIEW_STAGE.COMPLETED_ANSWERING) {

      socket.emit('submit-answer', { answer })

      setButtonText("Start")
      setAnswer("")
      setCurrentStage(INTERVIEW_STAGE.DID_NOT_ANSWER_YET)
      setButtonColor("bg-blue-400")

      //
    }
  }

  function handleStartInterview() {
    try {
      socket.emit('start-interview', { message: "start interview console" })

      // setQuestion(data)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    socket.connect()

    socket.on('confirm-interview', (data) => {
      console.log(data, 'confirm interview')
      if (data.message) {
        textToSpeech(data.message, setIsAiSpeaking)
      }
      // console.log(data.message, 'message recieved form backend')
    })


    socket.on("ai-question", (data) => {
      console.log("response from ai", data?.question)
      // console.log(data.question,'ai response question')
      textToSpeech(data.question, setIsAiSpeaking)
      setQuestion(data.question)
    })

    socket.on('conversation-data', (data) => {
      console.log(data, 'formt the conversation data')
    })

    // socket.on('start-interview', (data) => {

    //   console.log(data, 'start-interview data')
    //   interviewQue = data
    // })

    return () => { //clean up 
      socket.off('confirm-interview')
      socket.off('ai-question')
      socket.disconnect()
    }
  }, [question])
  // console.log(interviewQue, 'interveiwQUes')

  return (

    <div className='absoute top-20.5 flex justify-center relative'>

      <div className='grid justify-items-center-safe gap-5'>
        <img src={aiIcon} alt="Could not found" className={`h-60 rounded-3xl ${isAiSpeaking ? 'opacity-100' : 'opacity-50'}`} />

        <h3 className='font-bold text-xl'>{question}</h3>
      </div>

      <div className="absolute top-75.5 flex gap-4">

        <button
          className={`text-white  ${buttonColor} w-40 h-14 mt-1 rounded cursor-pointer`}
          onClick={handleStartInterview} >Start Interview</button>
      </div>

      <div className="absolute top-100.5 flex gap-4">
        <textarea
          className='border w-190 rounded shadow-2xl'
          value={answer} onChange={(e) => setAnswer(e.target.value)}></textarea>
        <button
          className={`text-white  ${buttonColor} w-18 h-10 mt-1 rounded cursor-pointer`}
          onClick={handleStartButton} >{buttonText}</button>
      </div>

      <div className="absolute top-115.5 flex gap-4">
        <button
          className={`text-white bg-blue-400 w-24 h-9 mt-1 rounded cursor-pointer`}
          onClick={() => socket.emit('get-conversation', { data: 'everything thing is ok' })}
        >Show Result</button>
      </div>

    </div>
  )
}

export default Home