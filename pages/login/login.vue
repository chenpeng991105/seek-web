<template>
	<view class="page-container1">
		<image src="/static/logo.png" class="logo"></image>
		<p class="slogan">寻找答案寻找自我</p>
		<button class="btn-login flex-center" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信账号一键登录</button>
		<div class="protocol flex-center">
			<icon-check color="#181818"></icon-check>
			<text class="tips">我已阅读并同意SEEK<text class="clear">《服务条款》</text>及<text class="clear">《隐私协议》</text></text>
		</div>
	</view>
</template>

<script setup>
	import { auth } from '@/api/index.js';
	import { getToken } from '@/utils/request.js';
	
	const getPhoneNumber = (e) => {
		getToken().then(() => {
			wxAuth(e);
		});
	};
	const wxAuth = async (e) => {
		const { errMsg, code } = e.detail;
		if (errMsg === 'getPhoneNumber:ok') {
			const res = await auth({ code });
			// 授权之后才是登录状态，否则是游客
			uni.setStorageSync('has_login', 1);
			uni.switchTab({
				url: '/pages/ai/ai'
			});
		}
	};
</script>

<style lang="scss" scoped>
	.logo {
		display: block;
		width: 200rpx;
		height: 178rpx;
		margin: 192rpx auto 66rpx;
	}
	.slogan {
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		font-family: PingFang SC-Medium, PingFang SC;
		background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.btn-login {
		width: 686rpx;
		height: 80rpx;
		margin: 262rpx auto 0;
		background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
		box-shadow: 0rpx 12rpx 58rpx 0rpx rgba(200,198,220,0.8);
		border-radius: 58rpx;
		font-size: 28rpx;
		font-weight: 500;
		font-family: PingFang SC-Medium, PingFang SC;
		color: #fff;
	}
	.protocol {
		margin-top: 28rpx;
		font-size: 24rpx;
		font-weight: 400;
		font-family: PingFang SC-Regular, PingFang SC;
		color: #8B8B8B;
		.tips {
			margin-left: 8rpx;
		}
		.clear {
			color: #181818;
		}
	}
</style>
