
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../helpers/error.helper')


const auth = async(req,res,next) => {
    
    try {
        const authHeader = req.authorizarion
        console.log(authHeader)
        if(!authHeader || !authHeader.startswith('Bearer')){
            throw new ErrorResponse(401,'Authentication Invalid')
        }
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token,process.env.JWT_SECRET)

        req.user = {user_id:payload.user_id,username:payload.username}
        next()
    } catch (error) {
        
        next(error)
    }
}

module.exports = auth