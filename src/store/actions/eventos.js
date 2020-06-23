import { ATUALIZA_EVENTOS, SET_EVENTOS } from './actionTypes'
import { setMessage } from './message'
import { baseUrl } from '../../Enums/Api'
import axios from 'axios'

export const atualizaEventos = eventos => {
    return {
        type: ATUALIZA_EVENTOS,
        payload: eventos
    }
}

export const setEventos = eventoObjeto => {
    return {
        type: SET_EVENTOS,
        payload: eventoObjeto
    }
}

export const fetchEventos = (token, filhos, id) => {

    const date = new Date()
    const ano = date.getFullYear().toString()
    const mes = date.getMonth() + 1
    let mesFormatado = ''
    if (mes > 9) {
        mesFormatado = mes.toString()
    } else {
        mesFormatado = '0' + mes.toString()
    }

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    const data = filhos[id].ano.toString()

    return dispatch => {
        axios.get(`${baseUrl}/evento/${data}`, config)
            .catch(err => {
                if (err.response.status === 400) {
                    const eventoObjeto = {
                        mes: mes,
                        ano: ano,
                        eventos: [],
                        datas: []
                    }

                    dispatch(setEventos(eventoObjeto))
                } else {
                    dispatch(setMessage({
                        title: 'Erro',
                        text: err
                    }))
                }
            })
            .then(res => {
                // Adicionar dados mockados
                // res.data.notas.push({
                //         "disciplina": "2020-04-11T03:00:00.000Z",
                //         "tipo": "Recesso",
                //         "titulo": "RECESSO DE CARNAVAL",
                //         "publico": "Escola",
                //         "detalhe": null
                //     })
                const rawEventos = res.data.notas
                const eventos = []
                for (let key in rawEventos) {
                    eventos.push({
                        ...rawEventos[key],
                        id: key
                    })
                }

                // dispatch(setMessage({
                //     title: 'Sucess',
                //     text: eventos[x].toString()
                // }))

                let eventosMensais = []

                for (let x = 0; x < eventos.length; x++) {
                    if (mesFormatado == eventos[x].disciplina.toString().substring(5, 7)) {
                        eventosMensais.push(eventos[x])
                    }
                }

                const datas = []
                if (eventosMensais.length > 0) {
                    for (let x = 0; x < eventosMensais.length; x++) {
                        datas.push({
                            data: eventosMensais[x].disciplina.toString().substring(0,10)
                        })
                    }
                }

                const eventoObjeto = {
                    mes: mes,
                    ano: ano,
                    eventos: eventosMensais,
                    datas: datas
                }

                dispatch(setEventos(eventoObjeto))
            })
    }
}

export const refreshEventos = (mes, ano, token) => {

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    let mesFormatado = ''
    if (mes > 9) {
        mesFormatado = mes.toString()
    } else {
        mesFormatado = '0' + mes.toString()
    }

    return dispatch => {
        axios.get(`${baseUrl}/evento/${ano}`, config)
            .catch(err => {
                if (err.response.status === 400) {
                    const eventoObjeto = {
                        mes: mes,
                        ano: ano,
                        eventos: [],
                        datas: []
                    }

                    dispatch(setEventos(eventoObjeto))
                } else {
                    dispatch(setMessage({
                        title: 'Erro',
                        text: err
                    }))
                }
            })
            .then(res => {
                const rawEventos = res.data.notas
                const eventos = []
                for (let key in rawEventos) {
                    eventos.push({
                        ...rawEventos[key],
                        id: key
                    })
                }

                let eventosMensais = []

                for (let x = 0; x < eventos.length; x++) {
                    if (mesFormatado == eventos[x].disciplina.toString().substring(5, 7)) {
                        eventosMensais.push(eventos[x])
                    }
                }

                const datas = []
                if (eventosMensais.length > 0) {

                    for (let x = 0; x < eventosMensais.length; x++) {
                        datas.push({
                            data: eventosMensais[x].disciplina.toString().substring(0,10)
                        })
                    }
                }

                const eventoObjeto = {
                    mes: mes,
                    ano: ano,
                    eventos: eventosMensais,
                    datas: datas
                }

                dispatch(setEventos(eventoObjeto))
            })
    }
}