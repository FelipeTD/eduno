import { ATUALIZA_HORARIOS, SET_HORARIOS } from '../actions/actionTypes'

const initialState = {
    dia: 1,
    diaDaSemana: 'Segunda',
    horarios: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ATUALIZA_HORARIOS:
            return {
                ...state,
                dia: action.payload.dia,
                diaDaSemana: action.payload.diaDaSemana,
                horarios: action.payload.horarios
            }
        case SET_HORARIOS:
            return {
                ...state,
                dia: action.payload.dia,
                diaDaSemana: action.payload.diaDaSemana,
                horarios: action.payload.horarios
            }
        default:
            return state
    }
}

export default reducer