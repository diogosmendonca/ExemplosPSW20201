import React from 'react';
import LinhaProjeto from './LinhaProjeto';

/**
 * @module projetos/TabelaProjetos
 */


/**
 * Renderiza a tabela de projetos.
 * 
 * @param {object} props.projetos - Lista de projetos para ser exibida na tabela.
 * 
 */
function TabelaProjetos(props){
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

export default TabelaProjetos;