import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Gravatar } from 'react-native-gravatar'
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image
} from 'react-native'
import icon from '../../assets/imgs/icon.png'

class HeaderSecundario extends Component {
    render() {
        const name = this.props.name || 'Anonymous'
        const gravatar = this.props.email ? 
            <Gravatar options={{ email: this.props.email, secure: true }} 
                style={styles.avatar} />
            : null
        return (
            <View style={styles.container}>
               <View style={styles.rowContainer}>
                   {/* <Image source={icon} style={styles.image} /> */}
                   <Text style={styles.title}>{this.props.screenName}</Text>
               </View>
               {/* <View style={styles.userContainer}>
                   <Text style={styles.user}>{name}</Text>
                   {gravatar}
               </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 10,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#03888A'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    title: {
        color: '#2C2D3F',
        fontFamily: 'Montserrat',
        height: 30,
        fontSize: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    }
})

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name
    }
}

export default connect(mapStateToProps, null)(HeaderSecundario)