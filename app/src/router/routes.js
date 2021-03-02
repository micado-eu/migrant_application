import Index from 'pages/Index.vue'
import Documents from 'pages/Documents.vue'
import Services from 'pages/Services.vue'
import Flows from 'pages/Flows.vue'
import Notifications from 'components/Notifications.vue'
import Speech from 'pages/Speech.vue'
import Gioppo from 'pages/Gioppo.vue'
import Home from 'pages/Home.vue'
import Tasks from 'pages/Tasks.vue'
import Chatbot from 'pages/Chatbot.vue'
import ProfileSettings from 'pages/ProfileSettings.vue'
import Certificates from 'pages/Certificates.vue'
import MapView from 'components/Map.vue'
import Glossary from 'pages/Glossary.vue'
import DecisionTreePage from 'pages/DecisionTreePage.vue'
import Processes from 'pages/Processes.vue'
import DocumentWallet from 'pages/DocumentWallet'
import DocumentViewerComponent from 'components/DocumentViewerComponent'
import AddDocument from 'components/AddDocument'
import ProcessViewer from 'pages/ProcessViewer'
import InformationCentre from 'pages/InformationCentre'
import InformationItem from 'pages/InformationItem'
import Reserved from 'pages/Reserved'
import Events from 'pages/Events'
import EventItem from 'pages/EventItem'
import { information } from '../store/information/getters'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      //{ path: '', component: () => import('pages/Index.vue') },
      { path: '/documents', component: () => import('pages/DocumentWallet.vue') , meta: { auth: true } },
      { path: '/documents/add', component: () => import('components/AddDocument.vue'), meta: { auth: true } },
      { path: '/documents/:thedocid', name: 'viewdocument', component: () => import('components/DocumentViewerComponent.vue'), props: (route) => ({ ...route.params }), meta: { auth: true } },
      //{ path: '/documents/edit/:id', component: AddDocument, props: true, name: document, meta: { auth: true } },
      { path: '/services', component: () => import('pages/Services.vue')},
      { path: '/flows', component: () => import('pages/Flows.vue') },
      { path: '/processes', component: () => import('pages/Processes.vue')},
      { path: '/processes/:processid', name: 'document', component: () => import('pages/ProcessViewer.vue'), props: (route) => ({ ...route.params }), },
      { path: '/notifications', component: () => import('components/Notifications.vue')},
      { path: '/speech', component: () => import('pages/Speech.vue')},
      { path: '/reserved', component: () => import('pages/Reserved.vue')},
      { path: '/login', component: () => import('pages/Gioppo.vue')},
      { path: '/tasks', component: () => import('pages/PlanList.vue') , meta: { auth: true } },
      { path: '/tasks/:theplanid', component: () => import('pages/SinglePlan.vue'), props: (route) => ({ ...route.params }), name: 'plan', meta: { auth: true } },
      { path: '/chatbot', component: () => import('pages/Chatbot.vue') },
      { path: '/settings', component: () => import('pages/ProfileSettings.vue'), meta: { auth: true } },
      { path: '/certificates', component: () => import('pages/Certificates.vue'), props: true, name: 'certificates' },
      { path: '/map', component: () => import('components/Map.vue')},
      { path: '/glossary/:id?', component: () => import('pages/Glossary.vue')  },
      { path: '/documents/edit/:thedocid', component: () => import('components/AddDocument.vue'), props: (route) => ({ ...route.params }), name: 'editdocument', meta: { auth: true } },
      { path: '/decision',  component: () => import('pages/DecisionTreePage.vue')},
      { path: '/information', component: () => import('pages/InformationCentre.vue')},
      { path: '/information/:id', name:'info', component: () => import('pages/InformationItem.vue'),props: (route) => ({ ...route.params })},
      { path: '/events', component: () => import('pages/Events.vue')},
      { path: '/events/:id', name:'events', component: () => import('pages/EventItem.vue'), props: (route) => ({ ...route.params })},
      { path: '', name:'home', component: () => import('pages/TopicChoices.vue')},
      { path: '/:topicFilter', name:'crumbs', component: () => import('pages/TopicChoices.vue'), props: (route) => ({ ...route.params })}
    ]
  }
  /*,
  {
    path: '/documents',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Documents.vue') }
    ]
  },
  {
    path: '/services',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Services.vue') }
    ]
  },
  {
    path: '/flows',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Flows.vue') }
    ]
  },
  {
    path: '/notifications',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Notifications.vue') }
    ]
  },
  {
    path: '/map',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Map.vue') }
    ]
  },
  {
    path: '/chatbot',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Chatbot.vue') }
    ]
  }*/
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
