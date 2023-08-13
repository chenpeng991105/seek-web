<template>
	<view class="page-container2">
		<nav-bar show-back show-bg>
			<div class="search-wrapper flex-between items-center" @click.stop>
				<input type="text" class="search-input" placeholder="请输入教练名称" v-model="coachName" :focus="focus">
				<image src="/static/icon_search.png" class="icon-search" @click.stop="handleSearchCoach"></image>
			</div>
		</nav-bar>
		<div class="coach-list">
			<coach-info v-for="item in coachList" :key="item.id" :coach-info="item"></coach-info>
		</div>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	import { searchCoach } from '@/api/index.js';
	
	const coachName = ref('');
	const coachList = ref([]);
	const focus = ref(false);
	onShow(() => {
		focus.value = true;
	});
	const handleSearchCoach = async () => {
		const res = await searchCoach({ name: coachName.value });
		coachList.value = res.data;
	};
</script>

<style lang="scss" scoped>
	.search-wrapper {
		width: 338rpx;
		height: 64rpx;
		margin-left: 64rpx;
		padding-left: 36rpx;
		padding-right: 26rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 32rpx;
		.search-input {
			width: 200rpx;
			height: 48rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
			&::placeholder {
				color: #ACACAC;
			}
		}
		.icon-search {
			width: 48rpx;
			height: 48rpx;
		}
	}
	.coach-list {
		margin-top: 48rpx;
		margin-left: 32rpx;
	}
</style>
