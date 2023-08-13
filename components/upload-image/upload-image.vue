<template>
	<view class="image-wrapper" v-for="(image, index) in images" :key="index">
		<image class="upload-image" :src="image" mode="aspectFill"></image>
		<image src="/static/icon_delete.png" class="icon-delete" @click="deleteImage(index)"></image>
	</view>
	<view v-show="images.length < limit" class="btn-upload flex-center" @click="chooseImage">
		<image src="/static/icon_add1.png" class="icon-add"></image>
	</view>
	<view class="limit-text">{{ images.length }} / {{ limit }}</view>
</template>

<script setup>
	import { ref, watch } from 'vue';
	
	const props = defineProps({
		modelValue: {
			type: Array,
			default: () => []
		},
		limit: {
			type: Number,
			default: () => 5
		}
	});
	const emit = defineEmits(['update:modelValue']);
	const images = ref([]);
	watch(
		() => props.modelValue,
		value => {
			images.value = value;
		}
	);
	
	const chooseImage = () => {
		uni.chooseImage({
			success: (res) => {
				images.value = [...images.value, ...res.tempFilePaths].slice(0, 20);
				emit('update:modelValue', images.value);
			}
		});
	};
	const deleteImage = (index) => {
		images.value.splice(index, 1);
		emit('update:modelValue', images.value);
	};
</script>

<style lang="scss" scoped>
	.image-wrapper {
		position: relative;
		float: left;
		width: 128rpx;
		height: 128rpx;
		margin-right: 30rpx;
	}
	.upload-image {
		width: 128rpx;
		height: 128rpx;
		border-radius: 16rpx;
	}
	.icon-delete {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
		background-color: red;
	}
	.btn-upload {
		float: left;
		width: 128rpx;
		height: 128rpx;
		background: #fff;
		box-shadow: 0rpx 12rpx 58rpx 0rpx rgba(200,198,220,0.8);
		border-radius: 16rpx;
		font-size: 80rpx;
		.icon-add {
			width: 64rpx;
			height: 64rpx;
		}
	}
	.limit-text {
		float: left;
		width: 128rpx;
		height: 128rpx;
		padding-top: 95rpx;
		padding-left: 20rpx;
		font-size: 24rpx;
		color: #8b8b8b;
	}
</style>