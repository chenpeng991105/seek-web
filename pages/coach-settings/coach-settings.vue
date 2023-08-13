<template>
	<view class="page-container1">
		<nav-bar show-bg show-back title="教练设置"></nav-bar>
		<view class="settings-wrapper">
			<view class="settings-item items-center" v-for="(item, index) in settingsList" :key="index" @click="jumpPage(index)">
				<image :src="`/static/${item.icon}.png`" class="settings-icon"></image>
				<view class="settings-title">{{ item.title }}</view>
				<view class="icon-arrow"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const settingsList = [
		{
			icon: 'icon_user1',
			title: '个人主页'
		},
		{
			icon: 'icon_income',
			title: '我的收入'
		},
		{
			icon: 'icon_fans',
			title: '我的粉丝'
		}
	];
	const jumpPage = (index) => {
		const urlMap = {
			0: '/pages/edit-homepage/edit-homepage',
			1: '/pages/mine-income/mine-income'
		};
		uni.navigateTo({
			url: urlMap[index]
		});
	};
</script>

<style lang="scss" scoped>
	.settings-wrapper {
		margin-top: 38rpx;
		padding: 0 32rpx;
		.settings-item {
			margin-bottom: 64rpx;
		}
		.settings-icon {
			width: 32rpx;
			height: 32rpx;
		}
		.settings-title {
			flex: 1;
			margin-left: 10rpx;
			margin-top: 4rpx;
			font-size: 32rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
		}
	}
</style>
