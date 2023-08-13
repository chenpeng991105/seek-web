<template>
	<view class="page-container1">
		<nav-bar show-bg show-back title="我的收入"></nav-bar>
		<view class="title">账户余额 (元)</view>
		<view class="balance">{{ state.balance }}</view>
		<scroll-view class="scroll-y" :scroll-y="true" @scrolltolower="getIncomeList">
			<view class="income-list">
				<view class="income-item" v-for="(item, index) in state.list" :key="index">
					<image :src="item.head_img" class="avatar"></image>
					<view class="flex-column-between" style="flex: 1;">
						<view class="income-name">{{ incomeType[item.tp] }}- 在线问答（{{ item.name }}）</view>
						<view class="income-id">订单号：{{ item.order_code }}</view>
					</view>
					<view class="flex-column-between">
						<view class="income-price"> -¥ {{ item.amt }}</view>
						<view class="income-time">{{ formatTimestamp(item.ct) }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import { reactive } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { incomeList } from '@/api/index.js';
	import { formatTimestamp } from '@/utils/index.js';
	
	const state = reactive({
		balance: 0,
		list: []
	});
	const incomeType = {
		1: '在线问答',
		2: '退款',
		3: '提现'
	};
	let page = 0;
	
	onLoad(() => {
		getIncomeList();
	});
	const getIncomeList = async () => {
		page++;
		const res = await incomeList({ page, limit: 10 });
		const { balance, list } = res.data;
		state.balance = balance;
		state.list = [...state.list, ...list];
	};
</script>

<style lang="scss" scoped>
	.title {
		margin-top: 40rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #181818;
		line-height: 33rpx;
	}
	.balance {
		height: 68rpx;
		margin-top: 22rpx;
		margin-bottom: 94rpx;
		text-align: center;
		font-size: 48rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		line-height: 68rpx;
		background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.scroll-y {
		height: calc(100vh - 500rpx);
	}
	.income-list {
		padding: 0 32rpx;
	}
	.income-item {
		display: flex;
		margin-bottom: 84rpx;
		.avatar {
			margin-right: 20rpx;
		}
	}
	 .income-time {
		 font-size: 32rpx;
		 font-family: PingFang SC-Medium, PingFang SC;
		 font-weight: 500;
		 color: #181818;
		 line-height: 45rpx;
	 }
	 .income-name {
		 margin-top: 2rpx;
		 font-size: 24rpx;
		 font-family: PingFang SC-Medium, PingFang SC;
		 font-weight: 500;
		 color: #181818;
	 }
	 .income-id {
		 margin-bottom: 6rpx;
		 font-size: 20rpx;
		 font-family: PingFang SC-Regular, PingFang SC;
		 font-weight: 400;
		 color: #8B8B8B;
		 line-height: 23rpx;
	 }
	 .income-price {
		 font-size: 28rpx;
		 font-family: PingFang SC-Medium, PingFang SC;
		 font-weight: 500;
		 color: #181818;
	 }
	 .income-time {
		 margin-bottom: 6rpx;
		 font-size: 20rpx;
		 font-family: PingFang SC-Regular, PingFang SC;
		 font-weight: 400;
		 color: #8B8B8B;
		 line-height: 23rpx;
	 }
</style>
