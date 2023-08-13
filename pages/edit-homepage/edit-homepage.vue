<template>
	<view class="page-container1">
		<nav-bar show-bg show-back></nav-bar>
		<view class="edit-wrapper">
			<view class="header flex-between">
				<view class="title">编辑个人主页</view>
				<view class="preview" @click="jumpPreview">预览</view>
			</view>
			<view class="title">基本信息 {{ baseInfoCount }}/3</view>
			<view class="flex-between" style="margin-top: 44rpx;">
				<view class="sub-title">头像</view>
				<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image :src="state.avatarUrl" class="avatar"></image>
				</button>
			</view>
			<view class="flex-between items-center" style="margin-top: 42rpx;">
				<view class="sub-title">姓名</view>
				<input class="count" style="margin-right: 0;text-align: right;" type="nickname" v-model="state.nickName">
			</view>
			<view class="flex-between items-center" style="margin-top: 52rpx;margin-bottom: 62rpx;" @click="tagPopupShow = true">
				<view class="sub-title">标签</view>
				<view class="count">{{ state.selectedTagId.length }}/5</view>
				<view class="icon-arrow"></view>
			</view>
			<view class="title">照片 {{ imageInfoCount }}/3</view>
			<view class="flex-between items-center" style="margin-top: 48rpx;" @click="jumpUploadImages(1)">
				<view class="sub-title">训练照</view>
				<view class="count">{{ state.trainImages.length }}/20</view>
				<view class="icon-arrow"></view>
			</view>
			<view class="flex-between items-center" style="margin-top: 50rpx;" @click="jumpUploadImages(2)">
				<view class="sub-title">生活照</view>
				<view class="count">{{ state.lifeImages.length }}/20</view>
				<view class="icon-arrow"></view>
			</view>
			<view class="flex-between items-center" style="margin-top: 50rpx;margin-bottom: 66rpx;" @click="jumpUploadImages(3)">
				<view class="sub-title">证书</view>
				<view class="count">{{ state.certImages.length }}/20</view>
				<view class="icon-arrow"></view>
			</view>
			<view class="title">其他信息 {{ otherInfoCount }}/2</view>
			<view class="flex-between items-center" style="margin-top: 48rpx;" @click="jumpEditContent(1)">
				<view class="sub-title">职业经历</view>
				<view class="count" v-show="state.experience">已完成</view>
				<view class="icon-arrow"></view>
			</view>
			<view class="flex-between items-center" style="margin-top: 50rpx;" @click="jumpEditContent(2)">
				<view class="sub-title">擅长内容</view>
				<view class="count" v-show="state.beGood">已完成</view>
				<view class="icon-arrow"></view>
			</view>
		</view>
		<view class="btn-submit" @click="onSubmit">
			<image src="/static/btn_submit.png" class="btn-submit-image"></image>
			<span class="btn-submit-text">提交</span>
		</view>
	</view>
	<seek-popup :show="tagPopupShow" @mask-click="tagPopupShow = false">
		<view class="tag-wrapper center-wrapper">
			<view class="popup-title">请选择标签</view>
			<view class="tag-list">
				<view
					class="tag-item"
					:class="{'selected': state.selectedTagId.includes(tag.id)}"
					v-for="tag in state.tagList"
					:key="tag.id"
					@click="onSelectTag(tag.id)"
					>{{ tag.name }}</view>
			</view>
		</view>
	</seek-popup>
</template>

<script setup>
	import { ref, reactive, computed } from 'vue';
	import { onLoad, onUnload } from '@dcloudio/uni-app';
	import { tagList, updateCoach } from '@/api/index.js';
	
	const state = reactive({
		avatarUrl: '/static/avatar.png',
		nickName: 'SEEK用户',
		tagList: [],
		selectedTagId: [],
		trainImages: [],
		lifeImages: [],
		certImages: [],
		experience: '',
		beGood: ''
	});
	const tagPopupShow = ref(false);
	const baseInfoCount = computed(() => {
		const { avatarUrl, nickName, selectedTagId } = state;
		return Number(avatarUrl.length > 0) + Number(nickName.length > 0) + Number(selectedTagId.length > 0);
	});
	const imageInfoCount = computed(() => {
		const { trainImages, lifeImages, certImages } = state;
		return Number(trainImages.length > 0) + Number(lifeImages.length > 0) + Number(certImages.length > 0);
	});
	const otherInfoCount = computed(() => {
		const { experience, beGood } = state;
		return Number(experience.length > 0) + Number(beGood.length > 0);
	});
	onLoad(() => {
		getTagList();
		uni.$on('upload-images', (data) => {
			handleUploadImages(data);
		});
		uni.$on('edit-content', (data) => {
			handleEditContent(data);
		});
	});
	onUnload(() => {
		uni.$off('upload-images');
		uni.$off('edit-content');
	});
	const onChooseAvatar = (e) => {
		state.avatarUrl = e.detail.avatarUrl;
	};
	const getTagList = async () => {
		const res = await tagList();
		state.tagList = res.data;
	};
	const onSelectTag = (id) => {
		if (state.selectedTagId.includes(id)) {
			const index = state.selectedTagId.findIndex(item => item === id);
			state.selectedTagId.splice(index, 1);
		} else {
			state.selectedTagId.push(id);
		}
	};
	const imageTypeMap = {
		1: 'trainImages',
		2: 'lifeImages',
		3: 'certImages'
	};
	const jumpUploadImages = (type) => {
		const images = state[imageTypeMap[type]];
		uni.navigateTo({
			url: `/pages/upload-images/upload-images?type=${type}`,
			success: (res) => {
				res.eventChannel.emit('images', images);
			}
		});
	};
	const handleUploadImages = (data) => {
		const { images, type } = data;
		state[imageTypeMap[type]] = images;
	};
	const contentTypeMap = {
		1: 'experience',
		2: 'beGood'
	};
	const jumpEditContent = (type) => {
		const content = state[contentTypeMap[type]];
		uni.navigateTo({
			url: `/pages/edit-content/edit-content?type=${type}`,
			success: (res) => {
				res.eventChannel.emit('content', content);
			}
		});
	};
	const handleEditContent = (data) => {
		const { content, type } = data;
		state[contentTypeMap[type]] = content;
	};
	const tipsContentMap = {
		nickName: '请输入姓名',
		selectedTagId: '请选择标签',
		trainImages: '请上传训练照',
		lifeImages: '请上传生活照',
		certImages: '请上传证件',
		experience: '请填写职业经历',
		beGood: '请填写擅长内容'
	};
	const checkState = () => {
		const keys = Object.keys(state);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const val = state[key];
			if (!val || !val.length) {
				uni.showToast({
					title: tipsContentMap[key],
					icon: 'none'
				});
				return false;
			}
		}
		return true;
	};
	const getConvertState = () => {
		const { avatarUrl, nickName, selectedTagId, tagList, trainImages, lifeImages, certImages, experience, beGood } = state;
		return {
			head_img: avatarUrl,
			name: nickName,
			train_img: trainImages,
			life_img: lifeImages,
			cert_img: certImages,
			experience,
			be_good: beGood,
			tag: selectedTagId
		};
	};
	const onSubmit = async () => {
		if (!checkState()) return;
		const data = getConvertState();
		const res = await updateCoach(data);
		uni.showToast({
			title: '编辑成功',
			success: () => {
				uni.navigateBack();
			}
		});
	};
	const jumpPreview = () => {
		const data = getConvertState();
		const trainId = uni.getStorageSync('train_id');
		uni.navigateTo({
			url: `/pages/coach-detail/coach-detail?id=${trainId}&view_mode=preview`,
			success: (res) => {
				res.eventChannel.emit('coachDetail', data);
			}
		});
	};
</script>

<style lang="scss" scoped>
	.edit-wrapper {
		padding: 0 32rpx;
	}
	.header {
		margin-top: 38rpx;
		margin-bottom: 64rpx;
	}
	.title {
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #181818;
		line-height: 38rpx;
	}
	.preview {
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		line-height: 38rpx;
		background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.sub-title {
		flex: 1;
		font-size: 28rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #8B8B8B;
		line-height: 33rpx;
	}
	.count {
		margin-right: 24rpx;
		font-size: 28rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #8B8B8B;
		line-height: 33rpx;
	}
	.btn-submit {
		position: relative;
		width: 750rpx;
		height: 196rpx;
		margin-top: 62rpx;
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
	.tag-wrapper {
		.tag-list {
			width: 400rpx;
			margin: 30rpx auto 0;
			overflow: hidden;
		}
		.tag-item {
			float: left;
			margin-bottom: 25rpx;
			padding: 7rpx 30rpx;
			border: 1rpx solid #e0e0e0;
			border-radius: 30rpx;
			font-size: 28rpx;
			color: #8b8b8b;
			transition: background 0.25s;
			&:nth-of-type(2n) {
				margin-left: 47rpx;
			}
			&.selected {
				border-color: transparent;
				background: linear-gradient(320deg, #5B378A 6%, #A13F9D 98%);
				color: #fff;
			}
		}
	}
</style>
