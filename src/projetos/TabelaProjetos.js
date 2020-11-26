import React from 'react';
import LinhaProjeto from './LinhaProjeto';

export default function TabelaProjetos(props){
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

