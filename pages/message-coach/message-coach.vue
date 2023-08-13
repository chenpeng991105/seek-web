<template>
	<view class="page-container1">
		<nav-bar show-back show-bg :title="name"></nav-bar>
		<view class="countdown-wrapper flex-center">
			<countdown-timer :time="1200000" :auto-start="autoStartCountdown">
				<template v-slot="{minute, second}">
					<view class="countdown-text">倒计时{{minute}}:{{second}}s</view>
				</template>
			</countdown-timer>
		</view>
		<view class="bottom-wrapper items-center">
			<!-- <view class="input-wrapper"></view> -->
			<input type="text" placeholder="请输入内容" class="message-input" v-model="content">
			<button type="primary" class="btn-send" @click="onSendMessage">发送</button>
		</view>
		<view class="scroll-wrapper">
			<view class="message-time">昨天21:30</view>
			<chat-message>
				您好呀！聊天内容聊天内容
			</chat-message>
			<chat-message position="right">
				您好呀！聊天内容聊天内容
				聊天内容聊天内容聊天内容
				聊天内容聊天内容
			</chat-message>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { wsUrl, imUserInfo, sendMessage } from '@/api/index.js';
	
	const autoStartCountdown = ref(false);
	const name = ref('');
	const content = ref('');
	const deviceId = uni.getStorageSync('device_id');
	let chatId, imToken, sendData;
	
	onLoad((option) => {
		chatId = +option.id;
		name.value = option.name;
		connectSocket();
	});
	const getImUserInfo = async () => {
		const res = await imUserInfo({ device_id: deviceId });
		const { im_token, im_user_id } = res.data;
		imToken = im_token;
		sendData = {
			type: 1,
			data: JSON.stringify({
				user_id: im_user_id,
				device_id: deviceId,
				token: imToken
			})
		};
	};
	const connectSocket = () => {
		uni.connectSocket({
			url: wsUrl,
			success: (res) => {
				console.log('WebSocket连接成功！');
			},
			fail: (res) => {
				console.log('WebSocket连接失败！');
			}
		});
	};
	uni.onSocketOpen(async (res) => {
		console.log('WebSocket连接已打开！');
		await getImUserInfo();
		sendData.request_id = new Date().getTime();
		uni.sendSocketMessage({
			data: JSON.stringify(sendData),
			success: () => {
				console.log('socket登录消息发送成功');
			},
			fail: () => {
				console.log('socket登录消息发送失败');
			}
		});
	});
	let heartBeatTimer = null;
	let heartBeatFailCount = 0;
	const heartBeat = () => {
		sendData.type = 3;
		sendData.request_id = new Date().getTime();
		uni.sendSocketMessage({
			data: JSON.stringify(sendData),
			success: () => {
				heartBeatTimer = setTimeout(() => {
					heartBeat();
				}, 7000);
			},
			fail: () => {
				if (heartBeatFailCount > 2) {
					connectSocket();
				}
				heartBeatTimer = setTimeout(() => {
					heartBeat();
				}, 7000);
				heartBeatFailCount++;
			}
		});
	};
	uni.onSocketError((res) => {
		console.log('WebSocket连接打开失败，请检查！');
	});
	uni.onSocketMessage((res) => {
		console.log('收到消息', res.data);
	});
	const onSendMessage = async () => {
		await sendMessage({
			content: content.value,
			device_id: uni.getStorageSync('device_id'),
			id: chatId,
			token: imToken
		});
	};
</script>

<style lang="scss" scoped>
	.username {
		margin-left: 28rpx;
		margin-right: 26rpx;
		font-size: 40rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #fff;
		line-height: 56rpx;
	}
	.countdown-wrapper {
		position: absolute;
		top: 222rpx;
		right: 0;
		z-index: 10;
		width: 242rpx;
		height: 78rpx;
		border-radius: 110rpx 0rpx 0rpx 110rpx;
		border: 2rpx solid #E6E6E6;
		border-right-color: transparent;
		.countdown-text {
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			line-height: 33rpx;
			background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}
	.bottom-wrapper {
		position: absolute;
		bottom: 116rpx;
		width: 100%;
		padding-left: 32rpx;
		padding-right: 28rpx;
		.btn-send {
			padding: 0 20rpx;
		}
		.message-input {
			width: 512rpx;
			height: 80rpx;
			padding-left: 48rpx;
			background: rgba(255,255,255,0.66);
			box-shadow: 8rpx 8rpx 22rpx 0rpx rgba(193,193,193,0.25);
			border-radius: 8rpx;
		}
		.icon-emoji,
		.icon-add {
			width: 64rpx;
			height: 64rpx;
		}
		.icon-emoji {
			margin-left: 32rpx;
			margin-right: 18rpx;
		}
	}
	.scroll-wrapper {
		width: 100%;
		height: 1070rpx;
		margin-top: 154rpx;
		padding: 0 32rpx;
		.message-time {
			margin-bottom: 32rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
			line-height: 33rpx;
		}
	}
</style>
