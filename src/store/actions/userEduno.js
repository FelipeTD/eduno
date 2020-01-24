import { 
    USER_LOGGED_IN_EDUNO, 
    USER_LOGGED_OUT_EDUNO, 
    LOADING_USER_EDUNO, 
    USER_LOADED_EDUNO,
    ATUALIZA_ID
} from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'

const authBaseURL = 'http://eduno.com.br:4827'

export const userLoggedEduno = userEduno => {
    return {
        type: USER_LOGGED_IN_EDUNO,
        payload: userEduno
    }
}

export const logoutEduno = () => {
    return {
        type: USER_LOGGED_OUT_EDUNO
    }
}

export const loadingUserEduno = () => {
    return {
        type: LOADING_USER_EDUNO
    }
}

export const userLoadedEduno = () => {
    return {
        type: USER_LOADED_EDUNO
    }
}

export const setID = userEduno => {
    return {
        type: ATUALIZA_ID,
        payload: userEduno
    }
}

export const loginEduno = userEduno => {
    return dispatch => {
        dispatch(loadingUserEduno())
        axios.post(`${authBaseURL}/login`, {
            user: userEduno.user,
            pwd: userEduno.pwd,
            device: userEduno.device,
            empre: userEduno.empre
        })
            .catch(err => {
                if (err.response.status === 400) {
                    delete userEduno.pwd
                    dispatch(setMessage({
                        title: 'Erro',
                        text: 'Usuário ou senha incorretos'
                    }))
                } else {
                    dispatch(setMessage({
                        title: 'Erro',
                        text: err.response.status
                    }))
                }
            })
            .then(res => {
                if (res.data.rc.toString() === '00') {
                    userEduno.token = res.data.token
                    userEduno.nome = res.data.nome
                    userEduno.email = res.data.email
                    delete userEduno.pwd

                    var config = {
                        headers: {'x-access-token': res.data.token,
                                  'x-device-id': '12931293128'}
                    };
                    axios.get('http://eduno.com.br:4827/inicio', config)
                        .catch(err => {
                            dispatch(setMessage({
                                title: 'Erro',
                                text: err
                            }))
                        })
                        .then(res => {
                            const rawFilhos = res.data.filhos
                            const filhos = []
                            for (let key in rawFilhos) {
                                filhos.push({
                                    ...rawFilhos[key],
                                    id: key
                                })
                            }

                            userEduno.filhos = filhos
                            userEduno.id = 0

                            dispatch(userLoggedEduno(userEduno))
                            dispatch(userLoadedEduno())

                        })
                } else {
                    userEduno.token = '403'
                    delete userEduno.pwd
                    // dispatch(logoutEduno())
                }
            })
    }
}

export const recuperaSenha = userEduno => {
    return dispatch => {
        dispatch(setMessage({
            title: 'Sucesso',
            text: `Foi enviado um email para ${userEduno.email} com as instruções para
                  recuperar sua senha`
        }))
    }
}

export const atualizaID = userEduno => {
    return dispatch => {
        dispatch(setID(userEduno))
    }
}