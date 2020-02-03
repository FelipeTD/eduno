import React from 'react'
import { 
    createBottomTabNavigator,
    createSwitchNavigator,
    createStackNavigator
 } from 'react-navigation'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import fontelloConfig from './config.json'
const Icon = createIconSetFromFontello(fontelloConfig)
import Header from './components/Header'

import Noticias from './screens/Noticias'
import Boletim from './screens/Boletim'
import Horarios from './screens/Horarios'
import Tarefas from './screens/Tarefas'
import Provas from './screens/Provas'
import Eventos from './screens/Eventos'
import LoginEduno from './screens/LoginEduno'
import Splash from './screens/Splash'
import RecuperarSenha from './screens/RecuperarSenha'
import ProfileEduno from './screens/ProfileEduno'
import TarefaDetalhada from './screens/TarefaDetalhada'
import NoticiaDetalhada from './screens/NoticiaDetalhada'
import MenuPrincipal from './screens/MenuPrincipal'

// Imports de exemplo
import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'

// Parte de exemplo
/*
const authRouter = createStackNavigator({
    Login: { screen: Login, navigationOptions: { title: 'Login' } },
    Register: { screen: Register, navigationOptions: { title: 'Register' } }
}, {
    initialRouteName: 'Login'
})

const loginOrProfileRouter = createSwitchNavigator({
    Profile: Profile,
    Auth: authRouter
}, {
    initialRouteName: 'Auth'
})
*/

// Parte Principal

const noticiaRouterEduno = createStackNavigator({
    Noticias: { screen: Noticias, navigationOptions: { 
        title: 'Notícias',
        headerStyle: { 
            backgroundColor: '#03888A'
        } 
    } },
    NoticiaDetalhada: { screen: NoticiaDetalhada, navigationOptions: {
        title: 'Notícia Detalhada',
        headerStyle: { 
            backgroundColor: '#03888A'
        }
    }}
})

const tarefaRouterEduno = createStackNavigator({
    Tarefas: { screen: Tarefas, navigationOptions: {
        title: 'Tarefas',
        headerStyle: { 
            backgroundColor: '#03888A'
        } 
    } },
    TarefaDetalhada: { screen: TarefaDetalhada, navigationOptions: { 
        title: 'Tarefa Detalhada',
        headerStyle: { 
            backgroundColor: '#03888A'
        } 
    } }
})

const authRouterEduno = createStackNavigator({
    LoginEduno: { screen: LoginEduno, navigationOptions: {
        headerStyle: {
            height: 0
        }
    } },
    RecuperarSenha: { screen: RecuperarSenha, navigationOptions: { 
        title: 'Recuperar Senha',
        headerStyle: { 
            backgroundColor: '#03888A' 
        } 
    } }
})

const profileRouterEduno = createStackNavigator({
    ProfileEduno: { screen: ProfileEduno, navigationOptions: {
        headerStyle: { 
            height: 0
        } 
    } }
})

const menuPrincipalRouterEduno = createStackNavigator({
    MenuPrincipal: { screen: MenuPrincipal, navigationOptions: {
        headerStyle: {
            height: 0
        }
    }}
})

const boletimRouterEduno = createStackNavigator({
    Boletim: { screen: Boletim, navigationOptions: {
        title: 'Boletim',
        headerStyle: { 
            backgroundColor: '#03888A' 
        } 
    }}
})

const horariosRouterEduno = createStackNavigator({
    Horarios: { screen: Horarios, navigationOptions: {
        title: 'Horários',
        headerStyle: {
            backgroundColor: '#03888A'
        }
    }}
})

const provasRouterEduno = createStackNavigator({
    Provas: { screen: Provas, navigationOptions: {
        title: 'Provas',
        headerStyle: {
            backgroundColor: '#03888A'
        }
    }}
})

const eventosRouterEduno = createStackNavigator({
    Eventos: { screen: Eventos, navigationOptions: {
        title: 'Eventos',
        headerStyle: {
            backgroundColor: '#03888A'
        }
    }}
})

const noticiaOrDetalhadaRouter = createSwitchNavigator({
    NoticiaDetalhada: NoticiaDetalhada,
    Inicial: noticiaRouterEduno
}, {
    initialRouteName: 'Inicial'
})

const tarefaOrDetalhadaRouter = createSwitchNavigator({
    TarefaDetalhada: TarefaDetalhada,
    Inicial: tarefaRouterEduno
}, {
    initialRouteName: 'Inicial'
})

const loginOrProfileRouter = createSwitchNavigator({
    ProfileEduno: profileRouterEduno,
    MenuPrincipal: menuPrincipalRouterEduno,
    Auth: authRouterEduno
}, {
    initialRouteName: 'Auth'
})

const boletimRouter = createSwitchNavigator({
    Inicial: boletimRouterEduno
}, {
    initialRouteName: 'Inicial'
})

const horariosRouter = createSwitchNavigator({
    Inicial: horariosRouterEduno
}, {
    initialRouteName: 'Inicial'
})

const provasRouter = createSwitchNavigator({
    Inicial: provasRouterEduno
}, {
    initialRouteName: 'Inicial'
})

const eventosRouter = createSwitchNavigator({
    Inicial: eventosRouterEduno
}, {
    initialRouteName: 'Inicial'
})

const MenuRoutes = {
    LoginEduno: {
        name: 'Eduno',
        screen: loginOrProfileRouter,
        navigationOptions: {
            tabBarVisible: false,
            title: 'Eduno',
            tabBarIcon: ({ tintColor }) => 
                <Icon2 name='user' size={15} color={tintColor} />
        }
    },    
    Noticias: {
        name: 'Noticias',
        screen: noticiaOrDetalhadaRouter,
        navigationOptions: {
            tabBarVisible: true,
            title: 'Notícias',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='news' size={15} color={tintColor} />
        }
    },
    Boletim: {
        name: 'Boletim',
        screen: boletimRouter,
        navigationOptions: {
            title: 'Boletim',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='boletim' size={15} color={tintColor} />
        }
    },
    Eventos: {
        name: 'Eventos',
        screen: eventosRouter,
        navigationOptions: {
            title: 'Eventos',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='eventos' size={15} color={tintColor} />
        }
    },
    Tarefas: {
        name: 'Tarefas',
        screen: tarefaOrDetalhadaRouter,
        navigationOptions: {
            title: 'Tarefas',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='tarefas' size={15} color={tintColor} />
        }
    },
    Horarios: {
        name: 'Horários',
        screen: horariosRouter,
        navigationOptions: {
            title: 'Horários',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='calendário' size={15} color={tintColor} />
        }
    },
    Provas: {
        name: 'Provas',
        screen: provasRouter,
        navigationOptions: {
            title: 'Provas',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='provas' size={15} color={tintColor} />
        }
    }
    
    //Chamadas de exemplo
    /*
    AddPhoto: {
        name: 'Adicionar Foto',
        screen: AddPhoto,
        navigationOptions: {
            title: 'Adicionar Foto',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='camera' size={15} color={tintColor} />
        }
    },
    Profile: {
        name: 'Perfil',
        screen: loginOrProfileRouter,
        navigationOptions: {
            title: 'Perfil',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='user' size={15} color={tintColor} />
        }
    },
    Feed: {
        name: 'Home',
        screen: Feed,
        navigationOptions: {
            title: 'Home',
            tabBarIcon: ({ tintColor }) => 
                <Icon name='home' size={15} color={tintColor} />
        }
    },
    */
}

const MenuConfig = {
    initialRouteName: 'LoginEduno',
    tabBarOptions: {
        showLabel: true,
    }
}

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig)

const SplashRouter = createSwitchNavigator({
    Splash: Splash,
    App: MenuNavigator
}, {
    initialRouteName: 'Splash'
})

export default SplashRouter
