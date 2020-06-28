import { ATUALIZA_HORARIOS, SET_HORARIOS } from './actionTypes'
import { setMessage } from './message'
import { baseUrl } from '../../Enums/Api'
import axios from 'axios'
import { Alert } from 'react-native'
import { diasDaSemana } from '../../Enums/dateUtil'

export const atualizaHorarios = quadro => {
    return {
        type: ATUALIZA_HORARIOS,
        payload: quadro
    }
}

export const setHorarios = quadro => {
    return {
        type: SET_HORARIOS,
        payload: quadro
    }
}

export const refreshHorarios = (quadroRequest, filhos, token, id) => {

    let dia = quadroRequest.dia
    const data = filhos[id].ano.toString()
    const codcurso = filhos[id].codcurso.toString()
    const codserie = filhos[id].codserie.toString()
    const codturma = filhos[id].codturma.toString()
    let diaDaSemana = ''

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    if (quadroRequest.operacao == 'adicionar') {
        if (dia == 1) {
            dia = 2
        }
        if (dia == 6) {
            dia = 1
        }
        dia = dia + 1
    } else if (quadroRequest.operacao == 'subtrair') {
        if (dia == 2 || dia == 1) {
            dia = 7
        }
        dia = dia - 1
    }

    diaDaSemana = diasDaSemana[dia - 2]

    return dispatch => {
        axios.get(`${baseUrl}/horario/${data}/${codcurso}/${codserie}/${codturma}/`, 
                    config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {

                const rawHorarios = res.data.notas
                const horarios = []
                for (let key in rawHorarios) {
                    if (rawHorarios[key].dia_semana == dia) {
                        horarios.push({
                            ...rawHorarios[key],
                            id: key
                        })
                    }
                }

                const quadro = {
                    dia: dia,
                    diaDaSemana: diaDaSemana,
                    horarios: horarios
                }

                dispatch(atualizaHorarios(quadro))
            })
    }

}

export const fetchHorarios = (token, filhos, id) => {

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    const data = filhos[id].ano.toString()
    const codcurso = filhos[id].codcurso.toString()
    const codserie = filhos[id].codserie.toString()
    const codturma = filhos[id].codturma.toString()

    return dispatch => {
        axios.get(`${baseUrl}/horario/${data}/${codcurso}/${codserie}/${codturma}/`,
                    config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {
                const rawHorarios = res.data.notas
                const horarios = []

                const semana = ['Segunda', 'Segunda', 'Terça', 'Quarta', 'Quinta',
                                'Sexta', 'Segunda'];
                const dataSemana = new Date()

                let diaNumerico = dataSemana.getDay()

                if (diaNumerico == 0 || diaNumerico == 6) {
                    diaNumerico = 2
                } else {
                    diaNumerico++
                }
            
                const diaExtenso = semana[dataSemana.getDay()].toString()

                for (let key in rawHorarios) {
                    if (rawHorarios[key].dia_semana == diaNumerico) {
                        horarios.push({
                            ...rawHorarios[key],
                            id: key
                        })
                    }
                }

                const quadro = {
                    dia: diaNumerico,
                    diaDaSemana: diaExtenso,
                    horarios: horarios
                }

                dispatch(setHorarios(quadro))
            })
    }
}