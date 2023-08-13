<template>
	<view class="ai-answer">
		<image src="/static/avatar.png" class="avatar"></image>
		<div class="ai-answer-content">
			<slot></slot>
		</div>
		<div class="line"></div>
		<div class="btn-wrapper">
			<div class="btn-save flex-center" @click="savePopupShow = true">保存</div>
			<div class="btn-share flex-center" @click="sharePopupShow = true">分享</div>
		</div>
		<seek-popup :is-mask-click="false" :show="savePopupShow">
			<view class="save-wrapper center-wrapper">
				<view class="popup-title">保存回答</view>
				<view class="save-tips">可以在我的健身-我的保存中查看</view>
				<input type="text" :placeholder="question" class="save-input" v-model="saveTitle">
				<view class="btn-wrapper flex-between">
					<view class="save-btn" @click="savePopupShow = false">取消</view>
					<view class="save-btn" @click="handleConfirmSave">确定</view>
				</view>
			</view>
		</seek-popup>
		<share-popup v-model:show="sharePopupShow"></share-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { saveAiChat } from '@/api/index.js'; 
	
	const props = defineProps({
		question: {
			type: String,
			default: () => ''
		},
		answer: {
			type: String,
			default: () => ''
		}
	});
	
	const savePopupShow = ref(false);
	const sharePopupShow = ref(false);
	const saveTitle = ref('');

	const generatePoster = () => {};
	const handleConfirmSave = async () => {
		const { question, answer } = props;
		await saveAiChat({ ask: saveTitle.value || question, answer, tp: 1 });
		savePopupShow.value = false;
		uni.showToast({
			title: '保存成功'
		});
	};
</script>

<style lang="scss" scoped>
	.ai-answer {
		display: flex;
		flex-wrap: wrap;
		margin: 32rpx 0;
		.avatar {
			flex-shrink: 0;
		}
		.ai-answer-content {
			width: 528rpx;
			margin-top: 10rpx;
			margin-left: 30rpx;
			line-height: 40rpx;
			text-align: left;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
		}
		.line {
			width: 100%;
			height: 2rpx;
			margin-top: 32rpx;
			background-color: #e6e6e6;
		}
		.btn-wrapper {
			display: flex;
			justify-content: flex-end;
			width: 100%;
			margin-top: 32rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			.btn-save,
			.btn-share {
				width: 64rpx;
				height: 40rpx;
				border-radius: 4rpx;
			}
			.btn-save {
				margin-right: 28rpx;
				border: 2rpx solid #7BE188;
				color: #00B42A;
			}
			.btn-share {
				border: 2rpx solid #94BFFF;
				color: #165DFF;
			}
		}
	}
	.save-wrapper {
		.save-tips {
			margin-top: 20rpx;
			text-align: center;
			font-size: 30rpx;
		}
		.save-input {
			display: block;
			width: 500rpx;
			margin: 30rpx auto 0;
			padding: 13rpx 0 13rpx 20rpx;
			text-align: left;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			border-radius: 8rpx;
			border: 2rpx solid #D2D2D2;
		}
		.btn-wrapper {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			border-top: 1rpx solid #e6e6e6;
			.save-btn {
				width: 50%;
				height: 85rpx;
				line-height: 85rpx;
				text-align: center;
				font-size: 30rpx;
				&:first-of-type {
					border-right: 1rpx solid #e6e6e6;
				}
			}
		}
	}
</style>