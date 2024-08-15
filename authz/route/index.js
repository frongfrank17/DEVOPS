const server = require('express').Router()
const privateCtrl = require('../controllers/private.controller')
server.post('/authz/public/register'  , ( req , res) => {
    return res.status(200).send("register API GATEWAY" )
} )
server.get('/authz/public/jwt'  , ( req , res) => {
    return res.status(200).send("register API GATEWAY" )
} )
server.post("/authz/private/key" , privateCtrl.Key)
module.exports = server      