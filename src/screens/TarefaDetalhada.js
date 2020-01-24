import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTarefaDetalhada } from '../store/actions/tarefaDetalhada'
import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions
} from 'react-native'

class TarefaDetalhada extends Component {

    renderUnique = () => {
        return (
            <View style={styles.container}>
               <View style={styles.rowContainer}>
                    <Text style={styles.titlePrincipal}>{this.props.disciplina}</Text>
               </View>
               <View style={styles.rowContainer}>
                    <Text style={styles.paragrafo}>{this.props.titulo}</Text> 
               </View>
               <View style={styles.rowContainer}>
                    <Text style={styles.paragrafo}>Data de entrega: {this.props.data_entrega}</Text> 
               </View>
               <View style={styles.rowContainer}>
                    <Text style={styles.paragrafo}>{this.props.detalhe}</Text> 
               </View>
            </View>
        )
    }

    render() {
        return this.renderUnique()
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //backgroundColor: '#2C2D3F'
        backgroundColor: '#495057'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titlePrincipal: {
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

const mapStateToProps = ({ dadosTarefaDetalhada }) => {
    return {
        disciplina: dadosTarefaDetalhada.disciplina,
        titulo: dadosTarefaDetalhada.titulo,
        data_entrega: dadosTarefaDetalhada.data_entrega,
        detalhe: dadosTarefaDetalhada.detalhe
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTarefaDetalhada: requestTarefa => dispatch(fetchTarefaDetalhada(requestTarefa)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TarefaDetalhada)