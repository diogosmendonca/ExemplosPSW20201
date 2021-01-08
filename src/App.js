import React from 'react';
import ListagemProjeto from './projetos/ListagemProjeto';
import FormProjeto from './projetos/FormProjeto';
import LoginForm from './users/LoginForm';
import {store} from './store';
import { Provider } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; 
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//importe as cores que selecionou anteriormente
import {lightGreen, orange} from '@material-ui/core/colors';

let theme = createMuiTheme({
 
  palette: {
    primary: {
      main: lightGreen[500],
    },
    secondary: {
      main: orange[800],
    },
  },
});

theme = responsiveFontSizes(theme);


const App = (props) => {

  return (<>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Provider store={store}>
              <Container maxWidth="sm">
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
                        <Route path="/projetos/:id"><FormProjeto /></Route>
                        <Route path="/projetos"><ListagemProjeto /></Route>
                        <Route path="/"><LoginForm /></Route>
                      </Switch>
                  </div>
              </Router>
              </Container>
              </Provider>
            </ThemeProvider>
          </>);
}

export default App;
