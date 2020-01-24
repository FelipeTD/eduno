import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutEduno, atualizaID } from '../store/actions/userEduno'
import { fetchNoticias } from '../store/actions/noticias'
import { fetchProvas } from '../store/actions/provas'
import { fetchEventos } from '../store/actions/eventos'
import { fetchNotas } from '../store/actions/boletim'
import { fetchTarefas } from '../store/actions/tarefa'
import { fetchHorarios } from '../store/actions/horarios'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    FlatList,
    Alert,
    Dimensions
} from 'react-native'

class ProfileEduno extends Component {

    componentDidMount = () => {
        this.props.onFetchNoticias(this.props.token)
        this.props.onFetchProvas(this.props.token.toString(), this.props.filhos, this.props.id)
        this.props.onFetchEventos(this.props.token.toString(), this.props.filhos, this.props.id)
        this.props.onFetchNotas(this.props.token.toString(), this.props.filhos, this.props.id)
        this.props.onFetchTarefas(this.props.token.toString(), this.props.filhos, this.props.id)
        this.props.onFetchHorarios(this.props.token.toString(), this.props.filhos, this.props.id)
    }

    formata_nome(nome) {
        const nomes = nome.toString().split(" ")
        let nome_formatado = nomes[0]

        return ' ' + nome_formatado
    }

    formata_nome_aluno(nome) {
        const nomes = nome.toString().split(" ")
        let nome_formatado = ''
        if (nomes.length > 1) {
            nome_formatado = nomes[0] + ' ' + nomes[1]
        } else {
            nome_formatado = nomes[0]
        }

        return nome_formatado
    }

    logoutEduno = () => {
        this.props.onLogoutEduno()
        this.props.navigation.navigate('Auth')
    }

    noticias1 = () => {
        const userEdunoObjeto = {
            nome: this.props.nome,
            email: this.props.email,
            isLoadingEduno: false,
            token: this.props.token,
            filhos: this.props.filhos,
            id: 0
        }
        this.props.onAtualizaID(userEdunoObjeto)
        this.props.navigation.navigate('MenuPrincipal')
    }

    noticias2 = () => {
        const userEdunoObjeto = {
            nome: this.props.nome,
            email: this.props.email,
            isLoadingEduno: false,
            token: this.props.token,
            filhos: this.props.filhos,
            id: 1
        }
        this.props.onAtualizaID(userEdunoObjeto)
        this.props.navigation.navigate('MenuPrincipal')
    }

    noticias3 = () => {
        const userEdunoObjeto = {
            nome: this.props.nome,
            email: this.props.email,
            isLoadingEduno: false,
            token: this.props.token,
            filhos: this.props.filhos,
            id: 2
        }
        this.props.onAtualizaID(userEdunoObjeto)
        this.props.navigation.navigate('MenuPrincipal')
    }

    noticias4 = () => {
        const userEdunoObjeto = {
            nome: this.props.nome,
            email: this.props.email,
            isLoadingEduno: false,
            token: this.props.token,
            filhos: this.props.filhos,
            id: 3
        }
        this.props.onAtualizaID(userEdunoObjeto)
        this.props.navigation.navigate('MenuPrincipal')
    }

    noticias5 = () => {
        const userEdunoObjeto = {
            nome: this.props.nome,
            email: this.props.email,
            isLoadingEduno: false,
            token: this.props.token,
            filhos: this.props.filhos,
            id: 4
        }
        this.props.onAtualizaID(userEdunoObjeto)
        this.props.navigation.navigate('MenuPrincipal')
    }

    formataImagem(foto) {
        const base64 = 'data:image/png;base64,' + foto
        return base64
    }

    renderUnique = () => {
        if (this.props.filhos.length === 1) {
            if (this.props.filhos[0].perfil.toString() === 'ALUNO') {
                return (
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.noticias1}
                            style={styles.buttom}>
                            <Image source={{uri: this.formataImagem(this.props.filhos[0].foto)}}
                                style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.noticias1}
                            style={styles.buttom}>
                            <Text style={styles.nickname}>
                                {this.formata_nome(this.props.nome)}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.logoutEduno} style={styles.buttom}>
                            <Text style={styles.buttomText}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={styles.container}>
                        <Text style={styles.bemvindo}>
                            Bem vindo, {this.formata_nome(this.props.nome)}!
                        </Text>
                        <Text style={styles.bemvindo2}>
                            Clique para ver os dados dos alunos:
                        </Text>
                        <View style={styles.containerAluno}>
                            <View style={styles.rowContainer}>
                                <TouchableOpacity onPress={this.noticias1}
                                    style={styles.buttom}>
                                    <Text style={styles.nickname}>
                                        {this.formata_nome_aluno(this.props.filhos[0].nome)}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.noticias1}
                                    style={styles.buttom}>
                                    <Image source={{uri: this.formataImagem(this.props.filhos[0].foto)}}  
                                            style={styles.image} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={this.logoutEduno} style={styles.buttom}>
                            <Text style={styles.buttomText}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        } else if (this.props.filhos.length === 2) {
            return (
                <View style={styles.container}>
                    <Text style={styles.bemvindo}>
                        Bem vindo, {this.formata_nome(this.props.nome)}!
                    </Text>
                    <Text style={styles.bemvindo2}>
                        Clique para ver os dados dos alunos:
                    </Text>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias1}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[0].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias1}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[0].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias2}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[1].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias2}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[1].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.logoutEduno} style={styles.buttom}>
                        <Text style={styles.buttomText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (this.props.filhos.length === 3) {
            return (
                <View style={styles.container}>
                    <Text style={styles.bemvindo}>
                        Bem vindo, {this.formata_nome(this.props.nome)}!
                    </Text>
                    <Text style={styles.bemvindo2}>
                        Clique para ver os dados dos alunos:
                    </Text>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias1}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[0].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias1}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[0].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias2}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[1].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias2}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[1].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias3}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[2].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias3}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[2].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.logoutEduno} style={styles.buttom}>
                        <Text style={styles.buttomText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (this.props.filhos.length === 4) {
            return (
                <View style={styles.container}>
                    <Text style={styles.bemvindo}>
                        Bem vindo, {this.formata_nome(this.props.nome)}!
                    </Text>
                    <Text style={styles.bemvindo2}>
                        Clique para ver os dados dos alunos:
                    </Text>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias1}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[0].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias1}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[0].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias2}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[1].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias2}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[1].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias3}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[2].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias3}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[2].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias4}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[3].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias4}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[3].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.logoutEduno} style={styles.buttom}>
                        <Text style={styles.buttomText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (this.props.filhos.length === 5) {
            return (
                <View style={styles.container}>
                    <Text style={styles.bemvindo}>
                        Bem vindo, {this.formata_nome(this.props.nome)}!
                    </Text>
                    <Text style={styles.bemvindo2}>
                        Clique para ver os dados dos alunos:
                    </Text>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias1}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[0].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias1}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[0].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias2}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[1].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias2}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[1].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias3}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[2].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias3}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[2].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias4}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[3].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias4}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[3].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerAluno}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={this.noticias5}
                                style={styles.buttom}>
                                <Text style={styles.nickname}>
                                    {this.formata_nome_aluno(this.props.filhos[4].nome)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.noticias5}
                                style={styles.buttom}>
                                <Image source={{uri: this.formataImagem(this.props.filhos[4].foto)}}  
                                        style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.logoutEduno} style={styles.buttom}>
                        <Text style={styles.buttomText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        return this.renderUnique()
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2C2D3F'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 100
    },
    nickname: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Montserrat',
        backgroundColor: '#2C2D3F'
    },
    bemvindo: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        color: '#FFF'
    },
    bemvindo2: {
        marginBottom: 30,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Montserrat',
        color: '#FFF'
    },
    nomeUsuario: {
        marginTop: 20,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Montserrat',
        color: '#FFF'
    },
    ra: {
        marginTop: 20,
        fontSize: 25
    },
    buttom: {
        marginTop: 30,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#2C2D3F'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF',
        backgroundColor: '#2C2D3F'
    },
    image: {
        height: Dimensions.get('window').width * 15 / 100,
        width: Dimensions.get('window').width * 4 / 10,
        marginTop: 10,
        resizeMode: 'center',
        borderRadius: 120
    },
    nickname: {
        width: Dimensions.get('window').width * 45 / 100,
        height: 20,
        resizeMode: 'contain',
        color: '#BEF5FE',
        fontFamily: 'Montserrat',
        paddingLeft: 20
    },
    containerAluno: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#F5FCFF',
        width: '100%'
    }
})

const mapStateToProps = ({ userEduno, dadosProvas, dadosEventos, etapa, dadosTarefas, quadro }) => {
    return {
        nome: userEduno.nome,
        email: userEduno.email,
        token: userEduno.token,
        filhos: userEduno.filhos,
        id: userEduno.id,
        mes: dadosProvas.mes,
        ano: dadosProvas.ano,
        provas: dadosProvas.provas,
        eventos: dadosEventos.eventos,
        numeroEtapa: etapa.numeroEtapa,
        descricao: etapa.descricao,
        notas: etapa.notas,
        numeroEtapaTarefa: dadosTarefas.numeroEtapaTarefa,
        data: dadosTarefas.data,
        tarefas: dadosTarefas.tarefas,
        dia: quadro.dia,
        diaDaSemana: quadro.diaDaSemana,
        horarios: quadro.horarios,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchNoticias: (token) => dispatch(fetchNoticias(token)),
        onLogoutEduno: () => dispatch(logoutEduno()),
        onFetchProvas: (token, filhos, id) => dispatch(fetchProvas(token, filhos, id)),
        onFetchEventos: (token, filhos, id) => dispatch(fetchEventos(token, filhos, id)),
        onAtualizaID: (userEduno) => dispatch(atualizaID(userEduno)),
        onFetchNotas: (token, filhos, id) => dispatch(fetchNotas(token, filhos, id)),
        onFetchTarefas: (token, filhos, id) => dispatch(fetchTarefas(token, filhos, id)),
        onFetchHorarios: (token, filhos, id) => dispatch(fetchHorarios(token, filhos, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEduno)