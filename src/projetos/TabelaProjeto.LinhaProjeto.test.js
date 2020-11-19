import React from 'react';
import { render, screen } from '@testing-library/react';
import {LinhaProjeto, TabelaProjetos} from './TabelaProjetos';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

//######## LINHA PROJETO UNITÁRIO #################################
describe('test LinhaProjeto', function () {
    test('LinhaProjeto props vazio', () => {
        render(<LinhaProjeto />);
        expect(screen.getByText(/Não foi possível exibir o projeto./i)).toBeInTheDocument()
    });

    test('LinhaProjeto projeto sem id', () => {
        render(<LinhaProjeto projeto={{}} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Não foi possível exibir o projeto./i)).toBeInTheDocument()
    });

    test('LinhaProjeto projeto sem nome e sem sigla', () => {
        render(<LinhaProjeto projeto={{id: 1}} />, { wrapper: MemoryRouter });
        expect(screen.queryByText(/undefined./i)).not.toBeInTheDocument();
    });

    test('LinhaProjeto projeto click editar', () => {
        const history = createMemoryHistory();
        let projeto = {id: 1, nome: 'Projeto 1'};
        render(<Router history={history}><LinhaProjeto projeto={projeto} /></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/Projeto 1/i), leftClick);
        expect(history.location.pathname).toBe('/projetos/1');
    });

    test('LinhaProjeto projeto click excluir', () => {
        const mockExcluirHandler = jest.fn();
        const history = createMemoryHistory();
        let projeto = {id: 1, nome: 'Projeto 1'};
        render(<Router history={history}><LinhaProjeto projeto={projeto} 
            onClickExcluirProjeto={mockExcluirHandler} /></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/X/i), leftClick);
        expect(mockExcluirHandler).toHaveBeenCalledTimes(1);
        expect(mockExcluirHandler).toHaveBeenCalledWith(1);
    });
});
