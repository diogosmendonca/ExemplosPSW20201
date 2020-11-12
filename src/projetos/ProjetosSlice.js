


  const initialProjects = [{id: 1, nome: 'Pro 1', sigla: 'P1'},
                           {id: 2, nome: 'Pro 2', sigla: 'P2'}];

  export default function projetosReducer(projetos = initialProjects /*state*/, action ){
    switch(action.type){
      case 'add_project': /* payload: projeto */
        let proxId = 1 + projetos.map(p => p.id).reduce((x, y) => Math.max(x,y));
        return projetos.concat([{...action.payload, id: proxId}]);
      case 'update_project': /* payload: projeto */
        let index = projetos.map(p => p.id).indexOf(action.payload.id);
        let projetosUpdated = projetos.slice();
        projetosUpdated.splice(index, 1, action.payload);
        return projetosUpdated;
      case 'delete_project': /* payload: id */
        return projetos.filter((p) => p.id !== action.payload);
      default:
        return projetos;
    }
  }
