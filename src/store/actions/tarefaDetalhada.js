import { SET_TAREFA_DETALHADA } from './actionTypes'
import { setMessage } from './message'


export const setTarefaDetalhada = tarefa => {
    return {
        type: SET_TAREFA_DETALHADA,
        payload: tarefa
    }
}

export const fetchTarefaDetalhada = requestTarefa => {

    return dispatch => {

        const tarefa = {
            disciplina: requestTarefa.disciplina,
            titulo: requestTarefa.titulo,
            data_entrega: requestTarefa.data_entrega,
            detalhe: requestTarefa.detalhe
        }

        dispatch(setTarefaDetalhada(tarefa))
    }
    
}