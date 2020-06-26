import { ATUALIZA_ETAPA, SET_ETAPA } from './actionTypes'
import { setMessage } from './message'
import { baseUrl } from '../../Enums/Api'
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

    let numeroEtapa = requestNotas.numeroEtapa
    const data = filhos[id].ano.toString()
    const codcurso = filhos[id].codcurso.toString()
    const codserie = filhos[id].codserie.toString()
    const codturma = filhos[id].codturma.toString()
    const ra = filhos[id].ra.toString()
    const operacao = requestNotas.operacao
    const numEtapas = filhos[id].numEtapas

    if (operacao == 'adicionar') {
        if ((numEtapas == 4 && numeroEtapa == 4) || (numEtapas == 3 && numeroEtapa == 3)) {
            numeroEtapa = 0
        }
        numeroEtapa = parseInt(numeroEtapa) + 1
    } else if (operacao == 'subtrair') {
        if (numEtapas == 4 && numeroEtapa == 1) {
            numeroEtapa = 5
        } else if (numEtapas == 3 && numeroEtapa == 1) {
            numeroEtapa = 4
        }
        numeroEtapa = parseInt(numeroEtapa) - 1
    }

    let descricao = numeroEtapa + 'º etapa'

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    return dispatch => {
        // dispatch(setMessage({
        //     title: 'Sucess',
        //     text: operacao.toString()
        // }))
        axios.get(`${baseUrl}/nota/${data}/${codcurso}/${codserie}/${codturma}
                    /${ra}/${numeroEtapa}`, config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {
                const rawNotas = res.data.notas
                const valor = res.data.valor
                const notas = []
                for (let key in rawNotas) {
                    notas.push({
                        ...rawNotas[key],
                        id: key
                    })
                }
                const etapa = {
                    numeroEtapa: numeroEtapa,
                    descricao: descricao,
                    valor: valor,
                    notas: notas
                }
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
    const etapa_atual = filhos[id].etapAtual.toString()

    return dispatch => {

        axios.get(`${baseUrl}/nota/${data}/${codcurso}/${codserie}/${codturma}
                    /${ra}/${etapa_atual}`, config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {
                const rawNotas = res.data.notas
                const valor = res.data.valor
                // dispatch(setMessage({
                //     title: 'Sucess',
                //     text: valor_etapa.toString()
                // }))
                const notas = []
                for (let key in rawNotas) {
                    notas.push({
                        ...rawNotas[key],
                        id: key
                    })
                }
                const etapa = {
                    numeroEtapa: etapa_atual,
                    descricao: `${etapa_atual}º etapa`,
                    valor: valor,
                    notas: notas
                }

                dispatch(setNotas(etapa))
            })
    }
}