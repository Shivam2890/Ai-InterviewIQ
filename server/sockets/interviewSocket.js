import { askAI, getFeedbackFromAI } from '../controllers/auth/interview.js';
import { endInterviewSystemPrompt, startInterviewSystempPrompt } from '../controllers/utils/prompt.js';
const interviewSession = new Map()


function interviewSocket(socket) {
    // socket.on("first-message", (data) => {
    //     console.log('first message received', data)

    //     socket.emit('confirm-interview', { message: 'first message recieved good to start interview' })
    // })
    // socket.emit('start-interview', { message: 'interview question no 1' })

    // socket.on("disconnect", (data) => {
    //     console.log("socket connection closed")
    // })

    const userId = socket.userId

    socket.on(
        "start-interview",
        async ({
            stack = "MERN",
            difficultyLevel = "fresher"
        }) => {
            try {

                console.log("interview started")
                const session = {
                    userId,
                    stack,
                    difficultyLevel,
                    // startedAt,
                    startedAt : new Date(),
                    conversation: [
                        {
                            role: 'system',
                            content: startInterviewSystempPrompt(stack, difficultyLevel)
                        }
                    ]
                }

                // Store conversation with socket id (to identify unique clients sockets)
                interviewSession.set(socket.id, session)
                //generate first question
                const firstQuestion = await askAI({ message: session.conversation })

                //testing dummy quesition
                // const firstQuestion = `Welcome to interview, tell the difference between array and object`
                //save ai question
                session.conversation.push({
                    role: 'assistant',
                    content: firstQuestion
                })

                socket.emit(
                    "ai-question",
                    {
                        question: firstQuestion
                    }
                )
            } catch (err) {
                console.log(err, 'error while calling ai')
                socket.emit("error", {
                    message: err.message
                })
            }
        }
    )

    //user answer
    socket.on(
        'submit-answer',
        async ({ answer }) => {
            console.log(answer, 'answer formt he submit answer server side')
            try {
                const session = interviewSession.get(socket.id)
                if (!session) {
                    return
                }
                //save user answer for maintaining history of conversation
                session.conversation.push({
                    role: 'user',
                    content: answer
                })

                //ask next question
                const nextQuestion = await askAI({ message: session.conversation })

                //testing dummy nextQuestion 
                // const nextQuestion = "how to loop through both arrays and objects"
                //save ai question
                session.conversation.push({
                    role: 'assistant',
                    content: nextQuestion
                })
                socket.emit(
                    "ai-question",
                    {
                        question: nextQuestion
                    }
                )
            } catch (err) {
                console.log(err)
                socket.emit('err', { message: err.message })
            }
        }
    )

    //view consversation
    // useful for debugging
    socket.on(
        "get-conversation",
        () => {
            console.log('its started')
            const session = interviewSession.get(socket.id)
            socket.emit(
                'conversation-data',
                session?.conversation || []
            )
        }
    )

    //End Interview 
    socket.on(
        "end-interview",
        async () => {
            const session = interviewSessions.get(socket.id)

            // {technicalScore : 8, communicationScore : 2, strongAreas : ["react","react-router","react-practical"], weakAreas : ["DSA","JS fundamentals","Constructor function"], roadMap : "Should practice more on DSA part for week 1 ...."}

            // Before ending the interview get a feedback, get total score out of 10, get score for communication out of 5 and return an array for strong areas and weak areas also generate a week road map
            const lastConversation = {
                role: "system",
                content: endInterviewSystemPrompt()
            };
            session.endedAt = new Date()

            // Add last conversation into session.conversation
            session.conversation.push(lastConversation)

            // const feedback = await askAI({ message: session.conversation })
            // Ask ai to get complete feedback in json format
            const feedback = await getFeedbackFromAI({ message: session.conversation })



            if (feedback) {
                // Call api to store interview details in database
                await addInterview(feedback)
            }

            interviewSessions.delete(
                socket.id
            )
        }
    )

    //disconnect
    socket.on(
        "disconnect",
        () => {
            interviewSession.delete(socket.id)
            console.log("Disconnected:", socket.id)
        }
    )
}

function addInterview(){
    
}


export default interviewSocket