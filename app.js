const express = require('express')
const userRouter = require('./routes/user.routes')
const itemRouter = require('./routes/item.routes')
const app = express()


app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/item', itemRouter)


app.use((err, req, res, next) => {
    console.log(err)

    const status = err.status || 500
    const error = err.error || err.message || 'Internal server error'

    return res.status(status).json({
        status: false,
        data: {},
        error: error
    })
})

module.exports = app