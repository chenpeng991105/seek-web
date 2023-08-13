<template>
	<view class="ellipsis-text" :class="{hidden: !showAll}">
		<span :id="'ellipsis-text-content' + flag">
			<slot></slot>
		</span>
		<p v-show="showBtn && !showAll" class="btn-expand" @click="showAll = true">
			<span class="ellipsis">...</span>
			展开
		</p>
		<p v-show="showBtn && showAll" class="btn-close" @click="showAll = false">收起</p>
	</view>
</template>

<script setup>
	import { ref, onMounted, getCurrentInstance } from 'vue';
	
	const props = defineProps({
		flag: {
			type: String,
			default: () => ''
		}
	});
	const showAll = ref(false);
	const showBtn = ref(false);
	const instance = getCurrentInstance();
	const maxHeight = 144;
	onMounted(() => {
		const query = uni.createSelectorQuery().in(instance);
		query.select(`#ellipsis-text-content${props.flag}`).boundingClientRect(rect => {
			showBtn.value = rect.height > uni.upx2px(maxHeight);
		}).exec();
	});
</script>

<style lang="scss" scoped>
	.ellipsis-text {
		position: relative;
		width: 100%;
		padding: 0 32rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #8B8B8B;
		line-height: 48rpx;
		&.hidden {
			height: 144rpx;
			overflow-y: hidden;
		}
		.btn-expand,
		.btn-close {
			position: absolute;
			right: 32rpx;
			width: 205rpx;
			text-align: center;
			color: #181818;
			background-color: #EEF0F4;
		}
		.btn-expand {
			bottom: 0;
			.ellipsis {
				position: absolute;
				left: 0;
				color: #8B8B8B;
			}
		}
		.btn-close {
			bottom: -48rpx;
		}
	}
</style>