const jwt = require('../service/jwt')

module.exports = {
     Key : async (req, res) => {
        try {
             let payload = {
                "key" : "consume-1"
              }
              let secret = "key-dev0ps-s3cr33-G433vv4Y-4P1s"
              let token = await jwt.SignJWT(payload , secret)
            res.set('Authorization', 'Bearer '+token);
            res.status(200);
            res.end('This response ends here.');
        } catch (error) {
                res.status(500).send( {
                    "message" : error.message
                } )
        }
     }  
} 

