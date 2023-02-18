const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    try {

        const auth = req.headers.authorization
        if(!auth || !auth.startsWith('Bearer ')){
            return res.status(401).send('Invalid token')
        }
        const token = auth.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {...payload}
        next()
        
    } catch (error) {
        res.status(500).send(error)
        
    }
}

const verifyAdmin = (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if(req.user.isAdmin){
                next()
            }
            else{
                res.status(401).send('You are not allowed to perform this action')
            }
            
        })   
    } catch (error) {
        res.status(500).send(error)
        
    }
    
}

module.exports = {
    verifyToken,
    verifyAdmin
}