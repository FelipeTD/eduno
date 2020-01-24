import { 
    USER_LOGGED_IN_EDUNO, 
    USER_LOGGED_OUT_EDUNO, 
    LOADING_USER_EDUNO, 
    USER_LOADED_EDUNO,
    ATUALIZA_ID 
} from '../actions/actionTypes'

const initialState = {
    nome: null,
    email: null,
    isLoadingEduno: false,
    token: null,
    filhos: [],
    id: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN_EDUNO:
            return {
                ...state, 
                nome: action.payload.nome,
                email: action.payload.email,
                token: action.payload.token,
                filhos: action.payload.filhos,
                id: action.payload.id
            }
        case USER_LOGGED_OUT_EDUNO:
            return {
                ...initialState
            }
        case LOADING_USER_EDUNO:
            return {
                ...state,
                isLoadingEduno: true
            }
        case USER_LOADED_EDUNO:
            return {
                ...state,
                isLoadingEduno: false
            }
        case ATUALIZA_ID:
            return {
                ...state,
                nome: action.payload.nome,
                email: action.payload.email,
                token: action.payload.token,
                filhos: action.payload.filhos,
                id: action.payload.id
            }
        default:
            return state
    }
}

export default reducer