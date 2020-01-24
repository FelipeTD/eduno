import { SET_NOTICIA_DETALHADA } from '../actions/actionTypes'

const initialState = {
    ident: '',
    titul: '',
    sinop: '',
    atual: '',
    detlh: '',
    image: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTICIA_DETALHADA:
            return {
                ...state,
                ident: action.payload.ident,
                titul: action.payload.titul,
                sinop: action.payload.sinop,
                atual: action.payload.atual,
                detlh: action.payload.detlh,
                image: action.payload.image
            }
        default:
            return state
    }
}

export default reducer