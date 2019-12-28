const fs = require('fs')
const express = require('express')
const types = express.Router()
const file = './data/pokedex.json'
const file2 = './data/types.json'
const obj = JSON.parse(fs.readFileSync(file, 'utf8'))

function readPokemonInfos(type){
  let obj2 = []
  for (const i of obj){
    if (i.type1 === type || i.type2 === type){
      obj2.push(i)
    }
  }
  fs.writeFileSync(file2, JSON.stringify(obj2, null, 2))
}

types.get('/:type', function(req, res){
  const elt = req.params.type
  const infos = readPokemonInfos(elt)
  const data = require(file2)
  res.json(data)
})

types.post('/:type', function(req, res){
  const elt = req.params.type
  const infos = readPokemonInfos(elt)
  const data = require(file2)
  res.json(data)
})
//export this api to use in our index.js
module.exports = types
