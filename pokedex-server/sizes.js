const fs = require('fs')
const express = require('express')
const sizes = express.Router()
const file = './data/pokedex.json'
const file2 = './data/sizes.json'
const obj = JSON.parse(fs.readFileSync(file, 'utf8'))

function readPokemonInfos(type){
  let obj2 = []
  for (const i of obj){
    if (i.taille){
      obj2.push(i)
    }
  }
  fs.writeFileSync(file2, JSON.stringify(obj2, null, 2))
}

sizes.get('/pokemons/size/:size', function(req, res){
  const elt = req.params.size
  const infos = readPokemonInfos(elt)
  const data = require(file2)
  res.json(data)
})

sizes.post('/pokemons/size/:size', function(req, res){
  const elt = req.params.size
  const infos = readPokemonInfos(elt)
  const data = require(file2)
  res.json(data)
})
//export this api to use in our index.js
module.exports = sizes
