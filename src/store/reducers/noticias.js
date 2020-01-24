import { SET_NOTICIAS } from '../actions/actionTypes'

const initialState = {
    ident: 1,
    descricao: 'Tortora',
    noticias: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTICIAS:
            return {
                ...state,
                ident: action.payload.ident,
                descricao: action.payload.descricao,
                noticias: action.payload.noticias
            }
        default:
            return state
    }
}

export default reducer