<template>
	<view class="page-container1">
		<nav-bar show-bg show-logo></nav-bar>
		<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image :src="avatarUrl" class="avatar"></image>
		</button>
		<input type="nickname" class="name" v-model="nickName" @blur="onBlur">
		<view class="action-bar flex-between">
			<view class="action-item" v-for="(item, index) in actionList" :key="index" @click="jumpPage(index)">
				<view class="icon-wrapper flex-center">
					<image :src="`/static/${item.icon}.png`" :class="item.icon"></image>
				</view>
				<text class="title">{{ item.title }}</text>
			</view>
		</view>
		<view class="nav-list">
			<view class="nav-item items-center" v-for="item in navList" :key="item.id" @click="onNavClick(item.id)">
				<image :src="`/static/${item.icon}.png`" class="nav-icon"></image>
				<view class="nav-title">{{ item.title }}</view>
				<view v-if="!item.content" class="icon-arrow"></view>
				<view v-else class="nav-content">{{ item.content }}</view>
			</view>
		</view>
	</view>
	<seek-popup :show="settingPopupShow" @mask-click="onMaskClick">
		<view class="center-wrapper settings-wrapper">
			<view class="popup-title">设置在线状态</view>
			<view class="flex-center" style="margin-top: 60rpx;">
				<switch @change="onSwitchChange" />
			</view>
		</view>
	</seek-popup>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { updateUserInfo, userInfo, setOnline } from '@/api/index.js';
	
	const avatarUrl = ref('/static/avatar.png');
	const nickName = ref('SEEK用户');
	const actionList = [
		{
			icon: 'icon_save',
			title: '我的保存'
		},
		{
			icon: 'icon_follow1',
			title: '我的关注'
		},
		{
			icon: 'icon_order',
			title: '我的订单'
		}
	];
	const navList = ref([
		{
			id: 1,
			icon: 'icon_version',
			title: '当前版本',
			content: uni.getSystemInfoSync().appVersion
		},
		{
			id: 2,
			icon: 'icon_clear',
			title: '清理缓存'
		},
		{
			id: 3,
			icon: 'icon_user',
			title: '用户ID',
			content: ''
		},
		{
			id: 4,
			icon: 'icon_contact',
			title: '联系我们'
		}
	])
	const coachNavItems = [
		{
			id: 5,
			icon: 'icon_user',
			title: '教练设置'
		},
		{
			id: 6,
			icon: 'icon_user',
			title: '设置在线'
		}
	];
	const settingPopupShow = ref(false);
	onLoad(() => {
		getUserInfo();
	});
	const jumpPage = (index) => {
		const urlMap = {
			0: '/mine-save/mine-save',
			1: '/mine-follow/mine-follow',
			2: '/mine-order/mine-order'
		};
		uni.navigateTo({
			url: `/pages${urlMap[index]}`
		});
	};
	const getUserInfo = async () => {
		const res = await userInfo();
		const { logo, nickname, train_id, id } = res.data;
		avatarUrl.value = logo;
		nickName.value = nickname;
		navList.value[2].content = id;
		if (train_id) {
			uni.setStorageSync('train_id', train_id);
			navList.value.splice(3, 0, coachNavItems[0], coachNavItems[1]);
		}
	};
	const onChooseAvatar = (e) => {
		avatarUrl.value = e.detail.avatarUrl;
		handleUpdateUserInfo();
	};
	const onBlur = (e) => {
		handleUpdateUserInfo();
	};
	const handleUpdateUserInfo = async () => {
		await updateUserInfo({logo: avatarUrl.value, nickname: nickName.value});
	};
	const onNavClick = (id) => {
		if (id === 5) {
			uni.navigateTo({
				url: '/pages/coach-settings/coach-settings'
			});
		} else if (id === 4) {
			uni.navigateTo({
				url: '/pages/contact-us/contact-us'
			});
		} else if (id === 6) {
			uni.hideTabBar();
			settingPopupShow.value = true;
		}
	};
	const onMaskClick = () => {
		settingPopupShow.value = false;
		uni.showTabBar();
	};
	const onSwitchChange = async (e) => {
		await setOnline({ online: e.detail.value });
		const text = e.detail.value ? '在线' : '离线';
		uni.showToast({
			title: `您已设置${text}`
		});
	};
</script>

<style lang="scss" scoped>
	.avatar {
		display: block;
		width: 128rpx;
		height: 128rpx;
		margin: 48rpx auto 12rpx;
		border-radius: 50%;
		box-shadow: 0rpx 12rpx 58rpx 0rpx rgba(200,198,220,0.8);
	}
	.name {
		height: 48rpx;
		line-height: 48rpx;
		margin-top: 12rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #181818;
		line-height: 48rpx;
	}
	.action-bar {
		width: 586rpx;
		margin: 36rpx auto 0;
		padding: 32rpx 32rpx 0;
		border-top: 1rpx solid #E6E6E6;
		.action-item {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.icon-wrapper {
			width: 49rpx;
			height: 48rpx;
		}
		.icon_save {
			width: 49rpx;
			height: 41rpx;
		}
		.icon_follow1 {
			margin-top: 6rpx;
		}
		.icon_follow1,
		.icon_order {
			width: 48rpx;
			height: 48rpx;
		}
		.title {
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
			line-height: 48rpx;
		}
	}
	.nav-list {
		margin-top: 60rpx;
		padding-left: 30rpx;
		padding-right: 32rpx;
		.nav-item {
			height: 108rpx;
		}
		.nav-icon {
			width: 32rpx;
			height: 32rpx;
		}
		.nav-title {
			flex: 1;
			margin-top: 2rpx;
			margin-left: 12rpx;
			font-size: 32rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
		}
		.nav-content {
			margin-top: 10rpx;
			font-size: 30rpx;
			color: #ACACAC;
		}
		.icon-arrow {
			margin-top: 2rpx;
		}
	}
	.settings-wrapper {
		width: 400rpx;
		height: 300rpx;
	}
</style>
