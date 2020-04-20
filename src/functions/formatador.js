export const formataDisciplina = disciplina => {
    return disciplina.toString().length >= 11 ? disciplina.toString().substring(0, 11) + '.' 
        : disciplina.toString()
}

export const formataProfessor = professor => {
    return professor.toString().split(" ")[0]
}

export const formataHora = hora => {
    const caracteres = hora.toString().split("")
    return hora < 1000 ? '0' + caracteres[0] + ':' + caracteres[1] + caracteres[2] 
        : caracteres[0] + caracteres[1] + ':' + caracteres[2] + caracteres[3]
}

export const formataData = data => {
    return data ? data.toString().substring(8, 10) + '/' +
    data.toString().substring(5, 7) + '/' + 
    data.toString().substring(0, 4) : data
}

export const formateDate = data => {
    return data !== null ?
        data.getDate().toString() + 
        data.getMonth().toString() + 
        data.getFullYear().toString() : data
}

export const formataDataParaExibicao = data => {
    if (data !== null) {
        const dia = data.getDate().toString() >= 10 ? 
            data.getDate().toString() : 
            '0' + data.getDate().toString()
        const mes = data.getMonth().toString() >= 10 ?
            data.getMonth().toString() :
            '0' + data.getMonth().toString()
        return dia + '/' + mes + '/' + data.getFullYear().toString()
    }
    return data
}

export const formataImagem = image => {
    return 'data:image/png;base64,' + image
}