<template>
	<view class="page-container1">
		<nav-bar show-bg show-back title="我的保存"></nav-bar>
		<view class="tabs flex-center">
			<view
				v-for="(tab, index) in tabs"
				:key="index"
				class="tab"
				:class="{'tab-active': activeTab === index + 1}"
				@click="onToggleTab(index + 1)"
			>{{ tab }}</view>
		</view>
		<scroll-view class="scroll-y" :scroll-y="true" @scrolltolower="getChatSaveList">
			<view class="save-list">
				<view
					class="save-item"
					v-for="item in activeTab === 1 ? aiChatSaveList : onlineChatSaveList"
					:key="item.id"
					@click="jumpPage(item)">
						<text class="save-title">{{ item.ask }}</text>
						<view class="save-content">{{ item.answer }}</view>
						<text class="save-time">{{ formatTimestamp(item.ct) }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { chatSaveList } from '@/api/index.js';
	import { formatTimestamp } from '@/utils/index.js';
	
	const aiChatSaveList = ref([]);
	const onlineChatSaveList = ref([]);
	const tabs = ['AI互动', '在线问答'];
	const activeTab = ref(1);
	let aiChatPage = 0;
	let onlineChatPage = 0;
	
	onLoad(() => {
		getChatSaveList();
	});
	
	const getChatSaveList = async () => {
		if (activeTab.value === 1) {
			aiChatPage++;
			const res = await chatSaveList({ page: aiChatPage, limit: 10, tp: 1 });
			aiChatSaveList.value = [...aiChatSaveList.value, ...res.data];
		} else {
			onlineChatPage++;
			const res = await chatSaveList({ page: onlineChatPage, limit: 10, tp: 2 });
			onlineChatSaveList.value = [...onlineChatSaveList.value, ...res.data];
		}
	};
	const onToggleTab = (index) => {
		activeTab.value = index;
		getChatSaveList();
	};
	const jumpPage = (saveDetail) => {
		saveDetail.ct = formatTimestamp(saveDetail.ct);
		uni.navigateTo({
			url: `/pages/save-detail/save-detail?type=${activeTab.value}`,
			success: (res) => {
				res.eventChannel.emit('saveDetail', saveDetail);
			}
		})
	};
</script>

<style lang="scss" scoped>
	.tabs {
		margin-top: 36rpx;
		margin-bottom: 40rpx;
		.tab {
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8b8b8b;
			line-height: 48rpx;
			&.tab-active {
				color: #181818;
			}
			+.tab {
				margin-left: 82rpx;
			}
		}
	}
	.scroll-y {
		height: calc(100vh - 300rpx);
	}
	.save-list {
		padding-left: 32rpx;
		padding-right: 30rpx;
		padding-bottom: 100rpx;
		.save-item {
			position: relative;
			margin-bottom: 56rpx;
			&:last-of-type {
				margin-bottom: 0;
			}
		}
		.save-title {
			font-size: 32rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #181818;
			line-height: 48rpx;
		}
		.save-content {
			width: 668rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
			line-height: 48rpx;
		}
		.save-time {
			position: absolute;
			top: -4rpx;
			right: 0;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
			line-height: 48rpx;
		}
	}
</style>
