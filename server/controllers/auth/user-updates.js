import jwt from "jsonwebtoken"
import { User } from "../../models/User.js"

export async function updateuser(req, res) {

    const userId = req.user.id
    const body = req.body

    try {
        //exclue the password and email
        if (body.password) {
            delete body.password
        }
        if (body.email) {
            delete body.email
        }
        // option object- new:true - give updated data,
        // runValidators: true , checking validation from the schema
        const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true, runValidators: true }).select('-password') // select in mongoose which include and exclude the data to the user

        if (!updatedUser) {
            return res.status(404).json({ message: "user not found" })
        }
        res.status(201).json({ message: "user updated", updatedUser })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}