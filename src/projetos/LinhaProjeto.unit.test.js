import React from 'react';
import { render, screen } from '@testing-library/react';
import LinhaProjeto from './LinhaProjeto';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('LinhaProjeto unit', function () {

    test('props vazio', () => {
        render(<table><tbody><LinhaProjeto /></tbody></table>);
        expect(screen.getByText(/Não foi possível exibir o projeto./i)).toBeInTheDocument()
    });

    test('projeto sem id', () => {
        render(<table><tbody><LinhaProjeto projeto={{}} /></tbody></table>);
        expect(screen.getByText(/Não foi possível exibir o projeto./i)).toBeInTheDocument()
    });

    test('projeto sem nome e sem sigla', () => {
        render(<table><tbody><LinhaProjeto projeto={{id: 1}} /></tbody></table>, { wrapper: MemoryRouter });
        expect(screen.queryByText(/undefined./i)).not.toBeInTheDocument();
    });

    test('projeto com nome e com sigla', () => {
        render(<table><tbody><LinhaProjeto projeto={{id: 1, nome: 'Projeto 1', sigla: 'P1'}} /></tbody></table>, { wrapper: MemoryRouter });
        expect(screen.queryByText(/Projeto 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/P1/i)).toBeInTheDocument();
    });

    test('projeto click editar', () => {
        const history = createMemoryHistory();
        let projeto = {id: 1, nome: 'Projeto 1'};
        render(<Router history={history}><table><tbody><LinhaProjeto projeto={projeto} /></tbody></table></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/Projeto 1/i), leftClick);
        expect(history.location.pathname).toBe('/projetos/1');
    });

    test('projeto click excluir', () => {
        const mockExcluirHandler = jest.fn();
        let projeto = {id: 1, nome: 'Projeto 1'};
        let dom = render(<table><tbody><LinhaProjeto projeto={projeto} onClickExcluirProjeto={mockExcluirHandler} /></tbody></table>, { wrapper: MemoryRouter });
        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#excluir_projeto"), leftClick);
        expect(mockExcluirHandler).toHaveBeenCalledTimes(1);
        expect(mockExcluirHandler).toHaveBeenCalledWith(1);
    });
});
