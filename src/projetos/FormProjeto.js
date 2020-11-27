import React, {useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addProjetoServer, updateProjetoServer, selectProjetosById} from './ProjetosSlice'
import {projetoSchema} from './ProjetoSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';


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
    let pageTitle;
    if(actionType === 'projetos/addProjeto'){
        pageTitle = 'Novo Projeto';
    }else{
        pageTitle = 'Alteração de Projeto';
    }
    
    return(<>
            <h1>{pageTitle}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Nome:
                <input type="text" name="nome" id="nome"  defaultValue={projetoOnLoad.nome} ref={register} />
                &nbsp;<span id="nome_err_msg">{errors.nome?.message}</span>
            </label>
            <br/>
            <label>
                Sigla:
                <input type="text" name="sigla" id="sigla"  defaultValue={projetoOnLoad.sigla} ref={register} />
                &nbsp;<span id="sigla_err_msg">{errors.sigla?.message}</span>
            </label>
            <br/>
            <br/>   
            <Button type="submit" id="Salvar" name="btn_salvar_projeto" variant="contained" color="primary">Salvar</Button>
            </form>
          </>
    );
}