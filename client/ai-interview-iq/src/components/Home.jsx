import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../apis/interceptors.js'
import axios from 'axios'

const Home = () => {
  const aiContentContainer = useRef()
  const aiResponse = "The Gemini API offers programmatic access to Google's powerful, multimodal Gemini AI models. Developers can integrate this advanced AI into applications to understand and generate text, images, audio, and video. Build intelligent features like smart chatbots, content creation tools, and insightful data analysis, leveraging Gemini's versatile capabilities across diverse inputs."
  const [userText, setUserText] = useState("")

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
      console.log(err, 'erroe while calling api')
      toast.error(err.message)
    }

    console.log('calling ai', userText)
  }



  return (
    <div className='has-[900px]'>
      <form className='flex justify-center gap-4 mt-4' onSubmit={callAi}>
        <textarea type='text' className='w-80 border shadow-2xl ' placeholder='Ask AI' value={userText} onChange={(e) => setUserText(e.target.value)} />
        <input type="submit" value='Submit' disabled={!userText.length ? true : false} className={`${!userText.length ? 'bg-blue-100' : 'bg-blue-200 cursor-pointer'} rounded text-white`} />
      </form>

      <div ref={aiContentContainer}>

      </div>
    </div>
  )
}

export default Home