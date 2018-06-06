import Vue from 'vue'
import Router from 'vue-router'
import table from '@/components/table'
import EditSheet from '@/components/EditSheet'
import EditInstrument from '@/components/EditInstrument'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'table',
      component: table
    },
    {
      path: '/posts/:id/EditSheet',
      component: EditSheet,
      name: 'EditSheet'
    },
    {
      path: '/posts/:id/EditInstrument',
      component: EditInstrument,
      name: 'EditInstrument'
    }
  ]
})
