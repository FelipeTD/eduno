import { SET_PROVAS, ATUALIZA_PROVAS } from '../actions/actionTypes'

const initialState = {
    mes: '',
    ano: '',
    provas: [],
    datas: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROVAS:
            return {
                ...state,
                mes: action.payload.mes,
                ano: action.payload.ano,
                provas: action.payload.provas,
                datas: action.payload.datas
            }
        case ATUALIZA_PROVAS:
            return {
                ...state,
                mes: action.payload.mes,
                ano: action.payload.ano,
                provas: action.payload.provas,
                datas: action.payload.datas
            }
        default:
            return state
    }
}

export default reducer