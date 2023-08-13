<template>
	<div class="coach-info" @click="jumpCoachDetail">
		<image :src="coachInfo?.head_img" class="avatar"></image>
		<div class="coach-intro flex-column-between">
			<div class="items-center">
				<p class="coach-name">{{ coachInfo?.name }}</p>
				<p class="coach-status flex-center" :class="[coachInfo?.online ? 'online' : 'offline']">{{ coachInfo?.online? '在线' : '离线' }}</p>
				<p v-for="(item, index) in coachInfo.tag" :key="index" class="coach-tag">{{ `#${item.name}` }}</p>
				<slot></slot>
			</div>
			<div class="coach-data-wrapper" v-if="showCoachData">
				<div class="coach-data1 items-center">
					<p class="tag flex-center">解答</p>
					<p class="content">{{ coachInfo?.answer_num }}条</p>
				</div>
				<div class="coach-data2 items-center">
					<p class="tag flex-center">时长</p>
					<p class="content">{{ coachInfo?.online_num }}分</p>
				</div>
				<div class="coach-data3 items-center">
					<p class="tag flex-center">被关注</p>
					<p class="content">{{ coachInfo?.fan_num }}位</p>
				</div>
			</div>
			<div class="coach-desc items-center">
				<image src="/static/icon_desc.png" class="icon-desc"></image>
				<text class="desc-text">{{ coachInfo?.be_good }}</text>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		coachInfo: {
			type: Object,
			default: () => ({})
		},
		showCoachData: {
			type: Boolean,
			default: () => true
		}
	});
	const jumpCoachDetail = () => {
		const { id } = props.coachInfo;
		uni.navigateTo({
			url: `/pages/coach-detail/coach-detail?id=${id}`
		})
	};
</script>

<style lang="scss" scoped>
	.coach-info {
		display: flex;
		margin-bottom: 64rpx;
	}
	.coach-intro {
		margin-left: 16rpx;
	}
	.avatar {
		flex-shrink: 0;
	}
	.coach-name {
		font-size: 28rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #181818;
	}
	.coach-tag {
		font-size: 24rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.coach-data-wrapper {
		display: flex;
		// margin-top: 10rpx;
		.coach-data1 {
			.tag {
				width: 53rpx;
				background: rgba(232,243,255,0.66);
				color: #165DFF;
			}
		}
		.coach-data2 {
			margin: 0 50rpx;
			.tag {
				width: 50rpx;
				background: rgba(232,255,234,0.66);
				color: #00B42A;
			}
		}
		.coach-data3 {
			.tag {
				width: 71rpx;
				background: rgba(255,247,232,0.66);
				color: #FF7D00;
			}
		}
		.tag {
			height: 30rpx;
			margin-right: 8rpx;
			border-radius: 3rpx;
			font-size: 20rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
		}
		.content {
			font-size: 20rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
		}
	}
	.coach-desc {
		// margin-top: 16rpx;
	}
	.icon-desc {
		width: 28rpx;
		height: 28rpx;
		margin-right: 12rpx;
	}
	.desc-text {
		font-size: 24rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #8B8B8B;
	}
</style>