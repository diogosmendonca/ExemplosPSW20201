import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../utils'
import {baseUrl} from '../baseUrl'

const projetosAdapter = createEntityAdapter();

const initialState = projetosAdapter.getInitialState({
    status: 'not_loaded',
    error: null
    /* o array projetos foi removido do state inicial, será criado pelo adapter */
});

export const fetchProjetos = createAsyncThunk('projetos/fetchProjetos', async () => {
    return await httpGet(`${baseUrl}/projetos`);
});

export const deleteProjetoServer = createAsyncThunk('projetos/deleteProjetoServer', async (idProjeto) => {
    await httpDelete(`${baseUrl}/projetos/${idProjeto}`);
    return idProjeto;
});

export const addProjetoServer = createAsyncThunk('projetos/addProjetoServer', async (projeto) => {
    return await httpPost(`${baseUrl}/projetos`, projeto);
});

export const updateProjetoServer = createAsyncThunk('projetos/updateProjetoServer', async (projeto) => {
    return await httpPut(`${baseUrl}/projetos/${projeto.id}`, projeto);
});

export const projetosSlice = createSlice({
    name: 'projetos',
    initialState: initialState,
    extraReducers: {
       [fetchProjetos.pending]: (state, action) => {state.status = 'loading'},
       [fetchProjetos.fulfilled]: (state, action) => {state.status = 'loaded'; projetosAdapter.setAll(state, action.payload);},
       [fetchProjetos.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteProjetoServer.pending]: (state, action) => {state.status = 'loading'},
       [deleteProjetoServer.fulfilled]: (state, action) => {state.status = 'deleted'; projetosAdapter.removeOne(state, action.payload);},
       [addProjetoServer.pending]: (state, action) => {state.status = 'loading'},
       [addProjetoServer.fulfilled]: (state, action) => {state.status = 'saved'; projetosAdapter.addOne(state, action.payload);},
       [updateProjetoServer.pending]: (state, action) => {state.status = 'loading'},
       [updateProjetoServer.fulfilled]: (state, action) => {state.status = 'saved'; projetosAdapter.upsertOne(state, action.payload);},
    },
})

export default projetosSlice.reducer

export const {
    selectAll: selectAllProjetos,
    selectById: selectProjetosById,
    selectIds: selectProjetosIds
} = projetosAdapter.getSelectors(state => state.projetos)
    
