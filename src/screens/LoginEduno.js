import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  TouchableOpacity, 
  TextInput,
} 
from 'react-native'
import { connect } from 'react-redux'
import { loginEduno } from '../store/actions/userEduno'
import CryptoJS from 'react-native-crypto-js/CryptoJS'
import { mockLogin } from '../Enums/login'

class LoginEduno extends Component {
  
  state = mockLogin[0]

  login = () => {
    this.state.pwd = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(this.state.pwd)).toString()
    this.props.onLoginEduno({ ...this.state })
  }

  componentDidUpdate = prevProps => {
      if (prevProps.isLoadingEduno && !this.props.isLoadingEduno) {
        this.props.navigation.navigate('ProfileEduno')
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/imgs/edunoIMG.jpg')} style={styles.image} />
        </View>
        <TextInput placeholder='Empresa' placeholderTextColor='#FFFFF0' style={styles.input}
          autoFocus={true} value={this.state.empre}
          onChangeText={empre => this.setState({ empre })} />
        <TextInput placeholder='Login' placeholderTextColor='#FFFFF0' style={styles.input}
          keyboardType='email-address' value={this.state.user}
          onChangeText={user => this.setState({ user })} />
        <TextInput placeholder='Senha' placeholderTextColor='#FFFFF0' style={styles.input}
          secureTextEntry={true} value={this.state.pwd}
          onChangeText={pwd => this.setState({ pwd })} />
        <TouchableOpacity onPress={this.login} style={styles.buttom}>
          <Text style={styles.buttomText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('RecuperarSenha')}} 
          style={styles.viewRodape}>
          <Text style={styles.rodape}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C2D3F'
  },
  imageContainer: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#2C2D3F'
  },
  image: {
      width: '100%',
      height: Dimensions.get('window').width / 2,
      resizeMode: 'center',
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#2C2D3F',
    height: 40,
    borderWidth: 1,
    borderColor: '#2C2D3F',
    borderBottomColor: '#808080',
    fontFamily: 'Montserrat',
    color: '#FFFFFF'
  },
  buttom: {
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#03888A',
    borderRadius: 20,
    width: '90%'
  },
  buttomText: {
      fontSize: 20,
      color: '#FFF',
      fontWeight: 'bold',
      fontFamily: 'Montserrat',
      textAlign: 'center'
  },
  rodape: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 20
  },
  viewRodape: {
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2D3F',
    height: Dimensions.get('window').width / 10,
  }
})

const mapStateToProps = ({ userEduno }) => {
  return {
    isLoadingEduno: userEduno.isLoadingEduno,
    token: userEduno.token,
    filhos: userEduno.filhos,
    id: userEduno.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onLoginEduno: userEduno => dispatch(loginEduno(userEduno))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginEduno)