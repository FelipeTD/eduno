import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import fontelloConfig from '../config.json'
const Icon = createIconSetFromFontello(fontelloConfig)

class MenuPrincipal extends Component {

    atualizaSetaEsquerda = async () => {
        Alert.alert('Minha mensagem', 'Tortora')
    }

    boletim = () => {
        this.props.navigation.navigate('Boletim')
    }

    provas = () => {
        this.props.navigation.navigate('Provas')
    }

    noticias = () => {
        this.props.navigation.navigate('Noticias')
    }

    horarios = () => {
        this.props.navigation.navigate('Horarios')
    }

    tarefas = () => {
        this.props.navigation.navigate('Tarefas')
    }

    eventos = () => {
        this.props.navigation.navigate('Eventos')
    }

    financeiro = () => {
        Alert.alert('Alerta', 'Em desenvolvimento')
    }

    perfil = () => {
        this.props.navigation.navigate('ProfileEduno')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.boletim}>
                        <Icon name='boletim' style={styles.icon} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.boletim}>
                        <Text style={styles.description}>boletim</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.provas}>
                        <Icon name='provas' style={styles.icon} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.provas}>
                        <Text style={styles.description}>provas</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.noticias}>
                        <Icon name='news' style={styles.icon} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.noticias}>
                        <Text style={styles.description}>notícias</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.horarios}>
                        <Icon name='calendário' style={styles.icon} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.horarios}>
                        <Text style={styles.description}>horários</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.tarefas}>
                        <Icon name='tarefas' style={styles.icon} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.tarefas}>
                        <Text style={styles.description}>tarefas</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.eventos}>
                        <Icon name='eventos' style={styles.icon} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.eventos}>
                        <Text style={styles.description}>eventos</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.financeiro}>
                        <Icon2 name='dollar' style={styles.icon} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.financeiro}>
                        <Text style={styles.description}>financeiro</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.perfil}>
                        <Icon2 name='user' style={styles.icon} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.perfil}>
                        <Text style={styles.description}>perfil</Text>
                    </TouchableOpacity>
                </View>
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
        height: '100%'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#05868C',
        height: Dimensions.get('window').height * 10 / 100,
        width: Dimensions.get('window').width * 90 / 100,
        marginBottom: 10
    },
    icon: {
        color: "#BEF5FE",
        marginLeft: Dimensions.get('window').width * 10 / 100,
        resizeMode: 'contain',
        width: Dimensions.get('window').width * 3 / 10
    },
    description: {
        fontFamily: 'Montserrat',
        color: '#FFF',
        resizeMode: 'contain',
        fontSize: 20
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

export default connect(mapStateToProps, null)(MenuPrincipal)