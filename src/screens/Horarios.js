import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'
import Horario from '../components/Horarios/Horario'
import Icon from 'react-native-vector-icons/FontAwesome'
import { fetchHorarios, refreshHorarios } from '../store/actions/horarios'
import { diasDaSemana } from '../Enums/dateUtil'

class Horarios extends Component {

    state = {
        identificador: this.props.id
    }

    atualizarHorarios = () => {
        this.props.diaDaSemana = diasDaSemana[this.props.dia - 2]
        this.props.onAtualizaHorarios({
            dia: this.props.dia,
            diaDaSemana: this.props.diaDaSemana,
            horarios: []
        }, this.props.filhos, this.props.token.toString(), this.props.id)
    } 

    atualizaSetaDireita = () => {
        if (this.props.dia == 1) {
            this.props.dia = 2
        }
        if (this.props.dia == 6) {
            this.props.dia = 1
        }
        this.props.dia = this.props.dia + 1
        this.atualizarHorarios()
    }

    atualizaSetaEsquerda = () => {
        if (this.props.dia == 2 || this.props.dia == 1) {
            this.props.dia = 7
        }
        this.props.dia = this.props.dia - 1
        this.atualizarHorarios()
    }

    componentDidMount = () => {
        this.props.onFetchHorarios(this.props.token.toString(), this.props.filhos, this.props.id)
        this.state.identificador = -1
    }

    componentDidUpdate = () => {
        if (this.state.identificador != this.props.id) {
            if (this.props.token != null) {
                this.props.onFetchHorarios(this.props.token.toString(), this.props.filhos, this.props.id)
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
                    <Text style={styles.diaDaSemana}>{this.props.diaDaSemana}</Text>
                    <TouchableOpacity onPress={this.atualizaSetaDireita}>
                        <Icon name='angle-right' size={45} color="#F5FCFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerTitle}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.disciplina}>Disciplina</Text>
                        <Text style={styles.horario}>Horário</Text>
                        <Text style={styles.professor}>Professor</Text>
                    </View>
                </View>
                <FlatList
                    data={this.props.horarios}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => 
                        <Horario key={item.id} 
                                 disciplina={item.disciplina}
                                 hoarario_inicio={item.hoarario_inicio}
                                 professor={item.professor} />} />
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
    diaDaSemana: {
        fontSize: 25,
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        fontFamily: 'Montserrat',
        color: '#F5FCFF'
    },
    disciplina: {
        width: Dimensions.get('window').width * 45 / 100,
        height: 20,
        color: '#F5FCFF',
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        paddingLeft: 20
    },
    horario: {
        width: Dimensions.get('window').width * 17 / 100,
        height: 20,
        color: '#F5FCFF',
        fontFamily: 'Montserrat',
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    professor: {
        width: Dimensions.get('window').width * 38 / 100,
        height: 20,
        color: '#F5FCFF',
        fontFamily: 'Montserrat',
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    containerTitle: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        width: '100%'
    }
})

const mapStateToProps = ({ quadro, userEduno }) => {
    return {
        dia: quadro.dia,
        diaDaSemana: quadro.diaDaSemana,
        horarios: quadro.horarios,
        filhos: userEduno.filhos,
        token: userEduno.token,
        id: userEduno.id
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchHorarios: (token, filhos, id) => dispatch(fetchHorarios(token, filhos, id)),
        onAtualizaHorarios: (quadro, filhos, token, id) => 
            dispatch(refreshHorarios(quadro, filhos, token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Horarios)