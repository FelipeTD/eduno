import { refreshHorarios } from '../store/actions/horarios'
import { diasDaSemana } from '../Enums/diasDaSemana'

// Não está funcionando. Deixando para referência e tentar fazer funcionar futuramente
export const atualizaSetaDireita = (dia, diaDaSemana, filhos, token, id) => {
    if (dia == 1) {
        dia = 2
    }
    if (dia == 6) {
        dia = 1
    }
    dia = dia + 1
    diaDaSemana = diasDaSemana[dia - 2]
    refreshHorarios({dia: dia, diaDaSemana: diaDaSemana, horarios: []}, filhos, token.toString(), id)
}