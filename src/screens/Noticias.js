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
    Image,
    Alert
} from 'react-native'

class Noticias extends Component {

    state = {
        noticias: [{
            id: this.props.noticias[0].ident,
            image: require('../../assets/imgs/fence.jpg'),
            description: this.props.noticias[0].sinop,
            titulo: this.props.noticias[0].titul,
            data: this.props.noticias[0].atual
        }, {
            id: this.props.noticias[1].ident,
            image: require('../../assets/imgs/bw.jpg'),
            description: this.props.noticias[1].sinop,
            titulo: this.props.noticias[1].titul,
            data: this.props.noticias[1].atual
        }, {
            id: this.props.noticias[2].ident,
            image: require('../../assets/imgs/fence.jpg'),
            description: this.props.noticias[2].sinop,
            titulo: this.props.noticias[2].titul,
            data: this.props.noticias[2].atual
        }]
    }

    formataData(data) {
        if (data !== null) {
            const ano = data.toString().substring(0, 4);
            const mes = data.toString().substring(5, 7);
            const dia = data.toString().substring(8, 10);
            return dia + '/' + mes + '/' + ano;
        }
    }

    carregaNoticiaDetalhada(ident, titul, sinop, atual, image) {
        const noticia = {
            ident: ident,
            titul: titul,
            sinop: sinop,
            atual: atual,
            image: image
        }

        this.props.onFecthNoticiaDetalhada(noticia, this.props.token)
        this.props.navigation.navigate('NoticiaDetalhada')

    }

    componentDidMount() {
        this.props.onFetchNoticias(this.props.token)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                   <Image source={this.state.noticias[0].image} style={styles.image} />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>{this.props.noticias[0].titul}</Text>
                </View>
                <View style={styles.rowContainerLast}>
                    <Text style={styles.data}>{this.formataData(this.props.noticias[0].atual)}</Text>
                    <TouchableOpacity 
                        onPress={() => 
                        {this.carregaNoticiaDetalhada(
                            this.state.noticias[0].id,
                            this.props.noticias[0].titul,
                            this.props.noticias[0].sinop,
                            this.formataData(this.props.noticias[0].atual),
                            this.state.noticias[0].image
                        )}}>
                        <Text style={styles.link}>Leia mais</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.noticias}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => 
                    <View style={styles.container}>
                        <View style={styles.rowContainer2}>
                            <Image style={styles.imageSecundario} source={item.image} />
                            <Text style={styles.titleSecundario}>{item.titulo}</Text>
                        </View>
                        <View style={styles.rowContainerSecundario}>
                            <Text style={styles.dataSecundario}>{this.formataData(item.data)}</Text>
                            <TouchableOpacity 
                                onPress={() => 
                                {this.carregaNoticiaDetalhada(
                                    item.id,
                                    item.titulo,
                                    item.description,
                                    this.formataData(item.data),
                                    item.image
                                )}}>
                                <Text style={styles.linkSecundario}>Leia mais</Text>
                            </TouchableOpacity>
                        </View>
                    </View> } 
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
        resizeMode: 'contain',
        fontFamily: 'Montserrat',
        color: '#000'
    },
    link: {
        width: Dimensions.get('window').width * 25 / 100,
        height: 20,
        resizeMode: 'contain',
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
        resizeMode: 'contain',
        width: Dimensions.get('window').width * 7 / 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'Montserrat',
        paddingTop: 15
    },
    dataSecundario: {
        width: Dimensions.get('window').width * 70 / 100,
        height: 20,
        resizeMode: 'contain',
        fontFamily: 'Montserrat',
        color: '#000'
    },
    linkSecundario: {
        width: Dimensions.get('window').width * 25 / 100,
        height: 20,
        resizeMode: 'contain',
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