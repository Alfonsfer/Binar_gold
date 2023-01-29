const {User} = require('../database/models')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../helpers/error.helper')


const auth = async(req,res,next) => {
    const authHeader = req.header.authorization
    if(!authHeader || !authHeader.startswith('Bearer')){
        throw new ErrorResponse(401,'Authentication Invalid')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)

        req.user = {user_id:payload.user_id,username:payload.username}
    } catch (error) {
        throw new ErrorResponse(401,'Authentication Invalid')
    }
}

module.exports = auth