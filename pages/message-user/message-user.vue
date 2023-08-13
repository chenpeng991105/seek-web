<template>
	<view class="page-container1">
		<nav-bar show-back custom-back @page-back="onPageBack">
			<span class="username">{{ name }}</span>
			<p class="status flex-center">{{ online ? '在线' : '离线' }}</p>
		</nav-bar>
		<view class="action-bar flex-between">
			<div class="action-item" v-for="(item, index) in actionList" :key="index" @click="onActionClick(index)">
				<div class="action-icon-wrapper flex-center">
					<image :src="`/static/${item.icon}.png`" class="action-icon" :class="item.icon"></image>
				</div>
				<span class="action-title">
					<template v-if="index === 1">{{ isFollow ? '已关注' : '关注' }}</template>
					<template v-else>{{ item.title }}</template>
				</span>
			</div>
		</view>
		<view class="countdown-wrapper flex-center">
			<countdown-timer :time="1200000" :auto-start="autoStartCountdown">
				<template v-slot="{minute, second}">
					<view class="countdown-text">倒计时{{minute}}:{{second}}s</view>
				</template>
			</countdown-timer>
		</view>
		<view class="bottom-wrapper items-center">
			<input type="text" placeholder="请输入内容" class="message-input" v-model="content">
			<!-- <image src="/static/icon_emoji.png" class="icon-emoji"></image>
			<image src="/static/icon_add.png" class="icon-add"></image> -->
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
	<share-popup v-model:show="sharePopupShow"></share-popup>
</template>

<script setup>
	import { ref, getCurrentInstance } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { wsUrl, imUserInfo, placementChat, sendMessage } from '@/api/index.js';
	import { useFollow } from '@/hooks/useFollow.js';
	import { useShare } from '@/hooks/useShare.js';
	
	const actionList = [
		{
			icon: 'icon_check',
			title: '查看'
		},
		{
			icon: 'icon_follow',
			title: '关注'
		},
		{
			icon: 'icon_share',
			title: '分享'
		},
		{
			icon: 'icon_more',
			title: '更多'
		}
	];
	const autoStartCountdown = ref(false);
	const sharePopupShow = ref(false);
	const content = ref('');
	const name = ref('');
	const online = ref(false);
	const isFollow = ref(false);
	let chatId, trainId, imToken, sendData;
	const deviceId = uni.getStorageSync('device_id');
	
	const { onFollowCoach } = useFollow();
	const { onShareAppMessage } = useShare();
	const _this = getCurrentInstance();
	
	onLoad(() => {
		const eventChannel = _this.ctx.getOpenerEventChannel();
		eventChannel.on('messageUser', data => {
			const { id, tp, train_id, train_name, is_follow } = data;
			name.value = train_name;
			online.value = data.online;
			isFollow.value = is_follow;
			chatId = id;
			trainId = train_id;
		});
		connectSocket();
	});
	onShareAppMessage({
		title: 'SEEK',
		path: '/pages/message/message'
	});
	const onActionClick = (index) => {
		switch(index) {
			case 0:
				uni.navigateTo({
					url: `/pages/coach-detail/coach-detail?id=${trainId}`
				});
				break;
			case 1:
				onFollowCoach({ is_follow: !isFollow.value, train_id: trainId }, () => {
					isFollow.value = !isFollow.value;
				});
				break;
			case 2:
				sharePopupShow.value = true;
				break;
			case 3:
				handleMoreAction();
				break;
		}
	};
	let isPlacement = false;
	const handleMoreAction = () => {
		uni.showActionSheet({
			itemList: ['置顶', '投诉'],
			success: async (res) => {
				if (res.tapIndex === 0) {
					await placementChat({id: chatId, top: true});
					isPlacement = true;
					uni.showToast({
						title: '置顶成功'
					});
				} else {
					uni.navigateTo({
						url: `/pages/complaint/complaint?id=${trainId}&name=${name.value}`
					});
				}
			}
		})
	};
	const onPageBack = () => {
		isPlacement && uni.$emit('refreshChatList');
		isPlacement = false;
		uni.navigateBack();
	};
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
		uni.showToast({
			title: JSON.stringify(res.data),
			icon: 'none'
		})
	});
	const onSendMessage = async () => {
		await sendMessage({
			content: content.value || '你好',
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
		color: #181818;
		line-height: 56rpx;
	}
	.status {
		width: 53rpx;
		height: 28rpx;
		font-size: 20rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		border-radius: 3rpx;
		border: 2rpx solid #181818;
		color: #181818;
	}
	.action-bar {
		margin-top: 38rpx;
		padding: 0 32rpx;
		.action-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 84rpx;
			text-align: center;
		}
		.action-icon-wrapper {
			width: 64rpx;
			height: 64rpx;
			margin-bottom: 6rpx;
		}
		.action-icon {
			width: 100%;
			height: 100%;
			&.icon_share {
				width: 48rpx;
				height: 48rpx;
			}
		}
		.action-title {
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
		}
	}
	.countdown-wrapper {
		position: absolute;
		top: 400rpx;
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
		padding-right: 26rpx;
		.btn-send {
			padding: 0 20rpx;
		}
		.message-input {
			width: 512rpx;
			// height: 80rpx;
			font-size: 28rpx;
			padding: 20rpx 0 20rpx 40rpx;
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
		height: 900rpx;
		margin-top: 170rpx;
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
