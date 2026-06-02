import jwt from "jsonwebtoken"

export function updateuser(req, res) {
    const token = req.header.authorization
    console.log(token, 'token form update-user')

    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    console.log(payload)
    res.status(200).json({ message: "ok" })
}