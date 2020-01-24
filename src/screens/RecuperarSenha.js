import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { recuperaSenha } from '../store/actions/userEduno'

class RecuperarSenha extends Component {
    state = {
        nome: null,
        email: null,
        isLoading: false,
        token: null
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.setState({
                email: ''
            })
            this.props.navigation.navigate('LoginEduno')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='Email' style={styles.input}
                    keyboardType='email-address' value={this.state.email}
                    onChangeText={email => this.setState({ email })} />
                <TouchableOpacity 
                    onPress={() => { this.props.onRecuperaSenha(this.state) }} 
                    style={styles.buttom}>
                    <Text style={styles.buttomText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#2C2D3F'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15
    }
})

const mapStateToProps = ({ userEduno }) => {
    return {
        isLoading: userEduno.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRecuperaSenha: userEduno => dispatch(recuperaSenha(userEduno))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecuperarSenha)