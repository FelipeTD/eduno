import { SET_PROVAS, ATUALIZA_PROVAS } from './actionTypes'
import { setMessage } from './message'
import { baseUrl } from '../../Enums/Api'
import axios from 'axios'

export const atualizaProvas = provas => {
    return {
        type: ATUALIZA_PROVAS,
        payload: provas
    }
}

export const setProvas = provaObjeto => {
    return {
        type: SET_PROVAS,
        payload: provaObjeto
    }
}

export const fetchProvas = (token, filhos, id) => {

    const date = new Date()
    const ano = date.getFullYear().toString()
    const mes = date.getMonth() + 1
    const mesFormatado = mes.toString()

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
        axios.get(`${baseUrl}/prova/${data}/${codcurso}/${codserie}/${codturma}
                    /${ra}/${ano}-${mesFormatado}`, config)
            .catch(err => {
                if (err.response.status === 400) {
                    const provaObjeto = {
                        mes: mes,
                        ano: ano,
                        provas: []
                    }

                    dispatch(setProvas(provaObjeto))
                } else {
                    dispatch(setMessage({
                        title: 'Erro',
                        text: err
                    }))
                }
            })
            .then( res => {
                const rawProvas = res.data.notas
                const provas = []
                for (let key in rawProvas) {
                    provas.push({
                        ...rawProvas[key],
                        id: key
                    })
                }

                const datas = []
                if (provas.length > 0) {

                    for (let x = 0; x < provas.length; x++) {
                        datas.push({
                            data: provas[x].data
                        })
                    }
                }

                const provaObjeto = {
                    mes: mes,
                    ano: ano,
                    provas: provas,
                    datas: datas
                }

                dispatch(setProvas(provaObjeto))
            })
    }
}

export const refreshProvas = (mes, ano, token, filhos, id) => {

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

        axios.get(`${baseUrl}/prova/${data}/${codcurso}/${codserie}/${codturma}
                    /${ra}/${ano}-${mes}`, config)
            .catch(err => {
                if (err.response.status === 400) {
                    const provaObjeto = {
                        mes: mes,
                        ano: ano,
                        provas: []
                    }

                    dispatch(setProvas(provaObjeto))
                } else {
                    dispatch(setMessage({
                        title: 'Erro',
                        text: err
                    }))
                }
            })
            .then(res => {
                const rawProvas = res.data.notas
                const provas = []
                for (let key in rawProvas) {
                    provas.push({
                        ...rawProvas[key],
                        id: key
                    })
                }

                const datas = []
                if (provas.length > 0) {

                    for (let x = 0; x < provas.length; x++) {
                        datas.push({
                            data: provas[x].data
                        })
                    }
                }

                const provaObjeto = {
                    mes: mes,
                    ano: ano,
                    provas: provas,
                    datas: datas
                }

                dispatch(setProvas(provaObjeto))
            })
    }
}