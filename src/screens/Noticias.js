import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNoticias } from '../store/actions/noticias'
import { fetchNoticiaDetalhada } from '../store/actions/noticiaDetalhada'
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    Dimensions,
    Text,
    Image
} from 'react-native'
import { formataData } from '../functions/formatador'
const image = require('../../assets/imgs/fence.jpg')

class Noticias extends Component {

    carregarNoticiaDetalhada(noticia, image) {
        this.props.onFecthNoticiaDetalhada({
            ident: noticia.ident,
            titul: noticia.titul,
            sinop: noticia.sinop,
            atual: formataData(noticia.atual),
            image: image
        }, this.props.token)
        this.props.navigation.navigate('NoticiaDetalhada')
    }

    componentDidMount() {
        this.props.onFetchNoticias(this.props.token)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                   <Image source={image} style={styles.image} />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>{this.props.noticias[0].titul}</Text>
                </View>
                <View style={styles.rowContainerLast}>
                    <Text style={styles.data}>{formataData(this.props.noticias[0].atual)}</Text>
                    <TouchableOpacity 
                        onPress={() => {this.carregarNoticiaDetalhada(this.props.noticias[0], image)}}>
                        <Text style={styles.link}>Leia mais</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.noticias}
                    keyExtractor={item => `${item.ident}`}
                    renderItem={({ item }) => 
                        item.ident !== 1 ?
                        <View style={styles.container}>
                            <View style={styles.rowContainer2}>
                                <Image style={styles.imageSecundario} source={image} />
                                <Text style={styles.titleSecundario}>{item.titul}</Text>
                            </View>
                            <View style={styles.rowContainerSecundario}>
                                <Text style={styles.dataSecundario}>{formataData(item.atual)}</Text>
                                <TouchableOpacity 
                                    onPress={() => {this.carregarNoticiaDetalhada(item, image)}}>
                                    <Text style={styles.linkSecundario}>Leia mais</Text>
                                </TouchableOpacity>
                            </View>
                        </View> : null }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    viewRodape: {
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        height: Dimensions.get('window').width / 10,
    },
    rodape: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 20
    },

    // Noticia Principal
    image: {
        height: Dimensions.get('window').width * 1 / 3,
        width: Dimensions.get('window').width * 9 / 10,
        marginTop: 10,
        resizeMode: 'cover'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowContainerLast: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#000000',
        width: '90%',
        paddingBottom: 10
    },
    title: {
        color: '#000',
        height: 60,
        fontSize: 14,
        width: Dimensions.get('window').width * 9 / 10,
        fontFamily: 'Montserrat',
        paddingTop: 10,
        textAlign: 'justify'
    },
    data: {
        width: Dimensions.get('window').width * 70 / 100,
        height: 20,
        fontFamily: 'Montserrat',
        color: '#000'
    },
    link: {
        width: Dimensions.get('window').width * 25 / 100,
        height: 20,
        fontFamily: 'Montserrat',
        color: '#000'
    },

    // Noticias secundarias
    rowContainerSecundario: {
        borderBottomWidth: 1,
        borderColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        paddingLeft: 10,
        width: '95%'
    },
    rowContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        width: '95%'
    },
    imageSecundario: {
        height: Dimensions.get('window').width * 1 / 6,
        width: Dimensions.get('window').width * 1 / 4,
        resizeMode: 'contain'
    },
    titleSecundario: {
        color: '#000',
        height: 100,
        fontSize: 14,
        width: Dimensions.get('window').width * 7 / 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'Montserrat',
        paddingTop: 15
    },
    dataSecundario: {
        width: Dimensions.get('window').width * 70 / 100,
        height: 20,
        fontFamily: 'Montserrat',
        color: '#000'
    },
    linkSecundario: {
        width: Dimensions.get('window').width * 25 / 100,
        height: 20,
        fontFamily: 'Montserrat',
        color: '#000'
    }

})

const mapStateToProps = ({ dadosNoticias, dadosNoticiaDetalhada, userEduno }) => {
    return {
        descricao: dadosNoticias.descricao,
        noticias: dadosNoticias.noticias,
        requestNoticia: dadosNoticiaDetalhada.requestNoticia,
        token: userEduno.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchNoticias: (token) => dispatch(fetchNoticias(token)),
        onFecthNoticiaDetalhada: (requestNoticia, token) => 
            dispatch(fetchNoticiaDetalhada(requestNoticia, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Noticias)