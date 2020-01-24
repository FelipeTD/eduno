import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native'
import { fetchNoticiaDetalhada } from '../store/actions/noticiaDetalhada'
import { connect } from 'react-redux'

class NoticiaDetalhada extends Component {

    formataData(data) {
        if (data !== null) {
            const ano = data.toString().substring(0, 4);
            const mes = data.toString().substring(5, 7);
            const dia = data.toString().substring(8, 10);
            return dia + '/' + mes + '/' + ano;
        }
    }

    formataImagem() {
        const base64 = 'data:image/png;base64,' + this.props.image
        return base64
    }

    render() {
        return (
            <View style={styles.container}>
               <View style={styles.rowContainer}>
                   <Image source={{uri: this.formataImagem()}}  style={styles.image} />
               </View>
               <View style={styles.rowContainer}>
                    <Text style={styles.title}>
                        {this.props.titul} - {this.formataData(this.props.atual)}
                    </Text>
               </View>
               <View style={styles.rowContainer}>
                    <Text style={styles.title}>{this.props.sinop}</Text> 
               </View>
               <ScrollView style={styles.rowContainer} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.detalhes}>{this.props.detlh}</Text> 
               </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        paddingTop: 0,
        paddingBottom: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: '#000000',
        width: '100%',
        backgroundColor: '#FFF'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentContainer: {
        marginTop: 40
    },
    image: {
        height: Dimensions.get('window').width * 1 / 3,
        width: Dimensions.get('window').width * 93 / 100,
        marginTop: 10,
        resizeMode: 'cover'
    },
    title: {
        color: '#000',
        marginTop: 10,
        height: Dimensions.get('window').width * 15 / 100,
        fontSize: 14,
        width: Dimensions.get('window').width * 90 / 100,
        fontFamily: 'Montserrat',
        textAlign: 'justify'
    },
    detalhes: {
        color: '#000',
        fontSize: 14,
        width: Dimensions.get('window').width * 90 / 100,
        fontFamily: 'Montserrat',
        textAlign: 'justify'
    }
})

const mapStateToProps = ({ dadosNoticiaDetalhada, userEduno }) => {
    return {
        ident: dadosNoticiaDetalhada.ident,
        titul: dadosNoticiaDetalhada.titul,
        sinop: dadosNoticiaDetalhada.sinop,
        atual: dadosNoticiaDetalhada.atual,
        detlh: dadosNoticiaDetalhada.detlh,
        image: dadosNoticiaDetalhada.image,
        token: userEduno.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchNoticiaDetalhada: (requestNoticia, token) => 
            dispatch(fetchNoticiaDetalhada(requestNoticia, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticiaDetalhada)