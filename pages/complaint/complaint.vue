<template>
	<view class="page-container1">
		<nav-bar show-back show-bg title="投诉"></nav-bar>
		<view class="complaint-wrapper">
			<view class="complaint-item items-center">
				<span class="title">投诉教练：</span>
				<span style="color: #8b8b8b;">{{ name }}</span>
			</view>
			<view class="complaint-item">
				<span class="title">投诉类型：</span>
				<view class="type-list">
					<checkbox-group @change="checkboxChange">
						<view class="items-center checkbox-wrapper" v-for="(item, index) in complaintType" :key="index">
							<checkbox :value="item" style="transform: scale(0.6);"></checkbox>{{ item }}
						</view>
					</checkbox-group>
				</view>
			</view>
			<view class="complaint-item">
				<span class="title">上传截图：</span>
				<upload-image :limit="9" v-model="img"></upload-image>
			</view>
			<view class="complaint-item">
				<span class="title">详细说明：</span>
				<view class="text-wrapper">
					<textarea maxlength="500" auto-height class="textarea" placeholder="请填写详细过程，有助于我们更准确地判断" v-model="desc"></textarea>
					<span class="input-num">{{ desc.length }}/500</span>
				</view>
			</view>
		</view>
		<view class="btn-submit" @click="onSubmit">
			<image src="/static/btn_submit.png" class="btn-submit-image"></image>
			<span class="btn-submit-text">提交</span>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { complaint } from '@/api/index.js';
	
	const complaintType = ['诱导消费', '人身攻击', '淫秽色情', '违法信息', '其他'];
	const img = ref([]);
	const title = ref([]);
	const desc = ref([]);
	const name = ref('');
	let trainId;
	
	onLoad((option) => {
		name.value = option.name;
		trainId = +option.id;
	});
	const checkboxChange = (e) => {
		title.value = e.detail.value;
	};
	const onSubmit = async () => {
		if (!title.value.length) {
			uni.showToast({
				title: '请选择投诉类型',
				icon: 'none'
			});
		} else {
			const res = await complaint({ train_id: trainId, title: title.value, img: img.value, desc: desc.value });
			uni.showToast({
				title: '您的投诉已收到，我们在第一时间核实后将会尽快与您联系，请耐心等待',
				icon: 'none',
				success: () => {
					const timer = setTimeout(() => {
						uni.navigateBack();
						clearTimeout(timer);
					}, 1500);
				}
			});
		}
	};
</script>

<style lang="scss" scoped>
	.complaint-wrapper {
		margin-top: 38rpx;
		padding: 0 32rpx;
	}
	.complaint-item {
		display: flex;
		margin-bottom: 48rpx;
		font-size: 32rpx;
		&:last-of-type {
			margin-bottom: 0;
		}
		.title {
			flex-shrink: 0;
			margin-right: 32rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #181818;
		}
		.input {
			font-size: 32rpx;
		}
		.type-list {
			margin-left: -8rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8b8b8b;
			.checkbox-wrapper {
				margin-bottom: 32rpx;
				&:last-of-type {
					margin-bottom: 0;
				}
			}
		}
		.detail-explain {
			width: 494rpx;
			height: 160rpx;
			padding: 18rpx 16rpx 18rpx 18rpx;
			box-sizing: border-box;
			border-radius: 16rpx;
			border: 2rpx solid #D2D2D2;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
		}
	}
	.text-wrapper {
		position: relative;
		width: 100%;
		min-height: 200rpx;
		padding: 10rpx;
		padding-bottom: 40rpx;
		border-radius: 16rpx;
		border: 2rpx solid #D2D2D2;
		.textarea {
			width: 100%;
			min-height: 170rpx;
			font-size: 24rpx;
		}
		.input-num {
			position: absolute;
			right: 22rpx;
			bottom: 12rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #8B8B8B;
			line-height: 28rpx;
		}
	}
	.btn-submit {
		position: relative;
		width: 750rpx;
		height: 196rpx;
		margin-top: 20rpx;
		padding-top: 65rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		.btn-submit-image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.btn-submit-text {
			position: relative;
			z-index: 10;
		}
	}
</style>
