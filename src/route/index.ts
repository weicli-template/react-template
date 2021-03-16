import React from 'react';
import Layout from '@page/layout';
import Loadable from 'react-loadable';
import Loading from '@component/loading';

const Home = Loadable({loader: () => import('@page/home'), loading: Loading});
const Page1 = Loadable({loader: () => import('@page/page1'), loading: Loading});
const Login = Loadable({loader: () => import('@page/login'), loading: Loading});

const routes = [
	{
		path: '/login',
		component: Login
	}, {
		path: '/',
		exact: false,
		children: { //嵌套路由父路由不能使用exact
			layout: Layout,
			routes: [
				{
					path: '/',
					component: Home,
				}, {
					path: '/page1',
					component: Page1,
				}
			]
		}
	},

]

export default routes;
