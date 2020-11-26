import React from 'react';
import { render, screen } from '@testing-library/react'
import ListagemProjeto from './ListagemProjeto'
import {useSelector, useDispatch} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import {deleteProjetoServer, fetchProjetos, selectAllProjetos} from './ProjetosSlice'
import TabelaProjetos from './TabelaProjetos'

// Mocking tabela projetos
jest.mock('./TabelaProjetos', () => jest.fn(() => (<div id="projetos">Projetos</div>)));

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


describe("ListagemProjeto unit", () => {

    beforeEach(() => {
      useSelector.mockImplementation(callback => {
        return callback(mockAppState);
      });
    });
    
    afterEach(() => {
      useSelector.mockClear();
      fetchProjetos.mockClear();
      TabelaProjetos.mockClear();
    });

    test('not_loaded', () => {
        const { container } = render(<ListagemProjeto />, { wrapper: MemoryRouter });
        //busca os projetos
        expect(fetchProjetos).toHaveBeenCalledTimes(1);
        //carrega a página
        expect(container.querySelector('#lbl_titulo_pagina')).toBeInTheDocument();
        expect(container.querySelector('#lbl_titulo_pagina').innerHTML).toContain('Listagem&nbsp;de&nbsp;Projetos');
        //não carrega a tabela, pois ainda vai para loaded
        expect(container.querySelector('#projetos')).not.toBeInTheDocument();
        expect(TabelaProjetos).toHaveBeenCalledTimes(0);
    });

    test('loading', () => {
      mockAppState.projetos.status = 'loading';

      const { container } = render(<ListagemProjeto />, { wrapper: MemoryRouter });
      //busca os projetos
      expect(fetchProjetos).toHaveBeenCalledTimes(0);
      //carrega a página
      expect(container.querySelector('#lbl_titulo_pagina')).toBeInTheDocument();
      //não carrega a tabela, pois ainda vai para loaded, mas mostra msg de carregando.
      expect(container.querySelector('#projetos')).toBeInTheDocument();
      expect(container.querySelector('#projetos').innerHTML).toContain('Carregando os projetos...');
      expect(TabelaProjetos).toHaveBeenCalledTimes(0);
  });


  const failedStateTest = () => {
    //necessário para testar o comportamento do setTimeout
    jest.useFakeTimers()

    const { container } = render(<ListagemProjeto />, { wrapper: MemoryRouter });
    //carrega a página
    expect(container.querySelector('#lbl_titulo_pagina')).toBeInTheDocument();
    //não carrega a tabela, pois failed, mas mostra a msg de erro na tela.
    expect(container.querySelector('#projetos')).toBeInTheDocument();
    expect(container.querySelector('#projetos').innerHTML).toContain('Alguma msg de erro');
    
    //busca os projetos depois de 5 segundos
    jest.runAllTimers(); //avança no tempo
    expect(fetchProjetos).toHaveBeenCalledTimes(1);
    expect(TabelaProjetos).toHaveBeenCalledTimes(0);
  }

  test('failed', () => {
    mockAppState.projetos.status = 'failed';
    mockAppState.projetos.error = 'Alguma msg de erro';
    failedStateTest();
});

const okStateTest = () => {
  
  const { container } = render(<ListagemProjeto />, { wrapper: MemoryRouter });
  //carrega a página
  expect(container.querySelector('#lbl_titulo_pagina')).toBeInTheDocument();
  
  //não carrega a tabela, pois loaded
  expect(TabelaProjetos).toHaveBeenCalledTimes(1);
  expect(container.querySelector('#projetos')).toBeInTheDocument();
  expect(container.querySelector('#projetos').innerHTML).toContain('Projetos');
  
  //não busca os projetos
  expect(fetchProjetos).toHaveBeenCalledTimes(0);
}

test('loaded', () => {
  mockAppState.projetos.status = 'loaded';
  mockAppState.projetos.error = '';
  okStateTest();
});

test('saved', () => {
  mockAppState.projetos.status = 'saved';
  mockAppState.projetos.error = '';
  okStateTest();
});

test('deleted', () => {
  mockAppState.projetos.status = 'deleted';
  mockAppState.projetos.error = '';
  okStateTest();
});


test('not existent state', () => {
  mockAppState.projetos.status = 'not existent state';
  mockAppState.projetos.error = 'Alguma msg de erro';
  failedStateTest();
});



});