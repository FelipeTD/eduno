import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions
} from 'react-native'

class TarefaDetalhada extends Component {

    render = () => {
        return (
            <View style={styles.container}>
               <View style={styles.rowContainer}>
                    <Text style={styles.disciplina}>
                        {this.props.navigation.state.params.disciplina}
                    </Text>
               </View>
               <View style={styles.rowContainer}>
                    <Text style={styles.paragrafo}>
                        {this.props.navigation.state.params.titulo}
                    </Text> 
               </View>
               <View style={styles.rowContainer}>
                    <Text style={styles.paragrafo}>
                        Data de entrega: {this.props.navigation.state.params.data_entrega}
                    </Text> 
               </View>
               <View style={styles.rowContainer}>
                    <Text style={styles.paragrafo}>
                        {this.props.navigation.state.params.detalhe}
                    </Text> 
               </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#495057'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    disciplina: {
        paddingTop: 20,
        color: '#F5FCFF',
        height: 60,
        fontSize: 14,
        width: Dimensions.get('window').width * 90 / 100,
        fontFamily: 'Montserrat',
        textAlign: 'justify'
    },
    paragrafo: {
        color: '#F5FCFF',
        height: 60,
        fontSize: 14,
        width: Dimensions.get('window').width * 90 / 100,
        fontFamily: 'Montserrat',
        paddingTop: 10,
        textAlign: 'justify'
    }
})

export default TarefaDetalhada