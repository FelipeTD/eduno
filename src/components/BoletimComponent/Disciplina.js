import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native'

class Disciplina extends Component {

    formataDisciplina(disciplina) {
        if (disciplina.toString().length >= 11) {
            return disciplina.toString().substring(0, 11) + '.'
        } else {
            return disciplina.toString()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.disciplina}>
                        {this.formataDisciplina(this.props.disciplina)}
                    </Text>
                    <Text style={styles.notas}>{this.props.nota}</Text>
                    <Text style={styles.faltas}>{this.props.faltas}</Text>
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
        paddingBottom: 0,
        paddingLeft: 20
    },
    rowContainer: {
        borderBottomWidth: 1,
        borderColor: '#F5FCFF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    disciplina: {
        width: Dimensions.get('window').width * 1 / 2,
        height: 30,
        resizeMode: 'contain',
        color: '#BEF5FE',
        fontFamily: 'Montserrat',
        paddingLeft: 30,
        paddingBottom: 10
    },
    notas: {
        width: Dimensions.get('window').width * 1 / 4,
        height: 30,
        resizeMode: 'contain',
        fontFamily: 'Montserrat',
        color: '#F5FCFF',
        paddingBottom: 10
    },
    faltas: {
        width: Dimensions.get('window').width * 1 / 4,
        height: 30,
        resizeMode: 'contain',
        fontFamily: 'Montserrat',
        color: '#F5FCFF',
        paddingBottom: 10
    }
})

export default Disciplina