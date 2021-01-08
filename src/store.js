import { configureStore } from '@reduxjs/toolkit'


import projetosReducer from './projetos/ProjetosSlice'
import loginReducer from './users/LoginSlice'

export const store = configureStore({
    reducer: {
      projetos: projetosReducer,
      logins: loginReducer
     /*aqui poderiam entrar mais reducers, um por chave do mapa */
    }
})
