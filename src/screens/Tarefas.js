import React, { Component } from 'react'
import { connect } from 'react-redux'
import { refreshTarefas, fetchTarefas } from '../store/actions/tarefa'
import {
    Platform,
    StyleSheet,
    FlatList,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { formataData, formataDataParaExibicao } from '../functions/formatador'

class Tarefas extends Component {

    state = {
        identificador: this.props.id
    }

    atualizaSetaDireita = () => {
        const limite = this.props.tarefas.length - 1
        if (this.props.numeroEtapaTarefa == limite) {
            this.props.numeroEtapaTarefa = 0
        } else {
            this.props.numeroEtapaTarefa = this.props.numeroEtapaTarefa + 1
        }
        this.props.onAtualizaDataTarefa({
            numeroEtapaTarefa: this.props.numeroEtapaTarefa,
            data: this.props.data,
            tarefas: [],
            tarefaAtual: []
        }, this.props.filhos, this.props.token.toString(), this.props.id)
    }

    atualizaSetaEsquerda = () => {
        if (this.props.numeroEtapaTarefa == 0) {
            this.props.numeroEtapaTarefa = this.props.tarefas.length - 1
        } else {
            this.props.numeroEtapaTarefa = this.props.numeroEtapaTarefa - 1
        }
        this.props.onAtualizaDataTarefa({
            numeroEtapaTarefa: this.props.numeroEtapaTarefa,
            data: this.props.data,
            tarefas: [],
            tarefaAtual: []
        }, this.props.filhos, this.props.token.toString(), this.props.id)
    }

    componentDidMount = () => {
        this.props.onFetchTarefas(this.props.token.toString(), this.props.filhos, this.props.id)
        this.state.identificador = -1
    }

    componentDidUpdate = () => {
        if (this.state.identificador != this.props.id) {
            if (this.props.token != null) {
                this.props.onFetchTarefas(this.props.token.toString(), this.props.filhos, this.props.id)
                this.state.identificador = this.props.id
            }
        }
    }

    render() {
        if (this.props.tarefas.length > 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={this.atualizaSetaEsquerda}>
                            <Icon name='angle-left' size={45} color="#F5FCFF" />
                        </TouchableOpacity>
                        <Text style={styles.dataTarefa}>
                            {formataData(this.props.tarefaAtual[0].data_entrega)}
                        </Text>
                        <TouchableOpacity onPress={this.atualizaSetaDireita}>
                            <Icon name='angle-right' size={45} color="#F5FCFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.subtitulo}>Disciplina</Text>
                    </View>
                    <FlatList
                        data={this.props.tarefaAtual}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => 
                            <View style={styles.containerTarefa}>
                                <View style={styles.rowContainerTarefa}>
                                    <Text style={styles.disciplina}>
                                        {item.disciplina}
                                    </Text>
                                    <TouchableOpacity 
                                        onPress={() => {
                                            this.props.navigation.navigate('TarefaDetalhada', {
                                                disciplina: item.disciplina,
                                                titulo: item.titulo,
                                                data_entrega: formataData(item.data_entrega),
                                                detalhe: item.detalhe
                                            })}}>
                                        <Text style={styles.link}>Ver</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        } 
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.containerSemDados}>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={this.atualizaSetaEsquerda}>
                            <Icon name='angle-left' size={45} color="#F5FCFF" />
                        </TouchableOpacity>
                        <Text style={styles.dataTarefa}>{formataDataParaExibicao(new Date())}</Text>
                        <TouchableOpacity onPress={this.atualizaSetaDireita}>
                            <Icon name='angle-right' size={45} color="#F5FCFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.subtitulo}>Não existem tarefas</Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    containerSemDados: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#495057',
        width: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#495057',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dataTarefa: {
        fontSize: 25,
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        fontFamily: 'Montserrat',
        color: '#F5FCFF'
    },
    subtitulo: {
        width: Dimensions.get('window').width,
        height: 20,
        color: '#F5FCFF',
        fontFamily: 'Montserrat',
        paddingLeft: 40
    },

    // Tarefa 
    containerTarefa: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#F5FCFF',
        width: '100%'
    },
    rowContainerTarefa: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    disciplina: {
        width: Dimensions.get('window').width * 3 / 4,
        height: 20,
        color: '#F5FCFF',
        fontFamily: 'Montserrat',
        paddingLeft: 10
    },
    link: {
        width: Dimensions.get('window').width * 1 / 4,
        height: 20,
        fontFamily: 'Montserrat',
        color: '#F5FCFF'
    },
    titulo: {
        width: 0,
        height: 0
    }
    
})

const mapStateToProps = ({ dadosTarefas, userEduno }) => {
    return {
        numeroEtapaTarefa: dadosTarefas.numeroEtapaTarefa,
        data: dadosTarefas.data,
        tarefas: dadosTarefas.tarefas,
        tarefaAtual: dadosTarefas.tarefaAtual,
        filhos: userEduno.filhos,
        token: userEduno.token,
        id: userEduno.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTarefas: (token, filhos, id) => dispatch(fetchTarefas(token, filhos, id)),
        onAtualizaDataTarefa: (tarefa, filhos, token, id) => 
            dispatch(refreshTarefas(tarefa, filhos, token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tarefas)