<template>
	<seek-popup position="bottom" :safe-area="false" :show="show" @mask-click="onCancel">
		<view class="share-wrapper" :style="{ paddingBottom: safeAreaInsetBottom + 'px' }" @click="onCancel">
			<view class="popup-title">分享</view>
			<button open-type="share" class="share-item">微信好友</button>
			<button class="share-item" @click="onGeneratePoster">生成海报</button>
			<button class="share-item">取消</button>
		</view>
	</seek-popup>
</template>

<script setup>
	import { ref } from 'vue';
	
	const props = defineProps({
		show: {
			type: Boolean,
			default: () => false
		}
	});
	const emit = defineEmits(['update:show', 'generate-poster']);
	const safeAreaInsetBottom = ref(uni.getSystemInfoSync().safeAreaInsets.bottom);
	const onCancel = () => {
		emit('update:show', false);
	};
	const onGeneratePoster = () => {
		emit('generate-poster');
	};
</script>

<style lang="scss" scoped>
	.share-wrapper {
		width: 100%;
		height: 450rpx;
		padding-top: 40rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		background-color: #fff;
		text-align: center;
		color: #181818;
		.share-item {
			height: 100rpx;
			line-height: 100rpx;
			font-size: 32rpx;
			border-bottom: 1rpx solid #eee;
			border-radius: 0;
			&:last-of-type {
				border-bottom: none;
			}
		}
	}
</style>