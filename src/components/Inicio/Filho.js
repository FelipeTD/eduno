import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Image,
    Alert
} from 'react-native'

class Filho extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.nickname}>{this.props.nome}</Text>
                    <Image source={{uri: this.props.image}}  style={styles.nickname} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#F5FCFF',
        width: '100%'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: Dimensions.get('window').width * 25 / 100,
        height: 20,
        borderRadius: 75,
        color: '#BEF5FE'
    },
    nickname: {
        width: Dimensions.get('window').width * 45 / 100,
        height: 20,
        resizeMode: 'contain',
        color: '#BEF5FE',
        fontFamily: 'Montserrat',
        paddingLeft: 20
    },
    image: {
        height: Dimensions.get('window').width * 1 / 10,
        width: Dimensions.get('window').width * 1 / 10,
        marginTop: 10,
        resizeMode: 'cover'
    }
})

export default Filho