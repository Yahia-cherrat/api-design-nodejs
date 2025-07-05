import jwt from 'jsonwebtoken';
import bycrpt from 'bcrypt';

export const comparePasswords = async (password, hashedPassword) => {
    return bycrpt.compare(password, hashedPassword)
}

export const hashPassword = async (password) => {
    return bycrpt.hash(password, 10)
}

export const createToken = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET
    )
    return token
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }

    const [, token] = bearer.split(' ')
    if (!token) {
        res.status(401).json({ message: 'Not valid token!' })
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Not valid token!' })
        return
    }
}