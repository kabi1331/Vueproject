import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Homepage from '@/components/management/homepage'
import Usermanage from '@/components/management/usermanage'
import Adduser from '@/components/management/adduser'
import Product from '@/components/product/product'
import Classify from '@/components/product/classify'
import Addproduct from '@/components/product/addproduct'
import Addclassify from '@/components/product/addclassify'
import Supplier from '@/components/purchase/supplier'
import Addnote from '@/components/purchase/addnote'
import Finishpu from '@/components/purchase/finishpu'
import Inquire from '@/components/purchase/inquire'
import Addsupplier from '@/components/purchase/addsupplier'
import Newnote from '@/components/purchase/newnote'
import Changenote from '@/components/purchase/Changenote'
import Addsell from '@/components/sell/addsell'
import Adduserman from '@/components/sell/adduserman'
import Changesell from '@/components/sell/changesell'
import Newsell from '@/components/sell/newsell'
import Userman from '@/components/sell/userman'
import Inqusell from '@/components/sell/inqusell'
import Checkstock from '@/components/warehouse/checkstock'
import Instock from '@/components/warehouse/instock'
import Outstock from '@/components/warehouse/outstock'
import Query from '@/components/warehouse/query'
import Pay from '@/components/finance/pay'
import Receipt from '@/components/finance/receipt'
import Rpquery from '@/components/finance/rpquery'
import Finishsell from '@/components/sell/finishsell'
import Min from '@/components/statement/min'
import Mout from '@/components/statement/mout'
import Mps from '@/components/statement/mps'
import Mpu from '@/components/statement/mpu'
import Msell from '@/components/statement/msell'
import Msto from '@/components/statement/msto'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/homepage/:username',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/usermanage',
      name: 'Usermanage',
      component: Usermanage
    },
    {
      path: '/adduser',
      name: 'Adduser',
      component: Adduser
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/addproduct',
      name: 'Addproduct',
      component: Addproduct
    },
    {
      path: '/addclassify',
      name: 'Addclassify',
      component: Addclassify
    },
    {
      path: '/supplier',
      name: 'Supplier',
      component: Supplier
    },
    {
      path: '/addnote',
      name: 'Addnote',
      component: Addnote,
    },
    {
      path: '/changenote/:id',
      name: 'Changenote',
      component: Changenote,
    },
    {
      path: '/finishpu',
      name: 'Finishpu',
      component: Finishpu
    },
    {
      path: '/inquire',
      name: 'Inquire',
      component: Inquire
    },
    {
      path: '/addsupplier',
      name: 'Addsupplier',
      component: Addsupplier
    },
    {
      path: '/newnote',
      name: 'Newnote',
      component: Newnote
    },
    {
      path: '/addsell',
      name: 'Addsell',
      component: Addsell,
    },
    {
      path: '/changesell/:id',
      name: 'Changesell',
      component: Changesell,
    },
    {
      path: '/adduserman',
      name: 'Adduserman',
      component: Adduserman
    },
    {
      path: '/newsell',
      name: 'Newsell',
      component: Newsell
    },
    {
      path: '/userman',
      name: 'Userman',
      component: Userman
    },
    {
      path: '/inqusell',
      name: 'Inqusell',
      component: Inqusell
    },
    {
      path: '/checkstock',
      name: 'Checkstock',
      component: Checkstock
    },
    {
      path: '/instock',
      name: 'Instock',
      component: Instock
    },
    {
      path: '/outstock',
      name: 'Outstock',
      component: Outstock
    },
    {
      path: '/query',
      name: 'Query',
      component: Query
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/receipt',
      name: 'Receipt',
      component: Receipt
    },
    {
      path: '/rpquery',
      name: 'Rpquery',
      component: Rpquery
    },
    {
      path: '/finishsell',
      name: 'Finishsell',
      component: Finishsell
    },
    {
      path: '/min',
      name: 'Min',
      component: Min
    },
    {
      path: '/mout',
      name: 'Mout',
      component: Mout
    },
    {
      path: '/mps',
      name: 'Mps',
      component: Mps
    },
    {
      path: '/mpu',
      name: 'Mpu',
      component: Mpu
    },
    {
      path: '/msell',
      name: 'Msell',
      component: Msell
    },
    {
      path: '/msto',
      name: 'Msto',
      component: Msto
    },
  ]
})
