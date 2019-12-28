const fs = require('fs')
const express = require('express')
const pokemon = express.Router()
const file = './data/pokedex.json'
const obj = JSON.parse(fs.readFileSync(file, 'utf8'))

function readPokemonInfos(id){
  for (const elt of obj){
    if (elt.ndex === id) {
      return elt
    }else if (elt.nom === id) {
      return elt
    }
  }
}

pokemon.get('/pokemons/:ndex', function(req, res){
  const ndex = req.params.ndex
  const infos = readPokemonInfos(ndex)
  res.json(infos)
})

pokemon.get('/pokemons/:nom', function(req, res){
  const nom = req.params.nom
  const infos = readPokemonInfos(nom)
  res.json(infos)
})

module.exports = pokemon
