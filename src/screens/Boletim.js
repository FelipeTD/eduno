import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import Disciplina from '../components/BoletimComponent/Disciplina'
import Icon from 'react-native-vector-icons/FontAwesome'
import { fetchNotas, refreshNotas } from '../store/actions/boletim'

class Boletim extends Component {

    state = {
        identificador: this.props.id
    }

    atualizarBoletim = () => {
        this.props.descricao = this.props.numeroEtapa + 'º etapa'
        this.props.onAtualizaEtapa({
            numeroEtapa: this.props.numeroEtapa,
            descricao: this.props.descricao,
            notas: []
        }, this.props.filhos, this.props.token.toString(), this.props.id)
    }

    atualizaSetaDireita = () => {
        if ((this.props.filhos[this.props.id].numEtapas == 4 && this.props.numeroEtapa == 4)
            || (this.props.filhos[this.props.id].numEtapas == 3 && this.props.numeroEtapa == 3)) {
            this.props.numeroEtapa = 0
        }
        this.props.numeroEtapa = parseInt(this.props.numeroEtapa) + 1
        this.atualizarBoletim()
    }

    atualizaSetaEsquerda = () => {
        if (this.props.filhos[this.props.id].numEtapas == 4 && this.props.numeroEtapa == 1) {
            this.props.numeroEtapa = 5
        } else if (this.props.filhos[this.props.id].numEtapas == 3 && this.props.numeroEtapa == 1) {
            this.props.numeroEtapa = 4
        }
        this.props.numeroEtapa = parseInt(this.props.numeroEtapa) - 1
        this.atualizarBoletim()
    }

    componentDidMount = () => {
        this.props.onFetchNotas(this.props.token.toString(), this.props.filhos, this.props.id)
        this.state.identificador = -1
    }

    componentDidUpdate = () => {
        if (this.state.identificador != this.props.id) {
            if (this.props.token != null) {
                this.props.onFetchNotas(this.props.token.toString(), this.props.filhos, this.props.id)
                this.state.identificador = this.props.id
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.atualizaSetaEsquerda}>
                        <Icon name='angle-left' size={45} color="#F5FCFF" />
                    </TouchableOpacity>
                    <Text style={styles.etapa}>{this.props.descricao}</Text>
                    <TouchableOpacity onPress={this.atualizaSetaDireita}>
                        <Icon name='angle-right' size={45} color="#F5FCFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerTitle}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.valorEtapa}>
                            Valor da etapa: {this.props.valor} Pontos
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.disciplina}>Disciplina</Text>
                        <Text style={styles.notas}>Nota</Text>
                        <Text style={styles.faltas}>Faltas</Text>
                    </View>
                </View>
                <FlatList
                    data={this.props.notas}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => 
                            <Disciplina key={item.id} {...item} /> 
                } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#495057',
        width: '100%',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    disciplina: {
        width: Dimensions.get('window').width * 1 / 2,
        height: 20,
        resizeMode: 'contain',
        color: '#F5FCFF',
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        paddingLeft: 40
    },
    notas: {
        width: Dimensions.get('window').width * 1 / 4,
        height: 20,
        resizeMode: 'contain',
        color: '#F5FCFF',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        paddingLeft: 10
    },
    faltas: {
        width: Dimensions.get('window').width * 1 / 4,
        height: 20,
        resizeMode: 'contain',
        color: '#F5FCFF',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        paddingLeft: 10
    },
    etapa: {
        fontSize: 25,
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        fontFamily: 'Montserrat',
        color: '#F5FCFF'
    },
    containerTitle: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        fontFamily: 'Montserrat',
        width: '100%'
    },
    valorEtapa: {
        width: Dimensions.get('window').width,
        height: 40,
        resizeMode: 'contain',
        color: '#BEF5FE',
        fontFamily: 'Montserrat',
        paddingLeft: 80,
        paddingBottom: 20
    }
})

const mapStateToProps = ({etapa, userEduno}) => {
    return {
        numeroEtapa: etapa.numeroEtapa,
        descricao: etapa.descricao,
        valor: etapa.valor,
        notas: etapa.notas,
        filhos: userEduno.filhos,
        token: userEduno.token,
        id: userEduno.id
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchNotas: (token, filhos, id) => dispatch(fetchNotas(token, filhos, id)),
        onAtualizaEtapa: (etapa, filhos, token, id) => dispatch(refreshNotas(etapa, filhos, token, id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Boletim)