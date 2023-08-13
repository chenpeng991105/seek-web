<template>
	<view class="page-container1">
		<nav-bar show-back></nav-bar>
		<div class="category-banner">
			<image :src="state?.img" style="width: 100%;height: 100%"></image>
		</div>
		<text class="title">介绍</text>
		<div class="intro-content">
			{{ state?.desc }}
		</div>
		<text class="title">价格</text>
		<div class="service-wrapper">
			<p class="service-title">图文咨询</p>
			<p class="service-detail">
				{{ state?.price }}元/次 单次上线{{ state?.chat_time }}分钟
			</p>
			<image :src="state.categoryImage" class="category-image" :class="`category-image${state.index + 1}`"></image>
		</div>
		<text class="title">推荐</text>
		<div class="coach-list">
			<coach-info v-for="item in state.recommendCoachList" :key="item.id" :coach-info="item"></coach-info>
		</div>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { tagInfo, recommendCoachList } from '@/api/index.js';
	import { reactive } from 'vue';
	
	const categoryImages = [
		'/static/category1.png',
		'/static/category2.png',
		'/static/category3.png',
		'/static/category4.png',
		'/static/category5.png'
	];
	const state = reactive({
		categoryImage: '',
		index: 0,
		recommendCoachList: []
	});
	onLoad((option) => {
		state.categoryImage = categoryImages[option.index];
		state.index = +option.index;
		getTagInfo(option.id);
		getRecommendCoachList();
	});
	const getTagInfo = async (id) => {
		const res = await tagInfo({id});
		Object.assign(state, res.data);
	};
	const getRecommendCoachList = async () => {
		const res = await recommendCoachList();
		state.recommendCoachList = res.data;
	};
</script>

<style lang="scss" scoped>
	.category-banner {
		width: 100%;
		height: 456rpx;
		margin-bottom: 40rpx;
	}
	.title {
		margin-left: 32rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #181818;
		line-height: 38rpx;
	}
	.intro-content {
		margin: 32rpx 32rpx 48rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #8B8B8B;
		line-height: 48rpx;
	}
	.service-wrapper {
		position: relative;
		width: 686rpx;
		height: 176rpx;
		margin: 40rpx auto 48rpx;
		padding-left: 32rpx;
		background: rgba(255,255,255,0.66);
		box-shadow: 0rpx 6rpx 32rpx 0rpx rgba(200,198,220,0.6);
		border-radius: 16rpx;
		box-sizing: border-box;
		overflow: hidden;
		.service-title {
			margin-top: 38rpx;
			font-size: 28rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 48rpx;
			background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		.service-detail {
			margin-top: 6rpx;
			font-size: 28rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #181818;
			line-height: 48rpx;
		}
		.category-image {
			position: absolute;
			&.category-image1 {
				top: -22rpx;
				right: 40rpx;
				width: 132rpx;
				height: 198rpx;
			}
			&.category-image2 {
				top: 0;
				right: 54rpx;
				width: 172rpx;
				height: 176rpx;
			}
			&.category-image3 {
				top: 6rpx;
				right: 80rpx;
				width: 72rpx;
				height: 170rpx;
			}
			&.category-image4 {
				top: 10rpx;
				right: 10rpx;
				width: 236rpx;
				height: 166rpx;
			}
			&.category-image5 {
				top: -38rpx;
				right: -60rpx;
				width: 272rpx;
				height: 230rpx;
			}
		}
	}
	.coach-list {
		margin-top: 42rpx;
		margin-left: 32rpx;
	}
</style>
