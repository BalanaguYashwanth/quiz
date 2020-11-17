import quiz from './components/quiz'
import home from './components/home'
import quiz1 from './components/quiz1'

import Vue from 'vue'
import Vuerouter from 'vue-router'
Vue.use(Vuerouter)

const router = new Vuerouter({
    mode:'history',
    routes:[
        {path:'/quiz',name:'quiz',component:quiz},
        {path:'/home',name:'home',component:home},
        {path:'/quiz1',name:'quiz1',component:quiz1},
    ]


})

export default router
