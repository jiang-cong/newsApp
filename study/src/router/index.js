import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Search from '@/components/search'
import OneiroMancy from '@/components/OneiroMancy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/search',
      name:'Search',
      component:Search
    },
    {
      path:'/oneiroMancy',
      name:'OneiroMancy',
      component:OneiroMancy
    }
  ]
})
