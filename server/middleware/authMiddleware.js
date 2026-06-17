import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {

    console.log("atuh calling")

    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'token is undefined' })
    }


    const token = req.headers.authorization.split(" ")[1]
    console.log(token,'token in auth')

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
        if (err.name == 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" })
        }
        if (err.name == "JsonWebTokenError") {
            return res.status(401).json({ message: 'Invalid token' })
        }
        res.status(500).json({ message: "internal error" })
    }
}

function ioMiddlewareToken(socket, next) {
    const token = socket.handshake.auth.token

    console.log(socket.handshake,'token')
    if (!token) {
        socket.emit('auth', { message: 'Token not provided' })

        // socket.off()
        socket.disconnect(true)

        return
    }

    try {
        const userData = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        socket.userId = userData.id
        next()
    } catch (err) {
        console.log(err, 'error while extreacting token')
        // socket.off()
        socket.disconnect(true)


        // create a error middleware and pass it there
    }
}

export { authMiddleware , ioMiddlewareToken }