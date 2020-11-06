import React, {useState} from 'react';
import ListagemProjeto from './projetos/TabelaProjetos';
import FormProjeto from './projetos/FormProjeto';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; 

const App = (props) => {
  
    const [projetos, setProjetos] = useState(
        [{nome: 'Pro 1', sigla: 'P1'},
        {nome: 'Pro 2', sigla: 'P2'}]
    );

  return (<>
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
                      <Route path="/projetos/novo"><FormProjeto projetos={projetos} setProjetos={setProjetos} /></Route>
                      <Route path="/projetos"><ListagemProjeto projetos={projetos} setProjetos={setProjetos} /></Route>
                      <Route path="/"><ListagemProjeto projetos={projetos} setProjetos={setProjetos}/></Route>
                    </Switch>
                </div>
            </Router>

          </>);
}

export default App;
