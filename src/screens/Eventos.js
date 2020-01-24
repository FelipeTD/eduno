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

LocaleConfig.locales['pt-br'] = {
  monthNames: 
    ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto',
     'Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

class Eventos extends Component {

  state = {
    diaDaSemanaReduzido: '',
    diaDoMes: '',
    eventos: [],
    datas: []
  }

  constructor(props) {
    super(props);
    // this.props = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  diaPadrao(dataPadrao) {

    this.state.eventos = []

    dataClicada = dataPadrao.getDate().toString() + 
                  dataPadrao.getMonth().toString() + 
                  dataPadrao.getFullYear().toString()

    for (let x = 0; x < this.props.eventos.length; x++) {

      let dataFormatada = this.props.eventos[x].disciplina.toString().substring(0,10)
      
      let date = new Date(dataFormatada)
      date.setDate(date.getDate() + 1)

      dataRetorno = date.getDate().toString() + 
                  date.getMonth().toString() + 
                  date.getFullYear().toString()

      if (dataClicada === dataRetorno) {
        this.state.eventos.push({
          disciplina: this.props.eventos[x].disciplina,
          tipo: this.props.eventos[x].tipo,
          titulo: this.props.eventos[x].titulo,
          publico: this.props.eventos[x].publico,
          detalhe: this.props.eventos[x].detalhe
        })
      }
    }

    const semana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const dataSemana = dataPadrao

    this.state.diaDaSemanaReduzido = semana[dataSemana.getDay()].toString()
    this.state.diaDoMes = dataPadrao.getDate().toString()

  }

  onDayPress(day) {

    this.state.eventos = []

    let data = new Date(day.dateString.toString())
    data.setDate(data.getDate() + 1)

    dataClicada = data.getDate().toString() + 
                  data.getMonth().toString() + 
                  data.getFullYear().toString()

    for (let x = 0; x < this.props.eventos.length; x++) {

      let dataFormatada = this.props.eventos[x].disciplina.toString().substring(0,10)
      
      let date = new Date(dataFormatada)
      date.setDate(date.getDate() + 1)

      dataRetorno = date.getDate().toString() + 
                  date.getMonth().toString() + 
                  date.getFullYear().toString()

      if (dataClicada === dataRetorno) {
        this.state.eventos.push({
          disciplina: this.props.eventos[x].disciplina,
          tipo: this.props.eventos[x].tipo,
          titulo: this.props.eventos[x].titulo,
          publico: this.props.eventos[x].publico,
          detalhe: this.props.eventos[x].detalhe
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

  formataData(data) {
      if (data !== null) {
          const ano = data.toString().substring(0, 4);
          const mes = data.toString().substring(5, 7);
          const dia = data.toString().substring(8, 10);
          return dia + '/' + mes + '/' + ano;
      }
  }

  carregaLista() {
    if (this.state.eventos.length > 0) {
      return (
        <FlatList
          data={this.state.eventos}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => 
            <View style={styles.lista}>
              <Text style={styles.linha}>{item.tipo} - {item.publico}</Text>
              <Text style={styles.linha}>
                {item.titulo} - {this.formataData(item.disciplina)}
              </Text>
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
    this.diaPadrao(new Date())
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