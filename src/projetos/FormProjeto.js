import React, {useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addProjetoServer, updateProjetoServer, selectProjetosById} from './ProjetosSlice'
import {projetoSchema} from './ProjetoSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";


export default function FormProjeto(props){

    const history = useHistory();
    const dispatch = useDispatch()
    let { id } = useParams();
    id = parseInt(id);
    const projetoFound = useSelector(state => selectProjetosById(state, id))
    const { register, handleSubmit, errors } = useForm({
            resolver: yupResolver(projetoSchema)
        });
        

    const [projetoOnLoad] = useState(
        id ? projetoFound ?? projetoSchema.cast({}): projetoSchema.cast({}));

    const [actionType, ] = useState(
        id ? projetoFound 
                ? 'projetos/updateProjeto'
                : 'projetos/addProjeto'
                : 'projetos/addProjeto');


    function onSubmit(projeto){
        if(actionType === 'projetos/addProjeto'){
            dispatch(addProjetoServer(projeto));
        }else{
            dispatch(updateProjetoServer({...projeto, id: projetoFound.id}));
        }
        
        history.push('/projetos');
    }
    
    return(<>
            <h1>Novo Projeto</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Nome:
                <input type="text" name="nome"  defaultValue={projetoOnLoad.nome} ref={register} />
                &nbsp;<span>{errors.nome?.message}</span>
            </label>
            <br/>
            <label>
                Sigla:
                <input type="text" name="sigla"  defaultValue={projetoOnLoad.sigla} ref={register} />
                &nbsp;<span>{errors.sigla?.message}</span>
            </label>
            <br/>
            <input type="submit" value="Salvar" />
            </form>
          </>
    );
}