import React from 'react';
import ListagemProjeto from './projetos/TabelaProjetos';
import FormProjeto from './projetos/FormProjeto';
import {store} from './store';
import { Provider } from 'react-redux'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; 

const App = (props) => {

  return (<>
            <Provider store={store}>
            <Router>
               <div>
                    <nav>
                      <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/projetos/novo">Novo Projeto</Link></li>
                        <li><Link to="/projetos">Projetos</Link></li>
                      </ul>
                    </nav>
                    <Switch>
                      <Route path="/projetos/novo"><FormProjeto /></Route>
                      <Route path="/projetos"><ListagemProjeto /></Route>
                      <Route path="/"><ListagemProjeto /></Route>
                    </Switch>
                </div>
            </Router>
            </Provider>
          </>);
}

export default App;
