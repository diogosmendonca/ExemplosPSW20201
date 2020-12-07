import React from 'react';
import { render } from '@testing-library/react'
import ListagemProjeto from './ListagemProjeto'
import {useSelector} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import {deleteProjetoServer, fetchProjetos} from './ProjetosSlice'
import TabelaProjetos from './TabelaProjetos'
import userEvent from '@testing-library/user-event'


// Mocking redux module
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));


// Mocking the state
const mockAppState = {
    projetos: {
        status: 'not_loaded',
        error: null,
        projetos: []
    }
}

// Mocking the slice
jest.mock("./ProjetosSlice", () => ({
    selectAllProjetos: jest.fn(() => mockAppState.projetos.projetos),
    deleteProjetoServer: jest.fn(),
    fetchProjetos: jest.fn()
}));


//necessário para testar o comportamento do setTimeout
jest.useFakeTimers()

describe("ListagemProjeto integration TabelaProjeto - Exibição da tabela vazia", () => {

    beforeEach(() => {
      useSelector.mockImplementation(callback => {
        return callback(mockAppState);
      });
    });
    
    afterEach(() => {
      useSelector.mockClear();
      fetchProjetos.mockClear();
      jest.clearAllTimers()
    });

    
    const okStateTest = () => {
  
        const { container } = render(<ListagemProjeto />, { wrapper: MemoryRouter });
        //carrega a página
        expect(container.querySelector('#lbl_titulo_pagina')).toBeInTheDocument();
        
        expect(container.querySelector('#projetos')).toBeInTheDocument();
        expect(container.querySelector('#projetos').innerHTML).toContain('Não existem projetos a serem exibidos.');
        
        //não busca os projetos
        expect(fetchProjetos).toHaveBeenCalledTimes(0);
    }
  
  test('loaded', () => {
    mockAppState.projetos.status = 'loaded';
    mockAppState.projetos.error = '';
    okStateTest();
  });


});