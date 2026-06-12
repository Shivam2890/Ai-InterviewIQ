import { askAI } from '../controllers/auth/interview.js';
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

    socket.on(
        "start-interview",
        async ({
            stack = "MERN",
            experience = "fresher"
        }) => {
            try {

                console.log("interview started")
                const session = {
                    stack,
                    experience,
                    conversation: [
                        {
                            role: 'system',
                            content: `
                            You are a Senior Technial Interview.
                            Candidate Stack: ${stack},
                            Experience: ${experience},
                            Rules:
                            1. Ask only one question.
2. Ask follow-up questions.
3. Challenge weak answers, or ask follow up question if answer is not 100% correct
4. Increase difficulty gradually.
5. Never provide solutions.`
                        }
                    ]
                }

                // Store conversation with socket id (to identify unique clients sockets)
                interviewSession.set(
                    socket.id,
                    session
                )
                //generate first question
                const firstQuestion = await askAI(
                    { message: session.conversation }
                )

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
                content: `
You are a Senior Technical Interviewer.

Analyze the FULL interview transcript provided by the user.

Return ONLY valid JSON.
Do not include markdown.
Do not include explanations.
Do not wrap in backticks.

Scoring Rules:
- technicalScore: integer between 0 and 10
- communicationScore: integer between 0 and 5
- strongAreas: comma separated string
- weakAreas: comma separated string
- feedback: detailed 4-8 sentence evaluation

Output JSON Schema:

{
  "technicalScore": 0,
  "communicationScore": 0,
  "strongAreas": "",
  "weakAreas": "",
  "feedback": ""
}

Evaluation Criteria:

Technical Score:
- JavaScript fundamentals
- React concepts
- React practical implementation
- Problem solving
- DSA knowledge
- API handling
- System design (if discussed)

Communication Score:
- Clarity
- Confidence
- Structured answers
- English fluency
- Ability to explain reasoning

Feedback Rules:
- Mention strengths.
- Mention weak areas.
- Mention interview performance.
- Give practical improvement suggestions.
- Keep feedback professional and actionable.

Return ONLY JSON.
`
            };

            // Add last conversation into session.conversation
            session.conversation.push(lastConversation)

            // Ask ai to get complete feedback in json format
            const feedback = await askAI({ message: session.conversation })

            if (feedback) {
                // Call api to store interview details in database
                await addInterview(feedback)
            }

            console.log(
                "Final Conversation:"
            )

            console.log(
                session?.conversation
            )

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
export default interviewSocket