import mongoose from "mongoose"
import { User } from "../../models/User.js"
import bcrypt from 'bcryptjs';
import { generateJwtToken } from "../utils/generateJwtToken.js";

export const signup = async (req, res) => {

    try {
        const { name, email, password, age, phone } = req.body

        // check if the eamildi is vlaid form valid-users collection
        const isValidUser = await mongoose.connection.collection(process.env.VALID_USERS_COLLECTION).findOne({ email })
        if (!isValidUser) {
            return res.status(400).json({ message: "This email is not registed in accio" })
        }
        console.log(isValidUser, "user is valid")

        // check if email is already exists
        const isUserAlreadyExists = await User.findOne({ email })

        console.log(isUserAlreadyExists, 'is user already exists')
        if (isUserAlreadyExists) {
            return res.status(400).json({ message: "user already exists" })
        }
        console.log("after if")

        //password hashing
        req.body.password = await bcrypt.hash(password, 10)

        //create a new document in colllection
        const newUser = await User.create(req.body)
        console.log(newUser, 'new user')
        res.status(201).json({ message: "user created", newUser })
        console.log("executed completely")
    } catch (err) {
        res.status(500).json({ message: err.message })
    }


}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: "email and password is requied" })

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user is not exists" })
        }

        //verify passwrod using bcrypt 
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        // generate jwt token
        const token = generateJwtToken({ email: user.email, id: user._id })

        const userDetails = { // trying to not give the password
            name: user.name,
            email: user.email,
            age: user.age || null,
            phone: user.phone
        }

        return res.status(200).json({ message: "loggin In", userDetails, token })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}