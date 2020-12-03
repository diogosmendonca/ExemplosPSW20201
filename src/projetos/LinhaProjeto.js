import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {Link } from "react-router-dom";

/**
 * @module projetos/LinhaProjeto
 */

 /**
 * @typedef Projeto
 * @type {object}
 * @property {number} id - identificador.
 * @property {string} nome - nome do projeto.
 * @property {string} sigla - sigla do projeto.
 */

 /**
  * Renderiza uma linha na listagem de projetos contendo um projeto com nome e sigla, 
  * juntamente com o botão de excluir.
  * @param {Projeto} props.projeto - Projeto a ser renderizado na linha.
  */
function LinhaProjeto(props){
    if(props != null && props.projeto != null && props.projeto.id != null){
        return(
            <tr><td><Link to={`/projetos/${props.projeto.id}`}><button>{props.projeto.nome}</button></Link></td>
                <td>{props.projeto.sigla}</td>
                <td><IconButton id="excluir_projeto" name="excluir_projeto" onClick={() => props.onClickExcluirProjeto(props.projeto.id)}><DeleteIcon /></IconButton></td>
            </tr>
        );
    }else{
        return(<tr><td colSpan={3}>Não foi possível exibir o projeto.</td></tr>)
    }
}

export default LinhaProjeto;