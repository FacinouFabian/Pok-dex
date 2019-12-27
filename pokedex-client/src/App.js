import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Pokemons from './pokemons'
import Pokemon from './pokemon-info'
import Types from './types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <html>
      <body>
      <Router>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route path="/pokemon/:id"><Pokemon /></Route>
              <Route path="/types/:type"><Types /></Route>
              <Route path="/"><Pokemons /></Route>
            </Switch>
          </header>
        </div>
      </Router>
      </body>
    </html>
  );
}

export default App;
