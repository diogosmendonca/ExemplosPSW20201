import React, {useEffect} from 'react';
import {Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteProjetoServer, fetchProjetos, selectAllProjetos} from './ProjetosSlice'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TabelaProjetos from './TabelaProjetos';

/**
 * @module projetos/ListagemProjetos
 */

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });
  
  
  /**
   * Renderiza a tela de Listagem de projetos.
   * 
   */
  function ListagemProjeto(props){
    
    const projetos = useSelector(selectAllProjetos)
    const status = useSelector(state => state.projetos.status);
    const error = useSelector(state => state.projetos.error);
  
    const dispatch = useDispatch();
  
    const classes = useStyles();
  
    function handleClickExcluirProjeto(id){
          dispatch(deleteProjetoServer(id));
    }
  
     useEffect(() => {
          if (status === 'not_loaded' ) {
              dispatch(fetchProjetos())
          }else if(status === 'failed'){
              setTimeout(()=>dispatch(fetchProjetos()), 5000);
          }
      }, [status, dispatch])
      
    
    let tabelaProjetos;
    if(status === 'loaded' || status === 'saved' || status === 'deleted'){
      tabelaProjetos = <TabelaProjetos projetos={projetos} onClickExcluirProjeto={handleClickExcluirProjeto} />;
    }else if(status === 'loading'){
      tabelaProjetos = <div id="projetos">Carregando os projetos...</div>;
    }else if(status === 'not_loaded'){
      tabelaProjetos = '';
    }else{
      //status === 'failed' or any other
      tabelaProjetos = <div id="projetos">Error: {error}</div>;
    }
  
    return (
              <>
                <div id="lbl_titulo_pagina"><Typography variant="h3">Listagem de Projetos</Typography></div><br/>
                <Button className={classes.root} id="Novo Projeto" name="btn_novo_projeto" to="/projetos/novo" component={Link}>Novo Projeto</Button><br/><br/>
                {tabelaProjetos}
              </>
          );
  }
  
  export default ListagemProjeto;
  