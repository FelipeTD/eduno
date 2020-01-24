import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native'

class Horario extends Component {

    formata_professor(professor) {
        const nomes = professor.toString().split(" ")
        let nome_formatado = nomes[0]

        return nome_formatado
    }

    formata_hora(hora)  {
        const caracteres = hora.toString().split("")
        let hora_formatada = ''
        if (hora < 1000) {
            hora_formatada = '0' + caracteres[0] + ':' + caracteres[1] + caracteres[2] 
        } else {
            hora_formatada = caracteres[0] + caracteres[1] + ':' + caracteres[2] + caracteres[3]
        }

        return hora_formatada
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.disciplina}>{this.props.disciplina}</Text>
                    <Text style={styles.horario}>{this.formata_hora(this.props.hoarario_inicio)}</Text>
                    <Text style={styles.professor}>{this.formata_professor(this.props.professor)}</Text>
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
        //paddingLeft: 10,
        paddingBottom: 10
    },
    professor: {
        width: Dimensions.get('window').width * 38 / 100,
        height: 30,
        resizeMode: 'contain',
        fontFamily: 'Montserrat',
        color: '#F5FCFF',
        //paddingLeft: 10,
        paddingBottom: 10
    }
})

export default Horario