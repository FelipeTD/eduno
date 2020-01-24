import { SET_TAREFA_DETALHADA } from '../actions/actionTypes'

const initialState = {
    disciplina: '',
    titulo: '',
    data_entrega: '',
    detalhe: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TAREFA_DETALHADA:
            return {
                ...state,
                disciplina: action.payload.disciplina,
                titulo: action.payload.titulo,
                data_entrega: action.payload.data_entrega,
                detalhe: action.payload.detalhe
            }
        default:
            return state
    }
}

export default reducer