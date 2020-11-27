import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import FormProjeto from './FormProjeto'
import {useSelector} from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { MemoryRouter, Route } from 'react-router-dom'
import { act } from 'react-dom/test-utils';
import {addProjetoServer, updateProjetoServer} from './ProjetosSlice'


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
        projetos: [{id: 1, nome: 'Projeto 1', sigla: 'P1'}],
    }
}

// Mocking the slice
jest.mock("./ProjetosSlice", () => ({
    selectProjetosById: jest.fn((state, id) => mockAppState.projetos.projetos.find(e => e.id == id)),
    addProjetoServer: jest.fn(),
    updateProjetoServer: jest.fn()
}));

const fieldTest = async (nomeParam, siglaParam, isNomeValido, isSiglaValida, msgEsperada, path = null, containerParam = null, historyParam = null) => {
    const history = historyParam ? historyParam : createMemoryHistory();
    const { container } = containerParam ? containerParam : render(<Router history={history}><FormProjeto/></Router>);

    const nome = container.querySelector("#nome");
    const sigla = container.querySelector("#sigla");
    const submitButton = container.querySelector("#Salvar");
    fireEvent.input(nome, {target: {value: nomeParam}});
    fireEvent.input(sigla, {target: {value: siglaParam}});

    await act(async () => {
        fireEvent.submit(submitButton);
    });
    
    if(!isNomeValido){
        expect(container.querySelector("#nome_err_msg").innerHTML).toContain(msgEsperada);
    }
    if(!isSiglaValida){
        expect(container.querySelector("#sigla_err_msg").innerHTML).toContain(msgEsperada);
    }
    if(isNomeValido && isSiglaValida){
        expect(history.location.pathname).toBe(path);
    }
}

describe("ListagemProjeto unit", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
          return callback(mockAppState);
        });
    });
    
    afterEach(() => {
        useSelector.mockClear();
        addProjetoServer.mockClear();
    });


    test('Carregar form novo', () => {
        render(<FormProjeto/>, { wrapper: MemoryRouter });
        expect(screen.getByText(/Novo Projeto/i)).toBeInTheDocument()
    });

    
    test('Carregar form update', () => {
        let projetoId = 1;
        render(
            <MemoryRouter initialEntries={[`/projetos/${projetoId}`]}>
                <Route path="/projetos/:id">
                    <FormProjeto/>
                </Route>
            </MemoryRouter>
             );
        expect(screen.getByText(/Alteração de Projeto/i)).toBeInTheDocument()
    });

    test('Update válido', async () => {
        let projetoId = 1;
        const history = createMemoryHistory();
        let {container} = render(
            <MemoryRouter history={history} initialEntries={[`/projetos/${projetoId}`]}>
                <Route path="/projetos/:id">
                    <FormProjeto/>
                </Route>
            </MemoryRouter>
        );

        expect(screen.getByText(/Alteração de Projeto/i)).toBeInTheDocument();

        const nome = container.querySelector("#nome");
        const sigla = container.querySelector("#sigla");
        const submitButton = container.querySelector("#Salvar");
        fireEvent.input(nome, {target: {value: 'Nome'}});
        fireEvent.input(sigla, {target: {value: 'Sig'}});

        await act(async () => {
            fireEvent.submit(submitButton);
        });
        
        expect(updateProjetoServer).toHaveBeenCalledTimes(1);
        expect(history.location.pathname).toBe('/');
        
    });

    test('Carregar id que não existe', () => {
        let projetoId = 2;
        render(
            <MemoryRouter initialEntries={[`/projetos/${projetoId}`]}>
                <Route path="/projetos/:id">
                    <FormProjeto/>
                </Route>
            </MemoryRouter>
             );
        expect(screen.getByText(/Novo Projeto/i)).toBeInTheDocument();
    });

    //####### CAMPO NOME ################################
    test('Nome Vazio', async () => {
        fieldTest('', 'abc', false, true, "O campo é obrigatório.")
    });

    test('Nome limite inferior válido', async () => {
        await fieldTest('N', 'abc', true, true, null, '/projetos');
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Nome válido', async () => {
        await fieldTest('Nome', 'abc', true, true, null, '/projetos');
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Nome limite superior válido -1', async () => {
        await fieldTest('01234567890123456789012345678', 'abc', true, true, null, '/projetos');
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Nome limite superior válido', async () => {
        await fieldTest('012345678901234567890123456789', 'abc', true, true, null, '/projetos');
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Nome limite superior inválido', async () => {
        await fieldTest('0123456789012345678901234567890', 'abc', false, true, 'O campo deve ter no máximo 30 caracteres.');
        expect(addProjetoServer).toHaveBeenCalledTimes(0);
    });

    //####### CAMPO SIGLA ################################
    test('Sigla Vazia', async () => {
        fieldTest('Projeto', '', true, false, "O campo é obrigatório.")
    });

    test('Sigla limite inferior válido', async () => {
        await fieldTest('Projeto', 'P', true, true, null, '/projetos');
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Sigla válido', async () => {
        await fieldTest('Projeto', 'PRO', true, true, null, '/projetos');
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Sigla limite superior válido -1', async () => {
        await fieldTest('Projeto', '1234', true, true, null, '/projetos');
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Sigla limite superior válido', async () => {
        await fieldTest('Projeto', '12345', true, true, null, '/projetos');
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Sigla limite superior inválido', async () => {
        await fieldTest('Projeto', '123456', true, false, 'O campo deve ter no máximo 5 caracteres.');
        expect(addProjetoServer).toHaveBeenCalledTimes(0);
    });

    //##########################################################


});