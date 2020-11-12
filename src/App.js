import React, {useReducer} from 'react';
import ListagemProjeto from './projetos/TabelaProjetos';
import FormProjeto from './projetos/FormProjeto';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; 

const App = (props) => {
  

  function projetosReducer(projetos /*state*/, action ){
    switch(action.type){
      case 'add_project': /* payload: projeto */
        let proxId = 1 + projetos.map(p => p.id).reduce((x, y) => Math.max(x,y));
        return projetos.concat([{...action.payload, id: proxId}]);
      case 'update_project': /* payload: projeto */
        let index = projetos.map(p => p.id).indexOf(action.payload.id);
        let projetosUpdated = projetos.slice();
        projetosUpdated.splice(index, 1, action.payload);
        return projetosUpdated;
      case 'delete_project': /* payload: id */
        return projetos.filter((p) => p.id !== action.payload);
      default:
        throw new Error();
    }
  }

  const initialProjects = [{id: 1, nome: 'Pro 1', sigla: 'P1'},
                           {id: 2, nome: 'Pro 2', sigla: 'P2'}];

  const [projetos, dispatch] = useReducer(projetosReducer, 
    initialProjects /*valor inicial do estado*/);
  

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
                      <Route path="/projetos/novo"><FormProjeto projetos={projetos} dispatch={dispatch} /></Route>
                      <Route path="/projetos"><ListagemProjeto projetos={projetos} dispatch={dispatch} /></Route>
                      <Route path="/"><ListagemProjeto projetos={projetos} dispatch={dispatch}/></Route>
                    </Switch>
                </div>
            </Router>

          </>);
}

export default App;
