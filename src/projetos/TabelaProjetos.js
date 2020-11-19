import React from 'react';
import {Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteProjeto} from './ProjetosSlice'

export default function ListagemProjeto(props){
  
  const projetos = useSelector(state => state.projetos);
  const dispatch = useDispatch();


  function handleClickExcluirProjeto(id){
        dispatch(deleteProjeto(id));
  }
  
  return (
            <>
              <div id="lbl_titulo_pagina">Listagem de Projetos</div><br/>
              <Link to="/projetos/novo"><button id="Novo Projeto" name="btn_novo_projeto">Novo Projeto</button></Link><br/><br/>
              <TabelaProjetos projetos={projetos} onClickExcluirProjeto={handleClickExcluirProjeto} />
            </>
        );
}

export const LinhaProjeto = (props) => {
    if(props != null && props.projeto != null && props.projeto.id != null){
      return(
          <tr><td><Link to={`/projetos/${props.projeto.id}`}><button>{props.projeto.nome}</button></Link></td>
              <td>{props.projeto.sigla}</td>
              <td><button id="excluir_projeto" name="excluir_projeto" onClick={() => props.onClickExcluirProjeto(props.projeto.id)}>X</button></td>
          </tr>
      );
    }else{
      return(<tr><td colSpan={3}>Não foi possível exibir o projeto.</td></tr>)
    }
}

export function TabelaProjetos(props){
    if(props != null && props.projetos != null && props.projetos.length > 0){
      return(
          <table id="projetos" border="1">
              <tbody>
                {props.projetos.map((projeto) => <LinhaProjeto key={projeto.id} projeto={projeto} 
                onClickExcluirProjeto={props.onClickExcluirProjeto} />)}
              </tbody>
          </table>
      );
    }else{
      return(<div>Não existem projetos a serem exibidos.</div>)
    }
}

