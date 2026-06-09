import { toast } from "react-toastify"

function textToSpeech(text) {
    if (!text) {
        toast('text is not provided to speak')
    }
    const speechSynthesis = window.speechSynthesis

    if (!speechSynthesis) {
        toast('Browser not supporting speech, Please enable speaker from browser')
        return
    }
    // if any text is being spoken currently cancel it and start an new speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    // console.log(utterance, 'uttereance')
    speechSynthesis.speak(utterance)
}
let recognition = null
function startListening() {
    //check if browser support speech recoginition
    console.log("entere")
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

    console.log(recognition,'recognition')

    //execute whenever spoke
    recognition.onresult = (data) => {
        console.log(data, 'data from on result event')
    }
    //start listning
    recognition.start()
}
export { textToSpeech, startListening }