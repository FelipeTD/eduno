import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchProvas, refreshProvas } from '../store/actions/provas'
import {
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  View,
  FlatList
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { localeDate } from '../Enums/dateUtil'

LocaleConfig.locales['pt-br'] = localeDate
LocaleConfig.defaultLocale = 'pt-br'

class Provas extends Component {

  state = {
    diaDaSemanaReduzido: '',
    diaDoMes: '',
    provas: [],
    datas: [],
    identificador: this.props.id
  }

  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
  }

  componentDidMount = () => {
    this.props.onFetchProvas(this.props.token.toString(), this.props.filhos, this.props.id)
    this.diaPadrao(new Date())
  }

  componentDidUpdate = () => {
    if (this.state.identificador != this.props.id) {
      if (this.props.token != null) {
        this.props.onFetchProvas(this.props.token.toString(), this.props.filhos, this.props.id)
        this.diaPadrao(new Date())
      }
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

  diaPadrao(dataPadrao) {

    this.state.provas = []

    dataClicada = dataPadrao.getDate().toString() + 
                  dataPadrao.getMonth().toString() + 
                  dataPadrao.getFullYear().toString()

    for (let x = 0; x < this.props.provas.length; x++) {
      
      let date = new Date(this.props.provas[x].data.toString())
      date.setDate(date.getDate() + 1)

      dataRetorno = date.getDate().toString() + 
                  date.getMonth().toString() + 
                  date.getFullYear().toString()

      if (dataClicada === dataRetorno) {
        this.state.provas.push({
          disciplina: this.props.provas[x].disciplina,
          atividade: this.props.provas[x].atividade,
          valor: this.props.provas[x].valor,
          nota: this.props.provas[x].nota,
          detalhe: this.props.provas[x].detalhe
        })
      }
    }

    const semana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const dataSemana = dataPadrao

    this.state.diaDaSemanaReduzido = semana[dataSemana.getDay()].toString()
    this.state.diaDoMes = dataPadrao.getDate().toString()

  }

  onDayPress(day) {

    // this.datasMarcadas()

    this.state.provas = []

    let data = new Date(day.dateString.toString())
    data.setDate(data.getDate() + 1)

    dataClicada = data.getDate().toString() + 
                  data.getMonth().toString() + 
                  data.getFullYear().toString()

    for (let x = 0; x < this.props.provas.length; x++) {
      
      let date = new Date(this.props.provas[x].data.toString())
      date.setDate(date.getDate() + 1)

      dataRetorno = date.getDate().toString() + 
                  date.getMonth().toString() + 
                  date.getFullYear().toString()

      if (dataClicada === dataRetorno) {
        this.state.provas.push({
          disciplina: this.props.provas[x].disciplina,
          atividade: this.props.provas[x].atividade,
          valor: this.props.provas[x].valor,
          nota: this.props.provas[x].nota,
          detalhe: this.props.provas[x].detalhe
        })
      }
    }

    const semana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const dataSemana = new Date(day.dateString.toString())

    this.state.diaDaSemanaReduzido = semana[dataSemana.getDay()].toString()
    this.state.diaDoMes = data.getDate().toString()

    this.setState({
      selected: day.dateString
    });
  }

  carregaLista() {
    if (this.state.provas.length > 0) {
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

  datasUteis() {

    let retorno = {}
    const constante = {selected: true, marked: true, selectedColor: 'blue'}
    let tamanho = 0
    if (this.props.datas != null) {
      tamanho = this.props.datas.length
    }

    if (tamanho == 0) {
      retorno = {[this.props.selected]: {selected: true, marked: true, selectedColor: 'blue'}}
    } else if (tamanho == 1) {
      retorno = {[this.props.datas[0].data.toString()]: constante,}
    } else if (tamanho == 2) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,}
    } else if (tamanho == 3) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,}
    } else if (tamanho == 4) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,}
    } else if (tamanho == 5) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,}
    } else if (tamanho == 6) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,}
    } else if (tamanho == 7) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,}
    } else if (tamanho == 8) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,}
    } else if (tamanho == 9) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,}
    } else if (tamanho == 10) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,}
    } else if (tamanho == 11) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,
        [this.props.datas[10].data.toString()]: constante,}
    } else if (tamanho == 12) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,
        [this.props.datas[10].data.toString()]: constante,
        [this.props.datas[11].data.toString()]: constante,}
    } else if (tamanho == 13) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,
        [this.props.datas[10].data.toString()]: constante,
        [this.props.datas[11].data.toString()]: constante,
        [this.props.datas[12].data.toString()]: constante,}
    } else if (tamanho == 14) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,
        [this.props.datas[10].data.toString()]: constante,
        [this.props.datas[11].data.toString()]: constante,
        [this.props.datas[12].data.toString()]: constante,
        [this.props.datas[13].data.toString()]: constante,}
    } else if (tamanho == 15) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,
        [this.props.datas[10].data.toString()]: constante,
        [this.props.datas[11].data.toString()]: constante,
        [this.props.datas[12].data.toString()]: constante,
        [this.props.datas[13].data.toString()]: constante,
        [this.props.datas[14].data.toString()]: constante,}
    } else if (tamanho == 16) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,
        [this.props.datas[10].data.toString()]: constante,
        [this.props.datas[11].data.toString()]: constante,
        [this.props.datas[12].data.toString()]: constante,
        [this.props.datas[13].data.toString()]: constante,
        [this.props.datas[14].data.toString()]: constante,
        [this.props.datas[15].data.toString()]: constante,}
    } else if (tamanho == 17) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,
        [this.props.datas[10].data.toString()]: constante,
        [this.props.datas[11].data.toString()]: constante,
        [this.props.datas[12].data.toString()]: constante,
        [this.props.datas[13].data.toString()]: constante,
        [this.props.datas[14].data.toString()]: constante,
        [this.props.datas[15].data.toString()]: constante,
        [this.props.datas[16].data.toString()]: constante,}
    } else if (tamanho == 18) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,
        [this.props.datas[10].data.toString()]: constante,
        [this.props.datas[11].data.toString()]: constante,
        [this.props.datas[12].data.toString()]: constante,
        [this.props.datas[13].data.toString()]: constante,
        [this.props.datas[14].data.toString()]: constante,
        [this.props.datas[15].data.toString()]: constante,
        [this.props.datas[16].data.toString()]: constante,
        [this.props.datas[17].data.toString()]: constante,}
    } else if (tamanho == 19) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,
        [this.props.datas[10].data.toString()]: constante,
        [this.props.datas[11].data.toString()]: constante,
        [this.props.datas[12].data.toString()]: constante,
        [this.props.datas[13].data.toString()]: constante,
        [this.props.datas[14].data.toString()]: constante,
        [this.props.datas[15].data.toString()]: constante,
        [this.props.datas[16].data.toString()]: constante,
        [this.props.datas[17].data.toString()]: constante,
        [this.props.datas[18].data.toString()]: constante,}
    } else if (tamanho == 20) {
      retorno = {[this.props.datas[0].data.toString()]: constante,
        [this.props.datas[1].data.toString()]: constante,
        [this.props.datas[2].data.toString()]: constante,
        [this.props.datas[3].data.toString()]: constante,
        [this.props.datas[4].data.toString()]: constante,
        [this.props.datas[5].data.toString()]: constante,
        [this.props.datas[6].data.toString()]: constante,
        [this.props.datas[7].data.toString()]: constante,
        [this.props.datas[8].data.toString()]: constante,
        [this.props.datas[9].data.toString()]: constante,
        [this.props.datas[10].data.toString()]: constante,
        [this.props.datas[11].data.toString()]: constante,
        [this.props.datas[12].data.toString()]: constante,
        [this.props.datas[13].data.toString()]: constante,
        [this.props.datas[14].data.toString()]: constante,
        [this.props.datas[15].data.toString()]: constante,
        [this.props.datas[16].data.toString()]: constante,
        [this.props.datas[17].data.toString()]: constante,
        [this.props.datas[18].data.toString()]: constante,
        [this.props.datas[19].data.toString()]: constante,}
    } else {
      retorno = {[this.props.selected]: {selected: true, marked: true, selectedColor: 'blue'}}
    }

    return retorno;
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
      onRefreshProvas: (mes, ano, token, filhos, id) => 
        dispatch(refreshProvas(mes, ano, token, filhos, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Provas)