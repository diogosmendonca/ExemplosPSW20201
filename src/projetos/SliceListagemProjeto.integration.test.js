import React from 'react';
import projetosReducer, {deleteProjetoServer, fetchProjetos, addProjetoServer, updateProjetoServer, selectAllProjetos} from './ProjetosSlice'
import {httpDelete, httpGet, httpPut, httpPost} from '../utils'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react';
import ListagemProjeto from './ListagemProjeto'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// Mocking utils
jest.mock("../utils", () => ({
    httpGet: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}));

jest.useFakeTimers();

let store;
describe('ProjetosSlice', () => {

    beforeEach(() => {
        store = configureStore({reducer: { projetos: projetosReducer }});
    });

    afterEach(() => {
        httpGet.mockClear();
        httpPost.mockClear();
        httpPut.mockClear();
        httpDelete.mockClear();
        jest.clearAllTimers();
    });


    test('dispatch fetch fullfiled', async () => {
        httpGet.mockImplementation(() => Promise.resolve([
            {
              "nome": "Projeto 3",
              "sigla": "P3",
              "id": 3
            }
        ]));
        
        await store.dispatch(fetchProjetos());
        
        okStateTest();


    })

    
    const okStateTest = () => {
  
        const { container } = render(<Provider store={store}><ListagemProjeto /></Provider>, { wrapper: MemoryRouter });
        //carrega a página
        expect(container.querySelector('#lbl_titulo_pagina')).toBeInTheDocument();
        
        expect(container.querySelector('#projetos')).toBeInTheDocument();
        expect(screen.getByText("Projeto 3")).toBeInTheDocument();
        expect(screen.getByText("P3")).toBeInTheDocument();
        //expect(container.querySelector('#projetos').innerHTML).toContain('Não existem projetos a serem exibidos.');
        
    }
  

});
