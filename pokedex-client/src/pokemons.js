import React from 'react'
import logo from './img/logo.png';


export default class Pokemons extends React.Component {
  state = { pokemons: [], url: 'http://localhost:3000/pokemon/', urlTypes: 'http://localhost:3000/types/', urlSizes: 'http://localhost:3000/pokemons/size/', id: null, show: false, size: null, typeRef: null, colors: []}
  caracteristics = ['nom', 'numéro', 'type1', 'type2', 'capspe1', 'capspe2']
  handleChange = this.handleChange.bind(this)
  handleSubmit = this.handleSubmit.bind(this)
  handleShow = this.handleShow.bind(this)
  handleT = this.handleT.bind(this)
  pokemonsTypes = ["normal","feu","eau","plante","électrique","insecte","roche","sol","acier","poison","combat","spectre","psy","glace","dragon","vol"]

  componentDidMount(){
    this.fetchPokemons()
    this.colors()
  }

  handleChange(event) {
    const name = event.target.value
    const newName = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
    this.setState({id: newName});
    event.preventDefault();
  }

  handleSubmit(event) {
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

  async fetchPokemons() {

    const response = await fetch('http://localhost:5000/pokemons', { headers : {'Content-Type': 'application/json'} })

    const data = await response.json()

    this.setState({ pokemons: data })
  }

  async colors(){
    const response = await fetch(`http://localhost:5000/colors`, { headers : {'Content-Type': 'application/json'} })

    const data = await response.json()

    this.setState({ colors: data })
  }


  render(){
    const {pokemons, colors} = this.state
    const tab = this.pokemonsTypes
    const types = tab.map((type) =>
          <button value={type} class={`btn btn-light types-filter ${colors[type]}`} onClick={this.handleT}>{type}</button>
    )
    const listItems = pokemons.map((pokemon) =>
    <div class="deck">
      <div class="card" key={pokemon.ndex}>
        <a href={`http://localhost:3000/pokemon/${pokemon.ndex}`}><img class="card-img-top" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.ndex}.png`} alt=""/></a>
          {pokemon.nom}
        <div class="card-body">
        </div>
      </div>
    </div>
    )

    return (
      <div className='body'>
        <head>
          <title>Pokédex</title>
        </head>
        <div className="pokedex-header">
          <img src={logo} alt=""/>
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
        <div className='wrapper1 bg-light'>
          {listItems}
        </div>
      </div>
    )
  }

}
