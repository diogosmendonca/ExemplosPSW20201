import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import {TabelaProjetos} from './TabelaProjetos';


describe('TabelaProjeto', function () {

    //######## TABELA PROJETOS UNITÁRIO #################################
    test('props vazio', () => {
        render(<TabelaProjetos  />);
        expect(screen.getByText(/Não existem projetos a serem exibidos./i)).toBeInTheDocument()
    });

    test('projetos vazio', () => {
        render(<TabelaProjetos projetos={[]}  />);
        expect(screen.getByText(/Não existem projetos a serem exibidos./i)).toBeInTheDocument()
        
    });

    //######## TABELA PROJETOS INTEGRAÇÃO #################################
    test('um projeto - integrado com LinhaProjeto', () => {
        render(<TabelaProjetos projetos={[{id:1, nome: 'Projeto 1', sigla: 'P1'}]}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Projeto 1/i)).toBeInTheDocument();
    });

    test('dois projetos - integrado com LinhaProjeto', () => {
        const projetos = [{id:1, nome: 'Projeto 1', sigla: 'P1'},
                          {id:2, nome: 'Projeto 2', sigla: 'P2'}]
        render(<TabelaProjetos projetos={projetos}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Projeto 1/i)).toBeInTheDocument();
        expect(screen.getByText(/P1/i)).toBeInTheDocument();
        expect(screen.getByText(/Projeto 2/i)).toBeInTheDocument();
        expect(screen.getByText(/P2/i)).toBeInTheDocument();
    });

    test('N projetos - integrado com LinhaProjeto', () => {
        const projetos = []
        for(let i = 1; i < 10; i++){
            projetos.push({id:i, nome: 'Projeto ' + i, sigla: 'P' + i})
        }

        render(<TabelaProjetos projetos={projetos}  />, { wrapper: MemoryRouter });
        for(let i = 1; i < 10; i++){
            expect(screen.getByText("Projeto " + i)).toBeInTheDocument();
            expect(screen.getByText("P" + i)).toBeInTheDocument();

        }
    });

});
