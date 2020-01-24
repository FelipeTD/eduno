import { SET_INICIO, LOADING_INICIO, INICIO_LOADED  } from '../actions/actionTypes'

const initialState = {
    descricao: 'Meus Filhos',
    filhos: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INICIO:
            return {
                ...state,
                descricao: action.payload.descricao,
                filhos: action.payload.filhos
            }
        default:
            return state
    }
}

export default reducer