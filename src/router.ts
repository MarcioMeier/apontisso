import Vue from 'vue'
import Router from 'vue-router'
import Apontamentos from './views/Apontamentos.vue'
import EditarApontamento from './views/EditarApontamentos.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/apontamentos',
      name: 'apontamentos',
      component: Apontamentos
    },
    {
      path: '/apontamentos/novo',
      name: 'novo-apontamento',
      component: EditarApontamento
    },
    {
      path: '/apontamentos/:id',
      name: 'editar-apontamento',
      component: EditarApontamento,
      props:true
    },
    {
      path:'*',
      redirect:'/apontamentos'
    }
  ]
})
