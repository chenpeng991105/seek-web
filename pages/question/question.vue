<template>
	<view class="page-container2">
		<nav-bar show-logo show-bg></nav-bar>
		<scroll-view class="scroll-y" :scroll-y="true" @scrolltolower="getRecommendCoachList">
			<div class="search-input items-center" @click="jumpSearch">请输入教练名称</div>
			<div class="tips-wrapper flex-between">
				<div class="tips flex-center">
					<icon-check></icon-check>
					<text class="tips-text">专业教练权威认证</text>
				</div>
				<div class="tips flex-center">
					<icon-check></icon-check>
					<text class="tips-text">专业教练权威认证</text>
				</div>
				<div class="tips flex-center">
					<icon-check></icon-check>
					<text class="tips-text">专业教练权威认证</text>
				</div>
			</div>
			<text class="title">分类</text>
			<div class="category-wrapper">
				<div class="left">
					<div class="category category1" @click="jumpCategotyDetail(0)">
						<span class="category-title">瘦身塑型</span>
						<image src="/static/category1.png" class="category-image"></image>
					</div>
					<div class="category category2" @click="jumpCategotyDetail(2)">
						<span class="category-title">体能体态</span>
						<image src="/static/category2.png" class="category-image"></image>
					</div>
				</div>
				<div class="right">
					<div class="category category2" @click="jumpCategotyDetail(1)">
						<span class="category-title">增重增肌</span>
						<image src="/static/category3.png" class="category-image"></image>
					</div>
					<div class="category category1" @click="jumpCategotyDetail(3)">
						<span class="category-title">疼痛缓解</span>
						<image src="/static/category4.png" class="category-image"></image>
					</div>
				</div>
				<div class="category category3" @click="jumpCategotyDetail(4)">
					<span class="category-title">产后恢复</span>
					<image src="/static/category5.png" class="category-image"></image>
				</div>
			</div>
			<text class="title">推荐</text>
			<div class="coach-list">
				<coach-info v-for="item in state.recommendCoachList" :key="item.id" :coach-info="item"></coach-info>
			</div>
		</scroll-view>
	</view>
</template>

<script setup>
	import { tagInfo, tagList, recommendCoachList } from '@/api/index.js';
	import { onLoad } from '@dcloudio/uni-app';
	import { reactive } from 'vue';
	
	const state = reactive({
		tagList: [],
		recommendCoachList: []
	});
	let page = 0;
	
	onLoad(() => {
		getTagList();
		getRecommendCoachList();
	});
	
	const getTagList = async () => {
		const res = await tagList();
		state.tagList = res.data;
	};
	
	const getRecommendCoachList = async () => {
		page++;
		const res = await recommendCoachList({ page, limit: 10 });
		state.recommendCoachList = [...state.recommendCoachList, ...res.data];
	};
	
	const jumpSearch = () => {
		uni.navigateTo({
			url: '../search/search'
		})
	};
	const jumpCategotyDetail = (index) => {
		const { id } = state.tagList[index];
		uni.navigateTo({
			url: `/pages/category-detail/category-detail?id=${id}&index=${index}`
		});
	};
</script>

<style lang="scss" scoped>
	.scroll-y {
		height: calc(100vh - 230rpx);
	}
	.search-input {
		width: 686rpx;
		height: 72rpx;
		margin: 48rpx auto 0;
		padding-left: 32rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
		border: 2rpx solid #D2D2D2;
		font-size: 28rpx;
		color: #8B8B8B;
	}
	.tips-wrapper {
		margin-top: 16rpx;
		margin-bottom: 52rpx;
		padding: 0 32rpx;
		.tips {
			font-size: 20rpx;
			color: #8B8B8B;
			.tips-text {
				margin-left: 6rpx;
			}
		}
	}
	.title {
		margin-left: 32rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #181818;
		line-height: 38rpx;
	}
	.category-wrapper {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 26rpx;
		margin-bottom: 56rpx;
		padding: 0 32rpx;
		.category {
			position: relative;
			width: 326rpx;		
			background: rgba(255,255,255,0.66);
			border-radius: 16rpx;
			font-size: 40rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 56rpx;
			box-sizing: border-box;
			.category-image {
				position: absolute;
			}
		}
		.left {
			.category1 {
				margin-bottom: 32rpx;
				padding-top: 92rpx;
				padding-left: 30rpx;
				.category-image {
					top: -20rpx;
					right: -24rpx;
					width: 176rpx;
					height: 264rpx;
				}
			}
			.category2 {
				padding-top: 62rpx;
				padding-left: 30rpx;
				.category-image {
					top: 20rpx;
					right: 16rpx;
					width: 88rpx;
					height: 164rpx;
				}
			}
		}
		.right {
			.category1 {
				padding-top: 80rpx;
				padding-left: 30rpx;
				.category-image {
					top: 78rpx;
					right: 6rpx;
					width: 150rpx;
					height: 164rpx;
				}
			}
			.category2 {
				margin-bottom: 32rpx;
				padding-top: 66rpx;
				padding-left: 32rpx;
				.category-image {
					top: 24rpx;
					right: 0;
					width: 160rpx;
					height: 160rpx;
				}
			}
		}
		.category1 {
			height: 244rpx;
			box-shadow: 0rpx 6rpx 32rpx 0rpx rgba(200,198,220,0.6);
		}
		.category2 {
			height: 184rpx;
			box-shadow: 0rpx 12rpx 58rpx 0rpx rgba(200,198,220,0.8);
			color: #40457F;
		}
		.category3 {
			width: 100%;
			height: 176rpx;
			margin-top: 32rpx;
			padding-top: 58rpx;
			padding-left: 34rpx;
			box-shadow: 0rpx 6rpx 32rpx 0rpx rgba(200,198,220,0.6);
		}
		.category1,
		.category3 {
			.category-title {
				background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.category-image {
				top: -32rpx;
				right: 26rpx;
				width: 316rpx;
				height: 218rpx;
			}
		}
	}
	.coach-list {
		margin-top: 26rpx;
		padding: 0 32rpx;
	}
</style>
