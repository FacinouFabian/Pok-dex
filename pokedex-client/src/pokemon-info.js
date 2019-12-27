import React from 'react'
import './css/Pokemon.css'
import logo from './img/logo.png';

export default class Pokemon extends React.Component {
  state = { pokemons: [], url: 'http://localhost:3000/pokemon/', urlTypes: 'http://localhost:3000/types/', id: null, show: false, size: null, typeRef: null, colors: []}
  caracteristics = ['nom', 'numéro', 'type1', 'type2', 'capspe1', 'capspe2']
  handleChange = this.handleChange.bind(this)
  handleSubmit = this.handleSubmit.bind(this)
  handleShow = this.handleShow.bind(this)
  handleSize = this.handleSize.bind(this)
  handleT = this.handleT.bind(this)
  pokemonsTypes = ["normal","feu","eau","plante","électrique","insecte","roche","sol","acier","poison","combat","spectre","psy","glace","dragon","vol"]

  componentDidMount(){
    this.fetchPokemon()
    this.colors()
    // this.Weaknesses()
  }

  handleChange(event) {
    const name = event.target.value
    const newName = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
    this.setState({id: newName});
    event.preventDefault();
  }

  handleSubmit(event) {
    const nSize = event.target.value
    const url = this.state.url + this.state.id
    window.location = url
    event.preventDefault();
  }

  handleShow(event){
    const {show} = this.state
    const buttons = document.getElementsByClassName('buttons')[0]
    const filterButton = document.getElementsByClassName('filterButton')[0]
    if (show === true){
      this.setState({show: false})
      buttons.style.display = "block"
      filterButton.style.value = "Cacher"
      event.preventDefault();
    }else {
      this.setState({show: true})
      buttons.style.display = "none"
      filterButton.style.value = "Filtres"
    }
  }


  handleT(event){
    const newT = event.target.value
    const newRef = newT.charAt(0).toUpperCase() + newT.substring(1).toLowerCase()
    const url = this.state.urlTypes + newRef
    window.location = url
    event.preventDefault();
  }

  handleSize(event){
    const newSize = event.target.value
    const url = this.state.urlSizes + newSize
    this.setState({size: newSize});
    window.location = url
    event.preventDefault();
  }

  async fetchPokemon() {

    const url = window.location
    const pathname = url.pathname
    const ndexTab = pathname.split('/')
    const id = ndexTab[2]

    const response = await fetch(`http://localhost:5000/pokemons/${id}`, { headers : {'Content-Type': 'application/json'} })

    const data = await response.json()

    this.setState({ pokemons: data })

  }

  async colors(){
    const response = await fetch(`http://localhost:5000/colors`, { headers : {'Content-Type': 'application/json'} })

    const data = await response.json()

    this.setState({ colors: data })
  }

  async Weaknesses(){
    const response = await fetch(`http://localhost:5000/faiblesses`, { headers : {'Content-Type': 'application/json'} })

    const data = await response.json()

    this.setState({ faiblesses: data })
  }

  displayWeaknesses(){
  }

  render(){
    const {pokemons, colors} = this.state
    const tab = this.pokemonsTypes
    const types = tab.map((type) =>
          <button class={`btn btn-light types-filter ${colors[type]}`} onClick={this.handleT}>{type}</button>
    )
    return (
      <div className='body2'>
        <head>
          <title>{pokemons.nomen} {`|`} Pokédex</title>
        </head>
        <div className="pokedex-header">
          <img src={logo}/>
        </div>
        <div class="nav">
          <form class="form-group" onSubmit={this.handleSubmit}>
              <div class='input-div'>
                <input class="fabian input-sm form-control" id='search-input' placeholder='nom ou # numéro' type="text" value={this.state.id} onChange={this.handleChange} />
              </div>
              <div class='input-div'>
              <button class="btn btn-primary input-sm form-control" id='search-button' type="submit">Chercher</button>
              </div>
          </form>
          <input class="btn btn-danger filterButton" onClick={this.handleShow} type="reset" value="Cacher/Montrer filtres"></input>
          <div class='buttons'>
            {types}
          </div>
        </div>
        <div className='wrapper2 bg-light'>
          <h1>{pokemons.nom} # {pokemons.numéro}</h1>

              <div id='image' class="card-body">
                <img id='pokemon-img' class="card-img-top" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemons.ndex}.png`}/>
              </div>

              <div id='properties' class="card-body">
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">Taille</th>
                      <th scope="col">poids</th>
                      <th scope="col">categorie</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border-right-solid">{pokemons.taille}</td>
                      <td class="border-right-solid">{pokemons.poids}</td>
                      <td>{pokemons.espece}</td>
                    </tr>
                  </tbody>
                </table>

                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th colspan="2">{`Capacité\(s\) spéciale\(s\)`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border-right-solid">{pokemons.capspe1}</td>
                      <td>{pokemons.capspe2}</td>
                    </tr>
                  </tbody>
                </table>

                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th colspan="2">{`Faiblesse\(s\)`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A venir</td>
                    </tr>
                  </tbody>
                </table>

              </div>
        </div>
      </div>
    )
  }

}



// export default function Pokemon(){
//   const url = window.location
//   const pathname = url.pathname
//   const ndexTab = pathname.split('/')
//   const ndex = ndexTab[2]
//   console.log(ndex)
//   const tab = ['test', 'test2']
//   // const getNDEX = url.split('/')
//
//   // const ndex = getNDEX[3]
//   return(
//     <h1>test</h1>
//   )
// }
