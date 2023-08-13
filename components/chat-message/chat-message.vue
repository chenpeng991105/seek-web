<template>
	<view class="chat-message" :class="[position === 'left' ? 'left' : 'right']">
		<image src="/static/avatar.png" class="avatar"></image>
		<view class="tooltip" :class="{'tooltip-right': position === 'right'}">
			<slot></slot>
			<view class="arrow-left" v-if="position === 'left'"></view>
			<view class="arrow-right" v-if="position === 'right'"></view>
			<view class="message-status" v-if="showStatus">已读</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		position: {
			type: String,
			default: 'left'
		},
		showStatus: {
			type: Boolean, 
			default: () => true
		}
	})
</script>

<style lang="scss" scoped>
	.chat-message {
		display: flex;
		align-items: flex-start;
		width: 100%;
		margin-bottom: 54rpx;
		.avatar {
			width: 128rpx;
			height: 128rpx;
		}
		.tooltip {
			position: relative;
			max-width: 384rpx;
			min-height: 76rpx;
			line-height: 44rpx;
			// margin-top: 26rpx;
			padding: 16rpx 24rpx;
			background-color: #fff;
			border-radius: 4rpx;
			text-align: left;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
			.arrow-left {
				position: absolute;
				top: 24rpx;
				left: -30rpx;
				width: 0;
				height: 0;
				border: 18rpx solid #fff;
				border-left-color: transparent;
				border-top-color: transparent;
				border-bottom-color: transparent;
			}
			.arrow-right {
				position: absolute;
				top: 24rpx;
				right: -30rpx;
				width: 0;
				height: 0;
				border: 18rpx solid #fff;
				border-right-color: transparent;
				border-top-color: transparent;
				border-bottom-color: transparent;
			}
			.message-status {
				position: absolute;
				right: -60rpx;
				bottom: -14rpx;
				font-size: 20rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #8B8B8B;
			}
			&.tooltip-right .message-status {
				left: -60rpx;
			}
		}
		&.left {
			.tooltip {
				margin-left: 40rpx;
			}
		}
		&.right {
			flex-direction: row-reverse;
			justify-content: flex-start;
			.tooltip {
				margin-right: 40rpx;
			}
		}
	}
</style>