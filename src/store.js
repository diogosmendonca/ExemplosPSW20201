import { configureStore } from '@reduxjs/toolkit'


import projetosReducer from './projetos/ProjetosSlice'

export const store = configureStore({
    reducer: {
      projetos: projetosReducer 
     /*aqui poderiam entrar mais reducers, um por chave do mapa */
    }
})
