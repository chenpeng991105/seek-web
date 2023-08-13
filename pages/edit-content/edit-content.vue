<template>
	<view class="page-container1">
		<nav-bar show-bg show-back custom-back @page-back="onPageBack"></nav-bar>
		<view class="title">添加{{ typeMap[type] }}</view>
		<view class="tips">在个人主页展示出色的{{ typeMap[type] }}，体现个人魅力</view>
		<view class="text-wrapper">
			<textarea maxlength="500" auto-height class="textarea" :placeholder="`请输入${typeMap[type]}`" v-model="content"></textarea>
			<span class="input-num">{{ content.length }}/500</span>
		</view>
	</view>
</template>

<script setup>
	import { ref, getCurrentInstance } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	
	const typeMap = {
		1: '职业经历',
		2: '擅长内容'
	};
	const type = ref('');
	const content = ref('');
	const _this = getCurrentInstance();
	
	onLoad((option) => {
		type.value = option.type;
		const eventChannel = _this.ctx.getOpenerEventChannel();
		eventChannel.on('content', data => {
			content.value = data;
		});
	});
	const onPageBack = () => {
		uni.navigateBack({
			success: () => {
				uni.$emit('edit-content', { content: content.value, type: type.value });
			}
		});
	};
</script>

<style lang="scss" scoped>
	.title {
		margin-top: 38rpx;
		margin-left: 32rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #181818;
		line-height: 38rpx;
	}
	.tips {
		margin-top: 32rpx;
		margin-left: 32rpx;
		font-size: 28rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #8B8B8B;
		line-height: 33rpx;
	}
	.text-wrapper {
		position: relative;
		width: 686rpx;
		min-height: 200rpx;
		margin: 64rpx auto 0;
		padding: 10rpx;
		padding-bottom: 40rpx;
		border-radius: 16rpx;
		border: 2rpx solid #D2D2D2;
		.textarea {
			width: 100%;
			min-height: 170rpx;
			font-size: 28rpx;
		}
		.input-num {
			position: absolute;
			right: 22rpx;
			bottom: 12rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
			line-height: 28rpx;
		}
	}
</style>
