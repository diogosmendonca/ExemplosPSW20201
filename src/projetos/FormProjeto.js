import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addProjeto, updateProjeto} from './ProjetosSlice'

export default function FormProjeto(props){

    const projetos = useSelector(state => state.projetos)
    const history = useHistory();
    const dispatch = useDispatch()
    let { id } = useParams();
    id = parseInt(id);

    const [projeto, setProjeto] = useState(
        id ? projetos.filter((p) => p.id === id)[0] ?? {} : {});

    const [actionType, ] = useState(
        id ? 
            projetos.filter((p) => p.id === id)[0] 
                ? 'projetos/updateProjeto'
                : 'projetos/addProjeto'
                : 'projetos/addProjeto');

    function handleInputChange(e) {
        setProjeto( {...projeto, [e.target.name]: e.target.value} );
    }

    function handleSubmit(e){
        e.preventDefault();
        if(actionType === 'projetos/addProjeto'){
            dispatch(addProjeto(projeto));
        }else{
            dispatch(updateProjeto(projeto));
        }
        
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