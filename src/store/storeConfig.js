import { 
    createStore, 
    combineReducers,
    compose,
    applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import userEdunoReducer from './reducers/userEduno'
import etapaReducer from './reducers/boletim'
import tarefaReducer from './reducers/tarefa'
import horariosReducer from './reducers/horarios'
import noticiasReducer from './reducers/noticias'
import provasReducer from './reducers/provas'
import eventosReducer from './reducers/eventos'
import messageReducer from './reducers/message'
import inicioReducer from './reducers/inicio'
import noticiaDetalhadaReducer from './reducers/noticiaDetalhada'

const reducers = combineReducers({
    userEduno: userEdunoReducer,
    message: messageReducer,
    dadosInicio: inicioReducer,
    dadosNoticias: noticiasReducer,
    dadosNoticiaDetalhada: noticiaDetalhadaReducer,
    etapa: etapaReducer,
    dadosEventos: eventosReducer,
    dadosTarefas: tarefaReducer,
    quadro: horariosReducer,
    dadosProvas: provasReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig