import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import BlogDetailView from '../views/BlogDetailView.vue'
import TodoListView from '../views/TodoListView.vue'
import ListView from '../views/ListView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/blog', component: BlogView },
  { path: '/blog/:path', component: BlogDetailView },
  { path: '/todo-list', component: TodoListView },
  { path: '/list', component: ListView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
