import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

export default function FormProjeto(props){

    const [projeto, setProjeto] = useState({});
    const history = useHistory();

    function handleInputChange(e) {
        setProjeto( {...projeto, [e.target.name]: e.target.value} );
    }

    function handleSubmit(e){
        e.preventDefault();
        props.dispatch({type: 'add_project', payload: projeto})
        history.push('/projetos');
    }
    
    useEffect(() =>  {document.title = 
            `Projeto: ${projeto.nome}`;
        return () => {document.title = 'Título'}
    } , [projeto.nome]);


    return(<>
            <h1>Novo Projeto</h1>
            <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" name="nome" value={projeto.nome} onChange={handleInputChange}   />
            </label>
            <br/>
            <label>
                Sigla:
                <input type="text" name="sigla" value={projeto.sigla} onChange={handleInputChange}   />
            </label>
            <br/>
            <input type="submit" value="Salvar" />
            </form>
          </>
);
}