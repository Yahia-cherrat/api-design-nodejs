import prisma from '../db'
import { 
    comparePasswords, 
    createToken, 
    hashPassword 
} from '../modules/auth'

export const createNewUser = async (req, res, next) => {
    try { 
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })
        
        const token = createToken(user)
        res.json({message: 'User created successfully', token})
    } catch (error) {
        error.type = 'input'
        next(error)
    }

}

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
    }

    const isValidPassword = await comparePasswords(req.body.password, user.password)
    if (!isValidPassword) {
        res.status(401).json({ message: 'Invalid password' })
        return
    }

    const token = createToken(user)
    res.json({message: 'User signed in successfully', token})
}