import { createRouter, RouteRecordRaw , Router, createWebHashHistory} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/pages/Home.vue'),
		meta: {
			title: '首页'
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/pages/Login.vue'),
		meta: {
			title: '登录'
		}
	}
]

const router: Router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router