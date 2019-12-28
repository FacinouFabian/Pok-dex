const express = require('express')
const faiblesses = express.Router()
const data = require('./data/weaknesses.json')

faiblesses.get('/faiblesses', function(req, res){
   res.json(data)
})
faiblesses.post('/faiblesses', function(req, res){
   res.json(data)
})

//export this api to use in our index.js
module.exports = faiblesses
