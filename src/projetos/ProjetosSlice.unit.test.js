//import {store} from '../store';
import projetosReducer, {deleteProjetoServer, fetchProjetos, addProjetoServer, updateProjetoServer, selectAllProjetos} from './ProjetosSlice'
import {httpDelete, httpGet, httpPut, httpPost} from '../utils'
import { configureStore } from '@reduxjs/toolkit'

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
              "nome": "asdasdasd",
              "sigla": "23123",
              "id": 3
            }
        ]));
        
        await store.dispatch(fetchProjetos());
        expect(store.getState().projetos.status).toBe('loaded');
        expect(store.getState().projetos.entities['3']).toEqual(
            {
              "nome": "asdasdasd",
              "sigla": "23123",
              "id": 3
            }
        );
    })

    test('dispatch fetch rejected', async () => {
        httpGet.mockImplementation(() => Promise.reject("err msg"));
        
        await store.dispatch(fetchProjetos());
        expect(store.getState().projetos.status).toBe('failed');
        expect(store.getState().projetos.error).toBe('err msg');
    })

    test('dispatch fetch pending', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

        httpGet.mockImplementation(() => {
            return wait(1000);
        });
        store.dispatch(fetchProjetos());
        jest.advanceTimersByTime(500); //avança no tempo, mas não resolve o promise
        expect(store.getState().projetos.status).toBe('loading');
    })


    test('dispatch addProjeto fullfiled', async () => {
        let projeto = {
            "nome": "asdasdasd",
            "sigla": "23123"
        };
        
        httpPost.mockImplementation(() => Promise.resolve(
            {...projeto, id: 1}
        ));
        
        await store.dispatch(addProjetoServer(projeto));
        expect(store.getState().projetos.status).toBe('saved');
        expect(store.getState().projetos.entities['1']).toEqual(
            {...projeto, id: 1}
        );
    })


    test('dispatch updateProjeto fullfiled', async () => {
        //adiciona o projeto na store
        let projeto = {
            "nome": "asdasdasd",
            "sigla": "23123"
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...projeto, id: 1}
        ));        
        await store.dispatch(addProjetoServer(projeto));
        
        //atualiza o projeto
        
        let projetoUpdated = {
            "nome": "cde",
            "sigla": "abc",
            "id": 1
        };
        httpPut.mockImplementation(() => Promise.resolve(projetoUpdated));
        await store.dispatch(updateProjetoServer(projetoUpdated));
        expect(store.getState().projetos.status).toBe('saved');
        expect(store.getState().projetos.entities['1']).toEqual(projetoUpdated);
    })
    
    test('dispatch deleteProjeto fullfiled', async () => {
        //adiciona o projeto na store
        let projeto = {
            "nome": "asdasdasd",
            "sigla": "23123"
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...projeto, id: 1}
        ));        
        await store.dispatch(addProjetoServer(projeto));
        
        //atualiza o projeto
        httpPut.mockImplementation(() => Promise.resolve({...projeto, id: 1}));
        await store.dispatch(deleteProjetoServer(1));
        expect(store.getState().projetos.status).toBe('deleted');
        expect(store.getState().projetos.ids.length).toBe(0);
    })

    test('selectAll projetos', async () => {
        //adiciona o projeto na store
        let projeto = {
            "nome": "asdasdasd",
            "sigla": "23123"
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...projeto, id: 1}
        ));        
        await store.dispatch(addProjetoServer(projeto));

        expect(selectAllProjetos(store.getState())).toEqual([{...projeto, id: 1}])
    })

    //TODO: Ainda precisaria testar os estados pending de update, delete e add
    //TODO: O que aconteceria se uma promise de add, update ou delete fosse para o estado rejected? Daria defeito? precisaria ser testado também.

})