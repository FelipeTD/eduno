import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import fontelloConfig from '../config.json'
import { telas } from '../Enums/menu'

const Icon = createIconSetFromFontello(fontelloConfig)

class MenuPrincipal extends Component {

    navegar = tela => {
        if (tela == 'Financeiro') {
            Alert.alert('Alerta', 'Em desenvolvimento')
        } else {
            this.props.navigation.navigate(tela)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={telas}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => 
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.navegar(item.name)}>
                            {item.name === 'Financeiro' || item.name === 'ProfileEduno' ?
                                <Icon2 name={item.icon} style={styles.icon} size={30} /> :
                                <Icon name={item.icon} style={styles.icon} size={30} /> 
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.navegar(item.name)}>
                            <Text style={styles.description}>{item.nomeExibicao}</Text>
                        </TouchableOpacity>
                    </View>} />
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
        height: '100%',
        paddingTop: 10
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