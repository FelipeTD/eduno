import { ATUALIZA_TAREFA, SET_TAREFAS } from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'

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

    const numeroEtapaTarefa = requestTarefas.numeroEtapaTarefa
    const data = filhos[id].ano.toString()
    const codcurso = filhos[id].codcurso.toString()
    const codserie = filhos[id].codserie.toString()
    const codturma = filhos[id].codturma.toString()

    var config = {
        headers: {'x-access-token': token,
                  'x-device-id': '12931293128'}
    };

    return dispatch => {

        axios.get(`http://eduno.com.br:4827/tarefa/${data}/${codcurso}/${codserie}/${codturma}
                    /${numeroEtapaTarefa}`, config)
            .catch(err => {
                if (err.response.status === 400) {
                    const tarefaObjeto = {
                        numeroEtapaTarefa: requestTarefas.numeroEtapaTarefa,
                        data: requestTarefas.data,
                        tarefas: []
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

                    const tarefaObjeto = {
                        numeroEtapaTarefa: requestTarefas.numeroEtapaTarefa,
                        data: requestTarefas.data,
                        tarefas: tarefas
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
    const ra = filhos[id].ra.toString()

    return dispatch => {
        axios.get(`http://eduno.com.br:4827/tarefa/${data}/${codcurso}/${codserie}/${codturma}/1`,
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

                const tarefaObjeto = {
                    numeroEtapaTarefa: 1,
                    data: '1º etapa',
                    tarefas: tarefas
                }

                dispatch(setTarefas(tarefaObjeto))
            })
    }
}