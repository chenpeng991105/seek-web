<template>
	<view class="page-container2">
		<nav-bar show-logo show-bg></nav-bar>
		<input type="text" class="search-input" placeholder="请输入教练名称">
		<scroll-view class="scroll-y" :scroll-y="true" @scrolltolower="getOnlineChatList">
			<uni-swipe-action>
				<uni-swipe-action-item
					v-for="(item, index) in onlineChatListData"
					:key="index"
					show="none"
					:right-options="actionOptions"
					@click="onActionItemClick($event, item, index)"
					class="swipe-action-item"
				>
					<view class="message-item" @click="jumpMessagePage(item)">
						<div class="avatar-wrapper">
							<image class="avatar" :src="item.logo"></image>
							<div class="avatar-tag flex-center">{{ item.tp === 1 ? '教练' : '用户' }}</div>
						</div>
						<div class="message-info">
							<div class="items-center" style="margin-top: 6rpx">
								<span class="username">{{ item.train_name }}</span>
								<p class="coach-status flex-center" :class="[item.online ? 'online' : 'offline']">{{ item.online ? '在线' : '离线' }}</p>
								<span class="last-time">{{ formatSecond(item.extra_time) }}</span>
							</div>
							<p class="message-content">{{ item.last_msg }}</p>
						</div>
						<div class="message-time">{{ getWxTimeMemo(item.ct) }}</div>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</scroll-view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad, onUnload } from '@dcloudio/uni-app';
	import { onlineChatList, placementChat, deleteChat } from '@/api/index.js';
	import { getDeviceType, getWxTimeMemo, formatSecond } from '@/utils/index.js';
	
	const onlineChatListData = ref([]);
	let page = 0;
	const actionOptions = [
		{
			id: 1,
			text: '置顶',
			style: {
				backgroundColor: '#3479e5'
			}
		},
		{
			id: 2,
			text: '删除',
			style: {
				backgroundColor: '#e5564a'
			}
		}
	];
	
	onLoad(() => {
		getOnlineChatList();
		uni.$on('refreshChatList', () => {
			refreshChatList();
		});
	});
	onUnload(() => {
		uni.$off('refreshChatList');
	});
	const onActionItemClick = (e, chat, index) => {
		if (e.content.id === 1) {
			// 置顶对话
			handlePlacementChat(chat, index);
		} else {
			// 删除对话
			handleDeleteChat(chat, index);
		}
	};
	const handlePlacementChat = async (chat, index) => {
		await placementChat({ id: chat.id, top: true });
		onlineChatListData.value.splice(index, 1);
		onlineChatListData.value.pop(chat);
		uni.showToast({
			title: '置顶成功'
		});
	};
	const handleDeleteChat = (chat, index) => {
		uni.showModal({
			title: '删除对话',
			content: '删除对话之后，之前的聊天记录将不会被保留，确认删除吗？',
			showCancel: true,
			confirmColor: '#181818',
			cancelColor: '#747474',
			success: async (res) => {
				if (res.confirm) {
					await deleteChat({ id: chat.id });
					onlineChatListData.value.splice(index, 1);
					uni.showToast({
						title: '删除成功'
					});
				}
			}
		})
	};
	const refreshChatList = () => {
		page = 0;
		onlineChatListData.value = [];
		getOnlineChatList();
	};
	const getOnlineChatList = async () => {
		page++;
		const res = await onlineChatList({ page, limit: 10 });
		onlineChatListData.value = [...onlineChatListData.value, ...res.data];
	};
	const jumpMessagePage = (item) => {
		const { id, tp, train_id, train_name, online, is_follow } = item;
		if (tp === 1) {
			// 用户视角，跳转用户消息页面
			uni.navigateTo({
				url: '/pages/message-user/message-user',
				success: (res) => {
					res.eventChannel.emit('messageUser', { id, train_id, train_name, online, is_follow });
				}
			});
		} else {
			// 教练视角，跳转教练消息页面
			uni.navigateTo({
				url: `/pages/message-coach/message-coach?id=${id}&name=${train_name}`
			});
		}
	};
</script>

<style lang="scss" scoped>
	.search-input {
		width: 686rpx;
		height: 72rpx;
		line-height: 72rpx;
		margin: 48rpx auto 32rpx;
		padding-left: 32rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
		border: 2rpx solid #D2D2D2;
		font-size: 28rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #181818;
		&::placeholder {
			color: #8b8b8b;
		}
	}
	.scroll-y {
		height: calc(100vh - 330rpx);
	}
	:deep(.uni-swipe) {
		margin-bottom: 64rpx !important;
		.message-item {
			position: relative;
			display: flex;
			padding: 0 32rpx;
		}
		.avatar-wrapper {
			position: relative;
			height: 128rpx;
		}
		.avatar-tag {
			position: absolute;
			top: 0;
			left: 0;
			width: 64rpx;
			height: 32rpx;
			background: rgba(0,0,0,0.6);
			border-radius: 16rpx 0rpx 16rpx 0rpx;
			font-size: 20rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.message-info {
			height: 128rpx;
			margin-left: 16rpx;
			.username {
				font-size: 28rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #181818;
				line-height: 33rpx;
			}
			.coach-status {
				margin-right: 0;
			}
			.last-time {
				margin-left: 6rpx;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #8B8B8B;
				line-height: 28rpx;
			}
		}
		.message-content {
			width: 460rpx;
			margin-top: 58rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
			line-height: 28rpx;
		}
		.message-time {
			position: absolute;
			top: 8rpx;
			right: 32rpx;
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
			line-height: 28rpx;
		}
	}
</style>
