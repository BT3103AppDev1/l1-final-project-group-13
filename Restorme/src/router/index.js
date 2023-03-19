import { createRouter, createWebHistory } from 'vue-router'
import resumes from '@/views/resumes.vue'

const routes = [
 {
 path: '/resumes',
 name: 'resumes',
 component: resumes
 },

]
const router = createRouter({
 history: createWebHistory(),
 routes
})
export default router