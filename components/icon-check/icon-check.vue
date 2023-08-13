<template>
	<div class="icon-check flex-center">
		<div class="icon-check-inner"></div>
	</div>
</template>

<script setup>
	const props = defineProps({
		color: {
			type: String,
			default: () => "#8b8b8b"
		}
	})
</script>

<style lang="scss" scoped>
	.icon-check {
		width: 20rpx;
		height: 20rpx;
		border: 2rpx solid v-bind(color);
		border-radius: 50%;
		.icon-check-inner {
			width: 10rpx;
			height: 6rpx;
			margin-top: -4rpx;
			border-bottom: 2rpx solid v-bind(color);
			border-left: 2rpx solid v-bind(color);
			transform: rotate(-45deg);
		}
	}
</style>