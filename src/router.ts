import Vue from 'vue'
import Router from 'vue-router'
import Apontamento from './views/Apontamento.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/apontamentos',
      name: 'apontamentos',
      component: Apontamento
    },
    {
      path:'*',
      redirect:'/apontamentos'
    }
  ]
})
