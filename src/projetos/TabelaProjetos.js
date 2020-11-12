import React from 'react';
import {Link } from "react-router-dom";

export default function ListagemProjeto(props){
  
  function handleClickExcluirProjeto(id){
        props.dispatch({type: 'delete_project', payload:id})
  }
  
  /*
  useEffect(()=>{
    setTimeout(()=>{setProjetos(projetos.concat({nome: 'Proj 3', sigla: 'P3'}))}, 2000);
  })
  */

  /*
  componentDidMount(){
    console.log('componentDidMount ListagemProjeto');
  }
  
  componentDidUpdate(){
    console.log('componentDidUpdate ListagemProjeto');
    alert('O componente foi atualizado!');
  }

  componentWillUnmount(){
    console.log('componentWillUnmount ListagemProjeto');
  }
*/
  
  return (
            <>
              <div id="lbl_titulo_pagina">Listagem de Projetos</div><br/>
              <Link to="/projetos/novo"><button id="Novo Projeto" name="btn_novo_projeto">Novo Projeto</button></Link><br/><br/>
              <TabelaProjetos projetos={props.projetos} onClickExcluirProjeto={handleClickExcluirProjeto} />
            </>
        );
  
}

const LinhaProjeto = (props) => {
    return(
        <tr><td>{props.projeto.nome}</td>
            <td>{props.projeto.sigla}</td>
            <td><button id="excluir_projeto" name="excluir_projeto" onClick={() => props.onClickExcluirProjeto(props.projeto.id)}>X</button></td>
        </tr>
    );
}

function TabelaProjetos(props){
    return(
        <table id="projetos" border="1">
            <tbody>
              {props.projetos.map((projeto) => <LinhaProjeto key={projeto.id} projeto={projeto} 
              onClickExcluirProjeto={props.onClickExcluirProjeto} />)}
            </tbody>
        </table>
    );
}

