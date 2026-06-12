import { toast } from "react-toastify"

function textToSpeech(text, setIsAiSpeaking) {
    // console.log("enter text to speech")
    if (!text) {
        toast('text is not provided to speak')
    }
    const speechSynthesis = window.speechSynthesis
    1
    if (!speechSynthesis) {
        toast('Browser not supporting speech, Please enable speaker from browser')
        return
    }
    // if any text is being spoken currently cancel it and start an new speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onstart = () => {
        setIsAiSpeaking(true)
    }
    utterance.onend = () => {
        setIsAiSpeaking(false)
    }
    // console.log(utterance, 'uttereance')
    speechSynthesis.speak(utterance)

}
let recognition = null
function startListening(onTranscript) {
    //check if browser support speech recoginition
    const speechRecognition = window.SpeechRecognition || window.WebKitSpeechRecongnition;
    if (!speechRecognition) {
        toast('your browser doesnt suppoest speech')
        return
    }
    //create a new instane for speech recoginition
    recognition = new speechRecognition()

    recognition.lang = "en-US"

    recognition.continuous = true
    //returning text partially , whenever you are listening
    /*
        this
        this is 
        this is my
        this is my answer
    */
    recognition.interimResults = true


    //execute whenever spoke
    recognition.onresult = (data) => {

        // console.log(data, 'data from on result event')

        let transcript = ""
        for (let i = 0; i < data.results.length; i++) {
            transcript += data.results[i][0].transcript
        }
        // console.log(transcript, 'transcipt')
        onTranscript(transcript)
    }
    //start listning
    recognition.start()
}

function stopListening() {
    if (recognition) {
        recognition.stop()
    }
}
export { textToSpeech, startListening, stopListening }