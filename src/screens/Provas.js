import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchProvas, refreshProvas } from '../store/actions/provas'
import {
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  FlatList
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { localeDate, diasDaSemanaReduzido } from '../Enums/dateUtil'
import { formatarDatas, filtrarProvas } from '../functions/calendarFunctions'

LocaleConfig.locales['pt-br'] = localeDate
LocaleConfig.defaultLocale = 'pt-br'

class Provas extends Component {

  state = {
    diaDaSemanaReduzido: '',
    diaDoMes: '',
    provas: [],
    datas: []
  }

  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
  }

  carregarInformacoesDiaAtual(dataPadrao) {
    this.state.provas = []
    this.state.provas.push(filtrarProvas(this.props.provas, dataPadrao))
    this.state.diaDaSemanaReduzido = localeDate.dayNamesShort[dataPadrao.getDay()].toString()
    this.state.diaDoMes = dataPadrao.getDate().toString()
  }

  onDayPress(day) {
    this.state.provas = []
    let data = new Date(day.dateString.toString())
    this.state.diaDaSemanaReduzido = diasDaSemanaReduzido[data.getDay()].toString()
    data.setDate(data.getDate() + 1)
    this.state.provas.push(filtrarProvas(this.props.provas, data))
    this.state.diaDoMes = data.getDate().toString()
    this.setState({
      selected: day.dateString
    });
  }

  carregaLista() {
    if (this.state.provas[0] !== null) {
      return (
        <FlatList
          data={this.state.provas}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => 
            <View style={styles.lista}>
              <Text style={styles.linha}>{item.atividade} - {item.disciplina}</Text>
              <Text style={styles.linha}>
                Valor: {item.valor} - 
                Nota: {item.nota}
              </Text>
              <Text style={styles.detalhe}>{item.detalhe}</Text>
            </View>
          } 
        />
      )
    } else {
      return (
        <View style={styles.lista}>
          <Text style={styles.linha}>Não há provas</Text>
        </View>
      )
    }
  }

  setaDireita(addMonth, mes, ano) {
    addMonth = addMonth()
    if (mes == 12) {
      mes = 1
      ano++
    } else {
        mes++
    }
    this.props.onRefreshProvas(mes, ano, this.props.token.toString(), this.props.filhos, this.props.id)
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
    this.props.onRefreshProvas(mes, ano, this.props.token.toString(), this.props.filhos, this.props.id)
    return substractMonth
  }

  componentDidMount = () => {
    this.props.onFetchProvas(this.props.token.toString(), this.props.filhos, this.props.id)
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
          markedDates= { formatarDatas(this.props.datas, this.props.selected) }
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

const mapStateToProps = ({ dadosProvas, userEduno }) => {
  return {
    mes: dadosProvas.mes,
    ano: dadosProvas.ano,
    provas: dadosProvas.provas,
    datas: dadosProvas.datas,
    filhos: userEduno.filhos,
    token: userEduno.token,
    id: userEduno.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProvas: (token, filhos, id) => dispatch(fetchProvas(token, filhos, id)),
    onRefreshProvas: (mes, ano, token, filhos, id) => dispatch(refreshProvas(mes, ano, token, filhos, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Provas)