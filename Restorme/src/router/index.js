import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/resumes',
    name: 'Resumes',
    component: () => import('@/views/Resumes.vue'),
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/Help.vue'),
  },
  {
    path: '/homeWithZeroResumes',
    name: 'HomeWithZeroResumes',
    component: () => import('@/views/HomeWithZeroResumes.vue'),
  },
  // {
  //   path: '/resumeCommentDisplay',
  //   name: 'ResumeCommentDisplay',
  //   component: () => import('@/views/ResumeCommentDisplay.vue'),
  // },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
