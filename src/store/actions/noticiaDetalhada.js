import { SET_NOTICIA_DETALHADA } from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'
import { Alert } from 'react-native'

export const setNoticiaDetalhada = noticia => {
    return {
        type: SET_NOTICIA_DETALHADA,
        payload: noticia
    }
}

export const fetchNoticiaDetalhada = (requestNoticia, token) => {

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    return dispatch => {
        // dispatch(setMessage({
        //     title: 'Sucess',
        //     text: 'Tortora'
        // }))
        axios.get(`http://eduno.com.br:4827/noticia/${requestNoticia.ident}`, config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {
                
                const noticia = {
                    ident: requestNoticia.ident,
                    titul: res.data.titul,
                    sinop: res.data.sinop,
                    detlh: res.data.detlh,
                    atual: res.data.atual,
                    image: res.data.foto
                }

                // dispatch(setMessage({
                //     title: 'Sucess',
                //     text: res.data.foto.toString()
                // }))

                dispatch(setNoticiaDetalhada(noticia))
            })
    }

}