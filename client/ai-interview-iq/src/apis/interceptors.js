import axios from "axios";
import { toast } from "react-toastify";


// axios instances and tag token to the headers
const api = axios.create({baseURL : 'http://localhost:4000'})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    console.log(token, "here it comes")

    if (token) {
        // redirectToSignup()
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},
    // handle err
    (err) => {
        return Promise.reject(err)
    }
)

// function redirectToSignup() {

//     // we can also navigate throught the window object -- window.location.href(url)
//     navigate('/signup')
//     localStorage.clear()
// }

api.interceptors.response.use((config) => {
    return config
}, (err) => {
    console.log(err.status, err.response.data.message)
    const errMessage = err?.response?.data?.message
    if (err.status == 401 && (errMessage == 'Invalid token' || errMessage == 'Token expired')) {
        localStorage.clear()
        window.location.href = 'http//localhost:5173/signup'
        toast.error(errMessage)
        return
    }

    return Promise.reject(err)
})

export { api }