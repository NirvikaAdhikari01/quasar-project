const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'signup', component: () => import('pages/SignupPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'dashboard', component: () => import('pages/Dashboard.vue') },
      { path: 'taskpage', component: () => import('pages/TasksPage.vue') },
      { path: 'addtask', component: () => import('pages/AddTask.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
