<template>
	<view class="page-container2">
		<image src="/static/logo1.png" class="logo"></image>
		<view class="quesiton-wrapper flex-between items-center">
			<input type="text" class="question-input" placeholder="AI为您解答健身问题" v-model="question">
			<div class="btn-seek flex-center" @click="onSeek()">seek一下</div>
		</view>
		<p class="hot">热门搜索</p>
		<div class="hot-list">
			<div class="hot-item" v-for="(item, index) in hotSearchList" :key="item.id" @click="onSeek(item.title)">
				<span class="hot-item-level flex-center">{{ index + 1 }}</span>
				<span class="hot-item-content">{{ item.title }}</span>
			</div>
		</div>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad, onShow } from '@dcloudio/uni-app';
	import { hotSearch, deviceId } from '@/api/index.js';
	import { getToken } from '@/utils/request.js';
	import { getDeviceType } from '@/utils/index.js';
	
	onLoad(() => {
		getToken();
		getHotSearch();
	});
	onShow(() => {
		getDeviceId();
	});
	const question = ref('');
	const hotSearchList = ref([]);
	
	const getHotSearch = async () => {
		const res = await hotSearch();
		hotSearchList.value = res.data;
	};
	const getDeviceId = async () => {
		// 游客状态不请求
		if (!uni.getStorageSync('has_login')) return;
		if (uni.getStorageSync('device_id')) return;
		const { SDKVersion, deviceBrand, deviceModel, system } = uni.getSystemInfoSync();
		const type = getDeviceType();
		const res = await deviceId({
			brand: deviceBrand,
			model: deviceModel,
			sdk_version: SDKVersion,
			system_version: system,
			type
		});
		uni.setStorageSync('device_id', res.data.device_id);
	};
	const onSeek = (_question) => {
		_question = _question || question.value;
		uni.navigateTo({
			url: `/pages/ai-question/ai-question?question=${_question}`
		});
	};
</script>

<style lang="scss" scoped>
	.logo {
		display: block;
		width: 160rpx;
		height: 143rpx;
		margin: 260rpx auto 0;
	}
	.quesiton-wrapper {
		width: 686rpx;
		height: 96rpx;
		margin: 78rpx auto 0;
		padding-left: 32rpx;
		padding-right: 12rpx;
		background: rgba(255,255,255,0.66);
		box-shadow: 8rpx 8rpx 22rpx 0rpx rgba(193,193,193,0.25);
		border-radius: 190rpx;
		.question-input {
			width: 414rpx;
			height: 44rpx;
			font-size: 32rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
			&::placeholder {
				color: #8B8B8B;
			}
		}
		.btn-seek {
			width: 192rpx;
			height: 80rpx;
			background-image: url('/static/btn_seek.png');
			background-size: 100% 100%;
			font-size: 32rpx;
			color: #fff;
		}
	}
	.hot {
		margin-top: 80rpx;
		margin-left: 30rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #292B2D;
	}
	.hot-list {
		margin-top: 58rpx;
		margin-left: 36rpx;
		.hot-item {
			display: flex;
			align-items: center;
			margin-bottom: 52rpx;
			&:nth-of-type(1),
			&:nth-of-type(2),
			&:nth-of-type(3) {
				.hot-item-level {
					border-radius: 50%;
					background: rgba(64,69,127,0.09);
					color: #40457F;	
				}
			}
		}
		.hot-item-level {
			width: 42rpx;
			height: 42rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #8B8B8B;
		}
		.hot-item-content {
			margin-left: 14rpx;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
		}
	}
</style>
