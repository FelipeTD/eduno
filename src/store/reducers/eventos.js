import { SET_EVENTOS, ATUALIZA_EVENTOS } from '../actions/actionTypes'

const initialState = {
    mes: '',
    ano: '',
    eventos: [],
    datas: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENTOS:
            return {
                ...state,
                mes: action.payload.mes,
                ano: action.payload.ano,
                eventos: action.payload.eventos,
                datas: action.payload.datas
            }
        case ATUALIZA_EVENTOS:
            return {
                ...state,
                mes: action.payload.mes,
                ano: action.payload.ano,
                eventos: action.payload.eventos,
                datas: action.payload.datas
            }
        default:
            return state
    }
}

export default reducer