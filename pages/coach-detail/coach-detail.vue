<template>
	<view class="page-container1">
		<nav-bar show-back></nav-bar>
		<div class="coach-banner">
			<div class="coach-banner-bottom items-center">
				<div class="btn-share flex-center" @click="sharePopupShow = true">分享</div>
				<div class="btn-follow flex-center" @click="handleFollowCoach">{{ coachDetailState?.is_follow ? '已关注' : '关注' }}</div>
			</div>
		</div>
		<div class="flex-center">
			<p class="coach-name">{{ coachDetailState?.name }}</p>
			<p class="coach-status flex-center" :class="[coachDetailState?.online ? 'online' : 'offline']">{{ coachDetailState?.online ? '在线' : '离线' }}</p>
		</div>
		<div class="service-wrapper">
			<div class="items-center">
				<p class="service-title">图文咨询</p>
				<p class="service-price">¥{{ coachDetailState?.price }}元/{{ coachDetailState?.chat_time + 'min' }}</p>
			</div>
			<p class="service-tips">支持发送图片视频多次沟通</p>
			<div class="btn-seek flex-center" @click="onPay">去咨询</div>
		</div>
		<text class="title">教练信息</text>
		<div class="coach-info flex-between">
			<div class="coach-info-item">
				<p class="value">{{ coachDetailState?.answer_num }}</p>
				<p class="label flex-center">解答数</p>
			</div>
			<div class="coach-info-item">
				<p class="value">{{ coachDetailState?.online_num }}</p>
				<p class="label flex-center">总时长</p>
			</div>
			<div class="coach-info-item">
				<p class="value">{{ coachDetailState?.cert_count }}</p>
				<p class="label flex-center">证书</p>
			</div>
			<div class="coach-info-item">
				<p class="value">{{ coachDetailState?.fan_num }}</p>
				<p class="label flex-center">粉丝数</p>
			</div>
		</div>
		<text class="title">教练照片</text>
		<div class="coach-photos">
			<div class="coach-photos-tabs flex-between">
				<text class="coach-photos-tab active flex-center">训练照</text>
				<text class="coach-photos-tab flex-center">生活照</text>
				<text class="coach-photos-tab flex-center">证书</text>
				<image src="/static/icon_indicator.png" class="tabs-indicator"></image>
			</div>
			<div class="swiper-wrapper">
				<kevy-swiper :list="list" :height="289"></kevy-swiper>
			</div>
		</div>
		<text class="title" style="margin-bottom: 32rpx;">职业经历</text>
		<ellipsis-text flag="1">
			{{ coachDetailState?.experience }}
		</ellipsis-text>
		<text class="title" style="margin-top: 48rpx;margin-bottom: 32rpx">擅长内容</text>
		<ellipsis-text flag="2">
			{{ coachDetailState?.be_good }}
		</ellipsis-text>
		<share-popup v-model:show="sharePopupShow"></share-popup>
	</view>
</template>

<script setup>
	import { ref, reactive, getCurrentInstance } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import EllipsisText from './ellipsis-text.vue';
	import { coachDetail, orderPrePayInfo } from '@/api/index.js';
	import { useShare } from '@/hooks/useShare.js';
	import { useFollow } from '@/hooks/useFollow.js';
	import { useLogin } from '@/hooks/useLogin.js';
	
	const _this = getCurrentInstance();
	const coachDetailState = reactive({});
	const current = ref(1);
	const sharePopupShow = ref(false);
	const { onShareAppMessage } = useShare();
	// 教练id
	let trainId;
	// 是否是预览教练详情
	let isPreview = false;
	// 暂存从编辑页传过来的教练详情数据
	let tempCoachDetail = {};
	
	onShareAppMessage({
		title: 'SEEK',
		path: '/pages/ai/ai'
	});
	
	onLoad((option) => {
		const { id, view_mode } = option;
		trainId = +id;
		getCoachDetail(option.id);
		if (view_mode === 'preview') {
			isPreview = true;
			const eventChannel = _this.ctx.getOpenerEventChannel();
			eventChannel.on('coachDetail', data => {
				tempCoachDetail = data;
			});
		}
	});
	const getCoachDetail = async (id) => {
		const res = await coachDetail({ id });
		if (!isPreview) {
			Object.assign(coachDetailState, res.data);
		} else {
			Object.assign(coachDetailState, { ...res.data, ...tempCoachDetail });
		}
	};
	const onChangeIndex = (e) => {
		current.value = e.detail.current;
	};
	const activeTab = ref();
	const list = [
		'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe1.jpg',
		'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg',
		'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe3.jpg',
		'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe4.jpg',
		'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe5.jpg',
	];
	const { onFollowCoach } = useFollow();
	const handleFollowCoach = () => {
		const { is_follow: isFollow, id } = coachDetailState;
		onFollowCoach({ is_follow: !isFollow, train_id: id }, () => {
			coachDetailState.is_follow = !isFollow;
		});
	};
	const { hasLogin } = useLogin();
	const onPay = async () => {
		if (!hasLogin()) return;
		const { data } = await orderPrePayInfo({ train_id: trainId });
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.paySign,
			success: (res) => {
				console.log('支付成功', res);
			},
			fail: (res) => {
				console.log('支付失败', res);
			}
		});
	};
</script>

<style lang="scss" scoped>
	.page-container1 {
		padding-bottom: 116rpx;
	}
	.title {
		display: block;
		margin-left: 32rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #181818;
		line-height: 48rpx;
	}
	.coach-banner {
		position: relative;
		width: 100%;
		height: 375rpx;
		margin-bottom: 40rpx;
		background-color: #acd0c3;
		.coach-banner-bottom {
			position: absolute;
			left: 0;
			bottom: 0;
			justify-content: flex-end;
			width: 100%;
			height: 58rpx;
			background: rgba(0,0,0,0.16);
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			.btn-share,
			.btn-follow {
				padding: 0 8rpx;
				height: 40rpx;
				border-radius: 4rpx;
			}
			.btn-share {
				background-color: #E8F3FF;
				color: #165DFF;
			}
			.btn-follow {
				margin: 0 32rpx;
				background-color: #F3FDF8;
				color: #5BAF88;
			}
		}
	}
	.coach-name {
		line-height: 48rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #181818;
	}
	.service-wrapper {
		position: relative;
		width: 686rpx;
		height: 176rpx;
		margin: 38rpx auto 48rpx;
		padding-top: 38rpx;
		padding-left: 42rpx;
		background: rgba(255,255,255,0.66);
		box-shadow: 0rpx 6rpx 32rpx 0rpx rgba(200,198,220,0.6);
		border-radius: 16rpx;
		box-sizing: border-box;
		.service-title {
			font-size: 28rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 48rpx;
			background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		.service-price {
			margin-left: 30rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
			line-height: 48rpx;
		}
		.service-tips {
			margin-top: 6rpx;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
			line-height: 48rpx;
		}
		.btn-seek {
			position: absolute;
			top: 52rpx;
			right: 32rpx;
			width: 188rpx;
			height: 80rpx;
			background-image: url("/static/btn_seek1.png");
			background-size: 100% 100%;
			font-size: 32rpx;
			font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
	}
	.coach-info {
		margin-top: 32rpx;
		margin-bottom: 48rpx;
		padding: 0 64rpx;
		.coach-info-item {
			position: relative;
			width: 94rpx;
			height: 82rpx;
			.value {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				font-size: 28rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #181818;
				line-height: 39rpx;
			}
			.label {
				position: absolute;
				bottom: 0;
				width: 94rpx;
				height: 28rpx;
				background: #fff;
				border-radius: 4rpx;
				font-size: 20rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #181818;
			}
		}
	}
	.coach-photos {
		margin-top: 32rpx;
		margin-bottom: 34rpx;
		.coach-photos-tabs {
			position: relative;
			width: 446rpx;
			height: 48rpx;
			margin: 0 auto;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
		}
		.coach-photos-tab {
			width: 84rpx;
			height: 48rpx;
			color: #8b8b8b;
			&.active {
				color: #181818;
			}
		}
		.tabs-indicator {
			position: absolute;
			bottom: -6rpx;
			left: 26rpx;
			width: 20rpx;
			height: 4rpx;
		}
		.swiper-wrapper {
			width: 550rpx;
			height: 289rpx;
			margin: 48rpx auto 0;
			overflow-x: hidden;
			// border: 1rpx solid red;
			.swiper {
				height: 289rpx;
			}
		}
		.coach-photo {
			width: 217rpx;
			height: 289rpx;
			background-color: #8fc2ac;
			border-radius: 17rpx;
		}
		.image {
			width: 217rpx;
			height: 289rpx;
			border-radius: 17rpx;
			&.active {}
			&.inactive {
				opacity: 0.5;
				transform: scale(0.8);
			}
			&.prev {
				transform: scale(0.8) translateX(60rpx);
			}
			&.next {
				transform: scale(0.8) translateX(-60rpx);
			}
		}
	}
</style>
