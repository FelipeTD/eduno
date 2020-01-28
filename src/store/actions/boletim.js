import { ATUALIZA_ETAPA, SET_ETAPA } from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'
import { Alert } from 'react-native'

export const atualizaEtapa = etapa => {
    return {
        type: ATUALIZA_ETAPA,
        payload: etapa
    }
}

export const setNotas = etapa => {
    return {
        type: SET_ETAPA,
        payload: etapa
    }
}

export const refreshNotas = (requestNotas, filhos, token, id) => {

    const numeroEtapa = requestNotas.numeroEtapa
    const data = filhos[id].ano.toString()
    const codcurso = filhos[id].codcurso.toString()
    const codserie = filhos[id].codserie.toString()
    const codturma = filhos[id].codturma.toString()
    const ra = filhos[id].ra.toString()

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    return dispatch => {
        // dispatch(setMessage({
        //     title: 'Sucess',
        //     text: filhos[id].numEtapas.toString()
        // }))
        axios.get(`http://eduno.com.br:4827/nota/${data}/${codcurso}/${codserie}/${codturma}
                    /${ra}/${numeroEtapa}`, config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {
                const rawNotas = res.data.notas
                const notas = []
                for (let key in rawNotas) {
                    notas.push({
                        ...rawNotas[key],
                        id: key
                    })
                }
                const etapa = {
                    numeroEtapa: requestNotas.numeroEtapa,
                    descricao: requestNotas.descricao,
                    notas: notas
                }

                // dispatch(setPosts(posts.reverse()))
                dispatch(atualizaEtapa(etapa))
            })
    }
}

export const fetchNotas = (token, filhos, id) => {

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    const data = filhos[id].ano.toString()
    const codcurso = filhos[id].codcurso.toString()
    const codserie = filhos[id].codserie.toString()
    const codturma = filhos[id].codturma.toString()
    const ra = filhos[id].ra.toString()

    return dispatch => {

        axios.get(`http://eduno.com.br:4827/nota/${data}/${codcurso}/${codserie}/${codturma}
                    /${ra}/1`, config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {
                const rawNotas = res.data.notas
                const notas = []
                for (let key in rawNotas) {
                    notas.push({
                        ...rawNotas[key],
                        id: key
                    })
                }
                const etapa = {
                    numeroEtapa: 1,
                    descricao: '1º etapa',
                    notas: notas
                }

                dispatch(setNotas(etapa))
            })
    }
}