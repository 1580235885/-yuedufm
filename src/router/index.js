import Vue from 'vue'
import VueRouter from 'vue-router'
import ContentLeft from '../views/ContentLeft.vue'
import ContentRight from '../views/ContentRight.vue'
import ListRight from '../views/ListRight.vue'
import ListLeft from '../views/ListLeft.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		alias: '/article/1025',
		components: {
			a:ContentLeft,
			b:ContentRight,
		}
	},
	{
		path: '/article/:id',
		components: {
			a:ContentLeft,
			b:ContentRight,
		}
	},
	{
		path: '/list/:num/page/:page',
		components: {
			a:ListLeft,
			b:ListRight,
		}
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
