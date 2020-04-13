import React, { Component } from 'react';
import { connect } from 'react-redux'
import { refreshEventos, fetchEventos } from '../store/actions/eventos'
import {
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  View,
  FlatList
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { localeDate, diasDaSemanaReduzido } from '../Enums/dateUtil'
import { formataData } from '../functions/formatador'
import { filtrarEventos } from '../functions/eventosFunction/filtrarEventos'

LocaleConfig.locales['pt-br'] = localeDate
LocaleConfig.defaultLocale = 'pt-br'

class Eventos extends Component {
  state = {
    diaDaSemanaReduzido: '',
    diaDoMes: '',
    eventos: [],
    datas: []
  }

  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
  }

  carregarInformacoesDiaAtual(dataPadrao) {
    this.state.eventos = []
    this.state.eventos.push(filtrarEventos(this.props.eventos, dataPadrao))
    this.state.diaDaSemanaReduzido = localeDate.dayNamesShort[dataPadrao.getDay()].toString()
    this.state.diaDoMes = dataPadrao.getDate().toString()
  }

  onDayPress(day) {
    this.state.eventos = []
    let data = new Date(day.dateString.toString())
    this.state.diaDaSemanaReduzido = diasDaSemanaReduzido[data.getDay()].toString()
    data.setDate(data.getDate() + 1)
    this.state.eventos.push(filtrarEventos(this.props.eventos, data))
    this.state.diaDoMes = data.getDate().toString()
    this.setState({
      selected: day.dateString
    });
  }

  carregaLista() {
    if (this.state.eventos[0] !== null) {
      return (
        <FlatList
          data={this.state.eventos}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => 
            <View style={styles.lista}>
              <Text style={styles.linha}>{item.tipo} - {item.publico}</Text>
              <Text style={styles.linha}>{item.titulo} - {formataData(item.disciplina)}</Text>
              <Text style={styles.detalhe}>{item.detalhe}</Text>
            </View>
          } 
        />
      )
    } else {
      return (
        <View style={styles.lista}>
          <Text style={styles.linha}>Não há eventos</Text>
        </View>
      )
    }
  }

  datasUteis() {
    let retorno = {}
    const constante = {selected: true, marked: true, selectedColor: 'blue'}
    let tamanho = 0
    if (this.props.datas != null) {
      tamanho = this.props.datas.length
    }
    for (let x = 0; x < tamanho; x++) {
      const retornoAux = {[this.props.datas[x].data.toString()]: constante}
      retorno = Object.assign(retorno, retornoAux)
    }
    if (tamanho == 0) {
      retorno = {[this.props.selected]: constante}
    }
    return retorno;
  }

  setaDireita(addMonth, mes, ano) {
    addMonth = addMonth()
    if (mes == 12) {
      mes = 1
      ano++
    } else {
        mes++
    }
    this.props.onRefreshEventos(mes, ano, this.props.token.toString())
    return addMonth
  }

  setaEsquerda(substractMonth, mes, ano) {
    substractMonth = substractMonth()
    if (mes == 1) {
      mes = 12
      ano--
    } else {
        mes--
    }
    this.props.onRefreshEventos(mes, ano, this.props.token.toString())
    return substractMonth
  }

  componentDidMount = () => {
    this.props.onFetchEventos(this.props.token.toString(), this.props.filhos, this.props.id)
    this.carregarInformacoesDiaAtual(new Date())
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Calendar
          onDayPress={this.onDayPress}
          onPressArrowLeft={substractMonth => 
            this.setaEsquerda(substractMonth, this.props.mes, this.props.ano)}
          onPressArrowRight={addMonth => this.setaDireita(addMonth, this.props.mes, this.props.ano)}
          style={styles.calendar}
          hideExtraDays
          markedDates= { this.datasUteis() }
        />
        <View style={styles.containerDados}>
          <View style={styles.containerData}>
            <Text style={styles.diaDoMes}>{this.state.diaDoMes}</Text>
            <Text style={styles.diaDaSemanaReduzido}>{this.state.diaDaSemanaReduzido}</Text>
          </View>
          <ScrollView style={styles.dados}>
            {this.carregaLista()}
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: '#495057'
  },
  containerDados: {
    flex: 1,
    backgroundColor: '#495057',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerData: {
    backgroundColor: '#495057',
    width: Dimensions.get('window').width * 15 / 100,
    height: Dimensions.get('window').height * 25 / 100,
  },
  lista: {
    backgroundColor: '#495057',
    width: Dimensions.get('window').width * 85 / 100,
    height: Dimensions.get('window').height * 25 / 100,
  },
  diaDoMes: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    height: 50,
    fontSize: 30,
    color: '#FFF',
    padding: 10,
    paddingBottom: 0,
    marginTop: 30
  },
  diaDaSemanaReduzido: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    height: 40,
    fontSize: 15,
    color: '#FFF',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 0
  },
  linha: {
    width: Dimensions.get('window').width * 85 / 100,
    height: 40,
    color: '#FFF',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 0,
    marginRight: 20
  },
  detalhe: {
    width: Dimensions.get('window').width * 85 / 100,
    height: 60,
    color: '#FFF',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 0,
    marginRight: 20
  },
  dados: {
    width: Dimensions.get('window').width * 85 / 100, 
    height: Dimensions.get('window').height * 25 / 100, 
    backgroundColor: '#495057'
  }
});

const mapStateToProps = ({ dadosEventos, userEduno }) => {
  return {
      mes: dadosEventos.mes,
      ano: dadosEventos.ano,
      eventos: dadosEventos.eventos,
      datas: dadosEventos.datas,
      filhos: userEduno.filhos,
      token: userEduno.token,
      id: userEduno.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onFetchEventos: (token, filhos, id) => dispatch(fetchEventos(token, filhos, id)),
      onRefreshEventos: (mes, ano, token) => dispatch(refreshEventos(mes, ano, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Eventos)