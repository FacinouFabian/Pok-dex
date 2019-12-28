const fs = require('fs')
const url = require('url')
const path = require('path')
const http = require('http')
const local_database = './data/pokedex.json'
const file = require(local_database)
const general = ['numéro', 'nom', 'type1', 'type2']
const details = ['numéro', 'nom', 'ndex', 'taille', 'poids', 'type1', 'type2', 'capspe1', 'capspe2']
const obj = {}
const server = http.createServer();

class myExpress{

    constructor(){
        this.app = this.init()
    }

    init(){
        const server = http.createServer()
        return server
    }

    get(path, callback){
        if (path === '/search'){
            server.on('request', (req, res) => {
              const {pathname, query} = url.parse(req.url, true)
              const getName = pathname.split('/')
              const pokemon = getName[2]
              if (req.method === 'GET'){
                if (fs.existsSync(local_database)) {
                  for (const elt of file){
                    if (elt.nom === pokemon) {
                      obj = elt
                    }
                  }
                }
                callback(obj)
                res.end()
              }
            })
        }
    }

    listen(port){
        this.app.listen(port)
    }
}

function express(){
    return new myExpress()
}

module.exports = express
