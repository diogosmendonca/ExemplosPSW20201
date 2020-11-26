import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import TabelaProjetos from './TabelaProjetos';


describe('TabelaProjeto Integration', function () {


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
