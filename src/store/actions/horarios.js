import { ATUALIZA_HORARIOS, SET_HORARIOS } from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'

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

    const dia = quadroRequest.dia
    const data = filhos[id].ano.toString()
    const codcurso = filhos[id].codcurso.toString()
    const codserie = filhos[id].codserie.toString()
    const codturma = filhos[id].codturma.toString()

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    return dispatch => {
        axios.get(`http://eduno.com.br:4827/horario/${data}/${codcurso}/${codserie}/${codturma}/`, 
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
                    diaDaSemana: quadroRequest.diaDaSemana,
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
        axios.get(`http://eduno.com.br:4827/horario/${data}/${codcurso}/${codserie}/${codturma}/`,
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