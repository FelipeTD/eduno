import { ATUALIZA_TAREFA, SET_TAREFAS } from '../actions/actionTypes'

const initialState = {
    operacao: '',
    numeroEtapaTarefa: 0,
    data: '01/01/2000',
    tarefas: [],
    tarefaAtual: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ATUALIZA_TAREFA:
            return {
                ...state,
                operacao: action.payload.operacao,
                numeroEtapaTarefa: action.payload.numeroEtapaTarefa,
                data: action.payload.data,
                tarefas: action.payload.tarefas,
                tarefaAtual: action.payload.tarefaAtual
            }
        case SET_TAREFAS:
            return {
                ...state,
                operacao: action.payload.operacao,
                numeroEtapaTarefa: action.payload.numeroEtapaTarefa,
                data: action.payload.data,
                tarefas: action.payload.tarefas,
                tarefaAtual: action.payload.tarefaAtual
            }
        default:
            return state
    }
}

export default reducer