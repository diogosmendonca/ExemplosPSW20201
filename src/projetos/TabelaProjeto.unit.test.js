import React from 'react'
import { render, screen } from '@testing-library/react'
import TabelaProjetos from './TabelaProjetos'

import { MemoryRouter } from 'react-router-dom'
import LinhaProjeto from './LinhaProjeto'

//Linha mockada, implementação fixa.
jest.mock('./LinhaProjeto', () => jest.fn(() => (<tr><td colSpan={3}>MockedLine</td></tr>)));

describe('TabelaProjeto Unit', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('props vazio', () => {
        render(<TabelaProjetos  />);
        expect(screen.getByText(/Não existem projetos a serem exibidos./i)).toBeInTheDocument()
    });

    test('projetos vazio', () => {
        render(<TabelaProjetos projetos={[]}  />);
        expect(screen.getByText(/Não existem projetos a serem exibidos./i)).toBeInTheDocument() 
    });
    
    test('um projeto', () => {
        render(<TabelaProjetos projetos={[{id:1, nome: 'Projeto 1', sigla: 'P1'}]}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/MockedLine/i)).toBeInTheDocument();
        expect(LinhaProjeto).toHaveBeenCalledTimes(1);
    });

    test('dois projetos', () => {
        const projetos = [{id:1, nome: 'Projeto 1', sigla: 'P1'}, {id:2, nome: 'Projeto 2', sigla: 'P2'}];
        render(<TabelaProjetos projetos={projetos}  />, { wrapper: MemoryRouter });
        expect(LinhaProjeto).toHaveBeenCalledTimes(2);
    });

    test('N projetos', () => {
        const projetos = []
        for(let i = 0; i < 10; i++){
            projetos.push({id:i, nome: 'Projeto ' + i, sigla: 'P' + i})
        }
        render(<TabelaProjetos projetos={projetos}  />, { wrapper: MemoryRouter });
        expect(LinhaProjeto).toHaveBeenCalledTimes(10);
    });

});
