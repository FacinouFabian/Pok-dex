const express = require('express')
const api = express.Router()
const data = require('./data/pokedex.json')

api.get('/pokemons', function(req, res){
   res.json(data)
})
api.post('/pokemons', function(req, res){
   res.json(data)
})

//export this api to use in our index.js
module.exports = api
