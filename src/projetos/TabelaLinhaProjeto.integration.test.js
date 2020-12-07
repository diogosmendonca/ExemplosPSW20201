import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import TabelaProjetos from './TabelaProjetos';

import userEvent from '@testing-library/user-event'


describe('Tabela x Linha Projeto Integration', function () {


    test('Exibição N projetos - TabelaProjeto integrado com LinhaProjeto', () => {
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

    test('Chamada da exclusão - TabelaProjeto integrado com LinhaProjeto', () => {
        
        const mockExcluirHandler = jest.fn();
        
        const projetos = []
        for(let i = 1; i < 10; i++){
            projetos.push({id:i, nome: 'Projeto ' + i, sigla: 'P' + i, })
        }

        let dom = render(<TabelaProjetos projetos={projetos} onClickExcluirProjeto={mockExcluirHandler} />, { wrapper: MemoryRouter });
        for(let i = 1; i < 10; i++){
            expect(screen.getByText("Projeto " + i)).toBeInTheDocument();
            expect(screen.getByText("P" + i)).toBeInTheDocument();
        }

        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#excluir_projeto_3"), leftClick);

        expect(mockExcluirHandler).toHaveBeenCalledTimes(1);
        expect(mockExcluirHandler).toHaveBeenCalledWith(3);
    });


});
