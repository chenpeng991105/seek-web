<template>
	<view class="page-container1">
		<nav-bar title="任务列表" show-back></nav-bar>
		<p class="tips">完成任务，可以增加AI体验次数</p>
		<div class="task-list">
			<div class="task-item flex-between items-center">
				<div class="task-detail">
					去登录（1/1）
					<span>+1</span>
				</div>
				<div class="task-status flex-center complete">已完成</div>
			</div>
			<div class="task-item flex-between items-center">
				<div class="task-detail">
					图文咨询一位教练（0/1）
					<span>+3</span>
				</div>
				<div class="task-status flex-center incomplete">未完成</div>
			</div>
		</div>
		<div class="btn-receive flex-center">完成全部任务 再领取5次体验次数</div>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { taskList } from '../../api/index.js';
	
	const _taskList = ref([]);
	onLoad(async () => {
		const res = await taskList();
	})
</script>

<style lang="scss" scoped>
	.tips {
		margin-top: 38rpx;
		margin-left: 30rpx;
		line-height: 48rpx;
		font-size: 30rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #8B8B8B;
	}
	.task-list {
		margin-top: 36rpx;
		padding-left: 30rpx;
		padding-right: 32rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		.task-item {
			margin-bottom: 56rpx;
			&:last-of-type {
				margin-bottom: 0;
			}
		}
		.task-detail {
			font-size: 28rpx;
			color: #181818;
			line-height: 33rpx;
			span {
				margin-left: 56rpx;
			}
		}
		.task-status {
			height: 40rpx;
			border-radius: 4rpx;
			font-size: 24rpx;
			color: #5BAF88;
			&.complete {
				width: 88rpx;
				border: 2rpx solid #5BAF88;
			}
			&.incomplete {
				width: 92rpx;
				background-color: #F3FDF8;
			}
		}
	}
	.btn-receive {
		width: 686rpx;
		height: 80rpx;
		margin: 68rpx auto 0;
		background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
		box-shadow: 0rpx 12rpx 58rpx 0rpx rgba(200,198,220,0.8);
		border-radius: 58rpx;
		font-size: 28rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #fff;
	}
</style>
