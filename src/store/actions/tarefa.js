import { ATUALIZA_TAREFA, SET_TAREFAS } from './actionTypes'
import { setMessage } from './message'
import { baseUrl } from '../../Enums/Api'
import axios from 'axios'
import { Alert } from 'react-native'

export const atualizaTarefa = tarefa => {
    return {
        type: ATUALIZA_TAREFA,
        payload: tarefa
    }
}

export const setTarefas = tarefaObjeto => {
    return {
        type: SET_TAREFAS,
        payload: tarefaObjeto
    }
}

export const refreshTarefas = (requestTarefas, filhos, token, id) => {

    let numeroEtapaTarefa = requestTarefas.numeroEtapaTarefa
    const data = filhos[id].ano.toString()
    const codcurso = filhos[id].codcurso.toString()
    const codserie = filhos[id].codserie.toString()
    const codturma = filhos[id].codturma.toString()

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    if (requestTarefas.operacao == 'adicionar') {
        const limite = requestTarefas.tarefas.length - 1
        if (numeroEtapaTarefa == limite) {
            numeroEtapaTarefa = 0
        } else {
            numeroEtapaTarefa = numeroEtapaTarefa + 1
        }
    } else if (requestTarefas.operacao == 'subtrair') {
        if (numeroEtapaTarefa == 0) {
            numeroEtapaTarefa = requestTarefas.tarefas.length - 1
        } else {
            numeroEtapaTarefa = numeroEtapaTarefa - 1
        }
    }

    return dispatch => {

        axios.get(`${baseUrl}/tarefa/${data}/${codcurso}/${codserie}/${codturma}
                    /1`, config)
            .catch(err => {
                if (err.response.status === 400) {
                    const tarefaObjeto = {
                        numeroEtapaTarefa: numeroEtapaTarefa,
                        data: requestTarefas.data,
                        tarefas: [],
                        tarefaAtual: []
                    }

                    dispatch(setTarefas(tarefaObjeto))
                } else {
                    dispatch(setMessage({
                        title: 'Erro',
                        text: err
                    }))
                }
            })
            .then(res => {
                if (res.data.rc.toString() === '00') {
                    const rawTarefas = res.data.notas
                    const tarefas = []
                    for (let key in rawTarefas) {
                        tarefas.push({
                            ...rawTarefas[key],
                            id: key
                        })
                    }

                    let tarefasRetorno = []
                    tarefasRetorno.push({
                        ...rawTarefas[numeroEtapaTarefa],
                        id: 0
                    })               

                    const tarefaObjeto = {
                        numeroEtapaTarefa: numeroEtapaTarefa,
                        data: '1º etapa',
                        tarefas: tarefas,
                        tarefaAtual: tarefasRetorno
                    }

                    dispatch(setTarefas(tarefaObjeto))
                }
            })
    }
}

export const fetchTarefas = (token, filhos, id) => {

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    const data = filhos[id].ano.toString()
    const codcurso = filhos[id].codcurso.toString()
    const codserie = filhos[id].codserie.toString()
    const codturma = filhos[id].codturma.toString()

    return dispatch => {
        axios.get(`${baseUrl}/tarefa/${data}/${codcurso}/${codserie}/${codturma}/1`,
                     config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {
                const rawTarefas = res.data.notas
                const tarefas = []
                for (let key in rawTarefas) {
                    tarefas.push({
                        ...rawTarefas[key],
                        id: key
                    })
                }

                const tarefasRetorno = []
                tarefasRetorno.push({
                    ...rawTarefas[0],
                    id: 0
                }) 

                const tarefaObjeto = {
                    numeroEtapaTarefa: 0,
                    data: '1º etapa',
                    tarefas: tarefas,
                    tarefaAtual: tarefasRetorno
                }

                dispatch(setTarefas(tarefaObjeto))
            })
    }
}