const express = require('express')
const colors = express.Router()
const data = require('./data/colors.json')

colors.get('/colors', function(req, res){
   res.json(data)
})
colors.post('/colors', function(req, res){
   res.json(data)
})

//export this api to use in our index.js
module.exports = colors
