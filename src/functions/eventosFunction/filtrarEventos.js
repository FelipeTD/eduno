import { formateDate } from '../formatador'

export const filtrarEventos = (eventos, dataPadrao) => {
    if (eventos.length > 0) {
        for (let x = 0; x < eventos.length; x++) {
            let dataFormatada = eventos[x].disciplina.toString().substring(0,10)
            let dataRetorno = new Date(dataFormatada)
            dataRetorno.setDate(dataRetorno.getDate() + 1)
            if (formateDate(dataPadrao) === formateDate(dataRetorno)) {
                return eventos[x]
            }
        }
        return []
    } else {
        return []
    }
}