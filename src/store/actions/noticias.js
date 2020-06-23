import { SET_NOTICIAS } from './actionTypes'
import { setMessage } from './message'
import { baseUrl } from '../../Enums/Api'
import axios from 'axios'

export const setNoticias = dadosNoticias => {
    return {
        type: SET_NOTICIAS,
        payload: dadosNoticias
    }
}

export const fetchNoticias = (token) => {

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    return dispatch => {
        axios.get(`${baseUrl}/noticias`, config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {
                const rawNoticias = res.data.noticias
                const noticias = []
                for (let key in rawNoticias) {
                    noticias.push({
                        ...rawNoticias[key],
                        id: key
                    })
                }

                const dadosNoticias = {
                    ident: 1,
                    descricao: 'Tortora 2',
                    noticias: noticias
                }

                dispatch(setNoticias(dadosNoticias))
            })
    }
}