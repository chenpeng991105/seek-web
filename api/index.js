import http from '../utils/request.js';

// 登录获取token
export const login = (data) => {
	return http.request({
		url: '/api/login/wx',
		method: 'POST',
		data
	})
}

// 微信用户授权
export const auth = (data) => {
	return http.request({
		url: '/api/wxuser/auth',
		method: 'POST',
		data
	})
}

// 更新用户信息
export const updateUserInfo = (data) => {
	return http.request({
		url: '/api/wxuser/update',
		method: 'POST',
		data
	})
}

// 用户信息
export const userInfo = () => {
	return http.request({
		url: '/api/wxuser/info'
	})
}

// 热门搜索
export const hotSearch = () => {
	return http.request({
		url: '/api/hotsearch/list'
	})
}

// ai聊天
export const aiChat = (data) => {
	return http.request({
		url: '/api/chat',
		method: 'POST',
		data
	})
}

// ai聊天次数
export const aiChatCount = () => {
	return http.request({
		url: '/api/chat/count'
	})
}

// 保存ai聊天记录
export const saveAiChat = (data) => {
	return http.request({
		url: '/api/chat/save',
		method: 'POST',
		data
	})
}

// 聊天保存记录
export const chatSaveList = (data) => {
	return http.request({
		url: '/api/chat/save/list',
		data
	})
}

// 在线聊天列表
export const onlineChatList = (data) => {
	return http.request({
		url: '/api/chat/msg',
		data
	})
}

// 置顶聊天
export const placementChat = (data) => {
	return http.request({
		url: '/api/chat/msg/top',
		method: 'POST',
		data
	})
}

// 删除聊天
export const deleteChat = (data) => {
	return http.request({
		url: '/api/chat/msg/del',
		method: 'POST',
		data
	})
}

// 任务列表
export const taskList = () => {
	return http.request({
		url: '/api/task/list'
	})
}

// 标签内容
export const tagInfo = (data) => {
	return http.request({
		url: '/api/tag/info',
		data
	})
}

// 标签列表
export const tagList = (data) => {
	return http.request({
		url: '/api/tag/list',
		data
	})
}

// 推荐教练列表
export const recommendCoachList = (data) => {
	return http.request({
		url: '/api/trainer/list',
		data
	})
}

// 教练详情
export const coachDetail = (data) => {
	return http.request({
		url: '/api/trainer/info',
		data
	})
}

// 搜索教练
export const searchCoach = (data) => {
	return http.request({
		url: '/api/trainer/search',
		method: 'POST',
		data
	})
}

// 关注教练
export const followCoach = (data) => {
	return http.request({
		url: '/api/follow/sub',
		method: 'POST',
		data
	})
}

// 用户关注列表
export const userFollowList = (data) => {
	return http.request({
		url: '/api/follow/list',
		data
	})
}

// 订单列表
export const orderList = (data) => {
	return http.request({
		url: '/api/order/list',
		data
	})
}

// 获取订单预支付信息
export const orderPrePayInfo = (data) => {
	return http.request({
		url: '/api/order/pre_pay',
		method: 'POST',
		data
	})
}

// 收入列表
export const incomeList = (data) => {
	return http.request({
		url: '/api/income/list',
		data
	})
}

// 上传图片
export const uploadImage = (data) => {
	return http.request({
		url: '/common/upload',
		method: 'POST',
		data
	})
}

// 更新教练个人信息
export const updateCoach = (data) => {
	return http.request({
		url: '/api/trainer/update',
		method: 'POST',
		data
	})
}

// 投诉
export const complaint = (data) => {
	return http.request({
		url: '/api/advice/add',
		method: 'POST',
		data
	})
}

// 设置在线状态
export const setOnline = (data) => {
	return http.request({
		url: '/api/trainer/online',
		method: 'POST',
		data
	})
}

// 设备id
export const deviceId = (data) => {
	return http.request({
		url: '/api/im/device',
		method: 'POST',
		data
	})
}

// websocket接口地址
export const wsUrl = 'ws://101.200.74.207:20002/wx_ws'

// 获取im通信的用户信息(包含token和用户id)
export const imUserInfo = (data) => {
	return http.request({
		url: '/api/im/login',
		method: 'POST',
		data
	})
}

// 发送消息
export const sendMessage = (data) => {
	return http.request({
		url: '/api/im/send',
		method: 'POST',
		data
	})
}