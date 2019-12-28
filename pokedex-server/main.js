const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const api = require('./api')
const pokemon = require('./pokemon')
const colors = require('./colors')
const types = require('./types')
const sizes = require('./sizes')
const faiblesses = require('./faiblesses')
// app.use(bodyParser());

app.use(cors())

app.use('/', api)
app.use('/', pokemon)
app.use('/', colors)
app.use('/', types)
app.use('/', sizes)
app.use('/', faiblesses)
//both index.js and things.js should be in same directory

app.listen(5000)
