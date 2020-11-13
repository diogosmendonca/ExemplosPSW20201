import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
  
const initialProjects = [];

function addProjetoReducer(projetos, projeto){
    let proxId = 1 + projetos.map(p => p.id).reduce((x, y) => Math.max(x,y));
    return projetos.concat([{...projeto, id: proxId}]);
}

function deleteProjetoReducer(projetos, id){
    return projetos.filter((p) => p.id !== id);
}

function  updateProjetoReducer(projetos, projeto){
    let index = projetos.map(p => p.id).indexOf(projeto.id);
    projetos.splice(index, 1, projeto);
    return projetos;
}

export const fetchProjetos = createAsyncThunk('projetos/fetchProjetos', 
    async () => {
        return await (await fetch('http://localhost:3004/projetos')).json();
});


function fullfillProjetosReducer(projetosState, projetosFetched){
    return projetosFetched;
}


export const projetosSlice = createSlice({
    name: 'projetos',
    initialState: initialProjects,
    reducers: {
       addProjeto: (state, action) => addProjetoReducer(state, action.payload),
       updateProjeto: (state, action) => updateProjetoReducer(state, action.payload),
       deleteProjeto: (state, action) => deleteProjetoReducer(state, action.payload)
    },
    extraReducers: {
       [fetchProjetos.fulfilled]: (state, action) => fullfillProjetosReducer(state, action.payload),
    },
})

export const { addProjeto, updateProjeto, deleteProjeto } = projetosSlice.actions
export default projetosSlice.reducer
    
