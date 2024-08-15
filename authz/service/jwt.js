const jwt = require("jsonwebtoken")


module.exports = {
    SignJWT : async (payload , secret) => {
        try {

        
            
            // Sign and encode the token
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            
            return token
            
        } catch (error) {
            return error
        }
    } ,
    Verify    : async (token ,secret)  => {

            try {
                const decoded = jwt.verify(token ,secret)
                console.info("DECODE :-> " , decoded )
                return true
            } catch (error) {
                return false
            }
     }
} 