import { formateDate } from './formatador'

export const formatarDatas = (datas, selected) => {
    let retorno = {}
    const constante = {selected: true, marked: true, selectedColor: 'blue'}
    let tamanho = 0
    if (datas != null) {
      tamanho = datas.length
    }
    for (let x = 0; x < tamanho; x++) {
      const retornoAux = {[datas[x].data.toString()]: constante}
      retorno = Object.assign(retorno, retornoAux)
    }
    if (tamanho == 0) {
      retorno = {[selected]: constante}
    }
    return retorno;
}

export const filtrarEventos = (eventos, data) => {
    if (eventos.length > 0) {
        for (let x = 0; x < eventos.length; x++) {
            let dataFormatada = eventos[x].disciplina.toString().substring(0,10)
            let dataRetorno = new Date(dataFormatada)
            dataRetorno.setDate(dataRetorno.getDate() + 1)
            if (formateDate(data) === formateDate(dataRetorno)) {
                return eventos[x]
            }
        }
        return null
    } else {
        return null
    }
}

export const filtrarProvas = (provas, data) => {
  let retorno = []
  if (provas.length > 0) {
      for (let x = 0; x < provas.length; x++) {
          let dataFormatada = provas[x].data.toString().substring(0,10)
          let dataRetorno = new Date(dataFormatada)
          dataRetorno.setDate(dataRetorno.getDate() + 1)
          if (formateDate(data) === formateDate(dataRetorno)) {
              retorno.push(provas[x])
          }
      }
      if (retorno.length > 0) {
        return retorno
      } else {
        return null
      }
  } else {
      return null
  }
}