import Request from '@/js_sdk/luch-request/luch-request/index.js';
import { login } from '@/api/index.js'; 

const baseURL = 'http://101.200.74.207:20031';
const http = new Request();

http.setConfig((config) => {
	config.baseURL = baseURL;
	return config;
});

// 请求拦截
http.interceptors.request.use(
	(config) => {
		config.header = {
			...config.header,
			token: uni.getStorageSync('token') || ''
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

// 防止重复刷新标志
let isRefresh = false;
// 重试队列
let requestQueues = [];

http.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(err) => {
		console.log(err);
		if (err.statusCode === 401) {
			const config = err.config;
			if (!isRefresh) {
				isRefresh = true;
				return getToken().then(() => {
					requestQueues.forEach(cb => cb());
					requestQueues = [];
					return http.request(config);
				}).finally(() => {
					isRefresh = false;
				});
			} else {
				return new Promise((resolve) => {
					requestQueues.push(() => {
						resolve(http.request(config));
					});
				});
			}
		} else {
			uni.showToast({
				title: '出错了，请重试',
				icon: 'error'
			});
		}
		return Promise.reject(err);
	}
);

export const getToken = () => {
	return new Promise(resolve => {
		uni.login({
			provider: 'weixin',
			success: async ({ code }) => {
				login({ code }).then(res => {
					uni.setStorageSync('token', res.data.token);
					resolve();
				});
			}
		})
	})
}

export default http;