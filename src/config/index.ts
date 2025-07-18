import merge from 'lodash/merge'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const stage = process.env.STAGE

let envConfig

if (stage === 'production') {
    envConfig = require('./prod').default
} else {
    envConfig = require('./local').default
}

export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3001,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    }
}, envConfig)