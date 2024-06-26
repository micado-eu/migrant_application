

const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '/documents', name:'document', component: () => import('pages/DocumentWallet.vue') , meta: { auth: true } },
      { path: '/documents/add', component: () => import('components/AddDocument.vue'), meta: { auth: true } },
      { path: '/documents/:thedocid', name: 'viewdocument', component: () => import('components/DocumentViewerComponent.vue'), props: (route) => ({ ...route.params }), meta: { auth: true } },
      { path: '/services', component: () => import('pages/Services.vue')},
      { path: '/flows', component: () => import('pages/Flows.vue') },
      { path: '/processes', component: () => import('pages/Processes.vue')},
      { path: '/processes/:processid', name: 'process', component: () => import('pages/ProcessViewer.vue'), props: (route) => ({ ...route.params }), },
      { path: '/notifications', component: () => import('components/Notifications.vue')},
      { path: '/reserved', component: () => import('pages/Reserved.vue')},
      { path: '/tasks', name:'tasks', component: () => import('pages/PlanList.vue') , meta: { auth: true } },
      { path: '/tasks/:theplanid', component: () => import('pages/SinglePlan.vue'), props: (route) => ({ ...route.params }), name: 'plan', meta: { auth: true } },
      { path: '/settings', name:'settings', component: () => import('pages/ProfileSettings.vue'), meta: { auth: true } },
      { path: '/profile', name:'profile', component: () => import('pages/PersonalProfile.vue'), meta: { auth: true } },
      { path: '/privacy', name:'privacy', component: () => import('pages/Privacy.vue')},
      { path: '/glossary/:id?', component: () => import('pages/Glossary.vue'), name:'glossary'  },
      { path: '/documents/edit/:thedocid', component: () => import('components/AddDocument.vue'), props: (route) => ({ ...route.params }), name: 'editdocument', meta: { auth: true } },
      { path: '/decision',  component: () => import('pages/DecisionTreePage.vue')},
      { path: '/information', component: () => import('pages/InformationCentre.vue')},
      { path: '/information/:id', name:'info', component: () => import('pages/InformationItem.vue'),props: (route) => ({ ...route.params })},
      { path: '/events', component: () => import('pages/Events.vue')},
      { path: '/events/:id', name:'events', component: () => import('pages/EventItem.vue'), props: (route) => ({ ...route.params })},
      { path: '', name:'home', component: () => {
        if(localStorage.getItem("landingPage") == 'true' || localStorage.getItem("landingPage") == null){
          return import('pages/LandingPage.vue')
        }
        else{
          return import('pages/TopicChoices.vue')
        }
      }
    },
      { path: 'topic', name:'topic', component: () => import('pages/TopicChoices.vue'), props: (route) => ({ ...route.params })},
      { path: 'welcome', name:'welcome', component: () => import('pages/LandingPage.vue'), props: (route) => ({ ...route.params })},
      { path: 'about', name:'about', component: () => import('pages/About.vue'), props: (route) => ({ ...route.params })},
      { path: 'poweredBy', name:'poweredBy', component: () => import('pages/PoweredBy.vue'), props: (route) => ({ ...route.params })},
      { path: 'topic/:topicFilter', name:'crumbs', component: () => import('pages/TopicChoices.vue'), props: (route) => ({ ...route.params })}
    ]
  }
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
