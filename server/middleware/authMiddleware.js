import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.header.authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: 'token not provided' })
    }

    try {
        const userPayload = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        // verify methond return payload {id:someId , email}
        console.log(userPayload, 'payload returned from verify')

        // req updated and goes into the next callback 
        req.user = userPayload
        next()
    } catch (err) {

        // 3 type of error can we happen 
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" })
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: 'Invalid token' })
        }
        res.status(500).json({ message: "internal error" })
    }
}