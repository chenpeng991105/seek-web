<template>
	<view class="page-container1">
		<nav-bar show-bg show-back title="保存详情"></nav-bar>
		<view class="save-wrapper">
			<view class="save-item">
				<text class="save-title">标题</text>
				<view class="save-content">{{ saveDetail?.ask }}</view>
			</view>
			<view class="save-item">
				<text class="save-title">时间</text>
				<view class="save-content">{{ saveDetail?.ct }}</view>
			</view>
			<view class="save-item">
				<text class="save-title">来源</text>
				<view class="save-content"></view>
			</view>
			<view class="save-item">
				<text class="save-title">内容</text>
				<view class="save-content">{{ saveDetail?.answer }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { getCurrentInstance, reactive, ref } from 'vue';
	const _this = getCurrentInstance();
	const saveDetail = reactive({});
	const type = ref();
	
	onLoad(() => {
		const eventChannel = _this.ctx.getOpenerEventChannel();
		eventChannel.on('saveDetail', data => {
			Object.assign(saveDetail, data);
		});
	});
</script>

<style lang="scss" scoped>
	.save-wrapper {
		margin-top: 36rpx;
		padding-left: 32rpx;
		padding-right: 46rpx;
		.save-item {
			margin-bottom: 52rpx;
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
			margin-top: 16rpx;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
			line-height: 48rpx;
		}
	}
</style>
