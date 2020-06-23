import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Platform
} from 'react-native'
import { formataProfessor, formataHora } from '../../functions/formatador'

class Horario extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.disciplina}>{this.props.disciplina}</Text>
                    <Text style={styles.horario}>{formataHora(this.props.hoarario_inicio)}</Text>
                    <Text style={styles.professor}>{formataProfessor(this.props.professor)}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        width: '90%',
        padding: 10,
        paddingLeft: 20,
        paddingBottom: 0
    },
    rowContainer: {
        borderBottomWidth: 1,
        borderColor: '#F5FCFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    disciplina: {
        width: Dimensions.get('window').width * 45 / 100,
        height: 30,
        resizeMode: 'contain',
        color: '#BEF5FE',
        fontFamily: 'Montserrat',
        paddingLeft: 10,
        paddingBottom: 10
    },
    horario: {
        width: Dimensions.get('window').width * 17 / 100,
        height: 30,
        resizeMode: 'contain',
        fontFamily: 'Montserrat',
        color: '#F5FCFF',
        paddingBottom: 10
    },
    professor: {
        width: Dimensions.get('window').width * 38 / 100,
        height: 30,
        resizeMode: 'contain',
        fontFamily: 'Montserrat',
        color: '#F5FCFF',
        paddingBottom: 10
    }
})

export default Horario