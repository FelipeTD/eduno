import { SET_INICIO } from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'

export const setInicio = inicioObjeto => {
    return {
        type: SET_INICIO,
        payload: inicioObjeto
    }
}

export const fetchInicio = token => {

    return dispatch => {
        var config = {
            headers: {'x-access-token': token,
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

                // dispatch(setMessage({
                //     title: 'Sucess',
                //     text: filhos[0].nome.toString()
                // }))

                const inicioObjeto = {
                    descricao: 'Filhos',
                    filhos: filhos
                }

                dispatch(setInicio(inicioObjeto))
            })
    }
}