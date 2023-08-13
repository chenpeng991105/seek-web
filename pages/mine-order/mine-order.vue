<template>
	<view class="page-container1">
		<nav-bar show-bg show-back title="我的订单"></nav-bar>
		<scroll-view class="scroll-y" :scroll-y="true" @scrolltolower="getOrderList">
			<view class="order-wrapper">
				<template v-for="item in orderListData" :key="item.group">
					<view class="order-month">{{ item.group }}</view>
					<view class="order-list">
						<view class="order-item" v-for="(order, index) in item.list" :key="index">
							<image :src="item.logo" class="avatar"></image>
							<view class="flex-column-between" style="flex: 1;">
								<view class="order-name">支付- 在线问答（{{ order.train_name }}）</view>
								<view class="order-id">订单号：{{ order.order_code }}</view>
							</view>
							<view class="flex-column-between">
								<view class="order-price"> -¥ {{ order.amount }}</view>
								<view class="order-time">{{ order.pay_time }}</view>
							</view>
						</view>
					</view>
				</template>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	import { orderList } from '@/api/index.js';
	import { formatTimestamp } from '@/utils/index.js';
	
	const orderListData = ref([]);
	let page = 0;
	onLoad(() => {
		getOrderList();
	});
	const getOrderList = async () => {
		page++;
		const res = await orderList({ page, limit: 10 });
		handleOrderListData(res.data);
	};
	const handleOrderListData = (data) => {
		data.forEach(item1 => {
			const obj = orderListData.value.find(item2 => item2.group === item1.group);
			if (obj) {
				obj.list.push(item1);
			} else {
				orderListData.value.push({
					group: item1.group,
					list: [item1]
				});
			}
		});
	};
</script>

<style lang="scss" scoped>
	.scroll-y {
		height: calc(100vh - 212rpx);
	}
	.order-wrapper {
		margin-top: 36rpx;
		padding-left: 32rpx;
		padding-right: 30rpx;
	}
	.order-month {
		margin-bottom: 32rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #181818;
		line-height: 45rpx;
	}
	.order-item {
		display: flex;
		margin-bottom: 84rpx;
		.avatar {
			margin-right: 20rpx;
		}
	}
	 .order-time {
		 font-size: 32rpx;
		 font-family: PingFang SC-Medium, PingFang SC;
		 font-weight: 500;
		 color: #181818;
		 line-height: 45rpx;
	 }
	 .order-name {
		 margin-top: 2rpx;
		 font-size: 24rpx;
		 font-family: PingFang SC-Medium, PingFang SC;
		 font-weight: 500;
		 color: #181818;
	 }
	 .order-id {
		 margin-bottom: 6rpx;
		 font-size: 20rpx;
		 font-family: PingFang SC-Regular, PingFang SC;
		 font-weight: 400;
		 color: #8B8B8B;
		 line-height: 23rpx;
	 }
	 .order-price {
		 font-size: 28rpx;
		 font-family: PingFang SC-Medium, PingFang SC;
		 font-weight: 500;
		 color: #181818;
	 }
	 .order-time {
		 margin-bottom: 6rpx;
		 font-size: 20rpx;
		 font-family: PingFang SC-Regular, PingFang SC;
		 font-weight: 400;
		 color: #8B8B8B;
		 line-height: 23rpx;
	 }
</style>
