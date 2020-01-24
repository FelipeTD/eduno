import { ATUALIZA_ETAPA, SET_ETAPA } from '../actions/actionTypes'

const initialState = {
    numeroEtapa: 1,
    descricao: '1º etapa',
    notas: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ATUALIZA_ETAPA:
            return {
                ...state,
                numeroEtapa: action.payload.numeroEtapa,
                descricao: action.payload.descricao,
                notas: action.payload.notas
            }
        case SET_ETAPA:
            return {
                ...state,
                numeroEtapa: action.payload.numeroEtapa,
                descricao: action.payload.descricao,
                notas: action.payload.notas
            }
        default:
            return state
    }
}

export default reducer