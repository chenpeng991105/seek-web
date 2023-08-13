<template>
	<view class="page-container1">
		<nav-bar show-bg show-back title="我的关注"></nav-bar>
		<scroll-view class="scroll-y" :scroll-y="true" @scrolltolower="getUserFollowList">
			<view class="coach-list">
				<coach-info v-for="item in followList" :key="item.id" :coach-info="item" :show-coach-data="false">
					<view class="btn-follow flex-center" @click.stop="handleFollowCoach(item)">{{ item.is_follow ? '已关注' : '关注' }}</view>
				</coach-info>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { userFollowList } from '@/api/index.js';
	import { useFollow } from '@/hooks/useFollow.js';
	
	const followList = ref([]);
	let page = 0;
	onLoad(() => {
		getUserFollowList();
	});
	const getUserFollowList = async () => {
		page++;
		const res = await userFollowList({ page, limit: 10 });
		followList.value = [...followList.value, ...res.data];
	};
	const { onFollowCoach } = useFollow();
	const handleFollowCoach = (item) => {
		const { is_follow: isFollow, id } = item;
		onFollowCoach({ is_follow: !isFollow, train_id: id }, () => {
			item.is_follow = !isFollow;
		});
	};
</script>

<style lang="scss" scoped>
	.scroll-y {
		height: calc(100vh - 222rpx);
	}
	.coach-list {
		margin-top: 46rpx;
		margin-bottom: 50rpx;
		padding-left: 32rpx;
	}
	.btn-follow {
		height: 40rpx;
		padding: 0 8rpx;
		background: #F3FDF8;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #5BAF88;
	}
</style>
