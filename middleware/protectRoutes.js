const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


function generateAccessToken(userId) {
    console.log( process.env.JWT_SECRET);
    return jwt.sign({id:userId}, process.env.JWT_SECRET, { expiresIn: '3600s' });
  }


function authenticateToken(req, res, next) {
    try{
        const authHeader = req.headers['authorization'];
        console.log(authHeader.split(' ')[1]);
        const token =authHeader.split(' ')[1]
      
        if (token == null) return res.sendStatus(401).json({'error': `Invalid or empty token provided!`})
      
        jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
          if(err){
            throw jwt.JsonWebTokenError.message = err.message;
          } 
          req.userId = userId;
          next();
        });

    }catch(error){
        console.log(`protectRoute.js: authenticateToken: ${error}`);
        return res.sendStatus(403).json({'error': `Wasn't able to auhorize a user!`})
    }
   
  }

  module.exports = {generateAccessToken, authenticateToken};