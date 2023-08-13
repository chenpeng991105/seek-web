<template>
	<view class="page-container1">
		<nav-bar show-bg show-back custom-back @page-back="onPageBack"></nav-bar>
		<view class="title">添加{{ typeMap[type] }}</view>
		<view class="tips">在个人主页展示亮眼的照片，体现个人魅力</view>
		<view class="upload-wrapper">
			<upload-image :limit="20" v-model="images"></upload-image>
		</view>
	</view>
</template>

<script setup>
	import { ref, getCurrentInstance } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	
	const type = ref('');
	const typeMap = {
		1: '训练照',
		2: '生活照',
		3: '证书'
	};
	const images = ref([]);
	const _this = getCurrentInstance();

	onLoad((option) => {
		type.value = option.type;
		const eventChannel = _this.ctx.getOpenerEventChannel();
		eventChannel.on('images', data => {
			images.value = data;
		});
	});
	const onPageBack = () => {
		uni.navigateBack({
			success: () => {
				uni.$emit('upload-images', { images: images.value, type: type.value });
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
	.upload-wrapper {
		margin-top: 64rpx;
		margin-left: 32rpx;
		margin-right: 32rpx;
	}
</style>
