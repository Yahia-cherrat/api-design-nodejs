import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { 
    createNewUser, 
    signIn 
} from './handlers/user'
import { error } from 'console'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200)
    res.json({ message: 'Hello from Express!' })
})

app.use('/api', [protect], router)

app.post('/user', createNewUser)
app.post('/sign-in', signIn)

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        return res.status(401).json({ message: 'Unauthorized' })
    } else if (err.type === 'input') {
        return res.status(400).json({ message: 'Bad Request' })
    } else {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

export default app