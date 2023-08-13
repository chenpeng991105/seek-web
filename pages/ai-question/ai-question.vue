<template>
	<view class="page-container1">
		<nav-bar show-back></nav-bar>
		<div class="tips flex-between items-center">
			<span class="tips-text">当前还可提问{{ askCount }}次，{{ hasLogin ? '完成任务后可增加次数' : '登录后可增加3次' }}</span>
			<div class="btn-login flex-center" @click="jumpPage">{{ hasLogin ? '去完成' : '去登录' }}</div>
			<div class="tips-arrow"></div>
		</div>
		<view class="chat-wrapper" ref="chatWrapperRef">
			<template v-for="(item, index) in chatRecord" :key="index">
				<div class="user-question">
					<chat-message position="left" :show-status="false">{{ item.question }}</chat-message>
				</div>
				<ai-answer :question="item.question" :answer="item.answer">{{ item.answer }}</ai-answer>
			</template>
		</view>
		<div class="question-wrapper items-center flex-between">
			<input type="text" placeholder="请输入您的问题" class="question-input" v-model="question">
			<div class="btn-ask" @click="onAsk">提问</div>
		</div>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, onMounted } from 'vue';
	import { aiChat, aiChatCount } from '@/api/index.js';
	import { useShare } from '@/hooks/useShare.js';
	import AiAnswer from './ai-answer.vue';

	const question = ref('');
	const askCount = ref(0);
	const chatRecord = ref([]);
	const chatWrapperRef = ref(null);
	const hasLogin = ref(uni.getStorageSync('has_login'));
	const { onShareAppMessage } = useShare();
	
	onLoad(async (option) => {
		question.value = option.question;
		await getAiChatCount();
		onAsk();
	});
	onShareAppMessage({
		title: 'SEEK',
		path: '/pages/ai/ai'
	});
	
	const onAsk = () => {
		if (question.value.length === 0) return;
		if (askCount.value === 0) {
			uni.showToast({
				title: '提问次数不足',
				icon: 'error'
			});
		} else {
			updateChatRecord('question', question.value);
			getAiChatAnswer();
			question.value = '';
		}
	};
	const getAiChatAnswer = async () => {
		uni.showLoading({
			title: '加载中'
		});
		const res = await aiChat({ask: question.value});
		askCount.value--;
		updateChatRecord('answer', res.data);
		uni.hideLoading();
	};
	const updateChatRecord = (type, content) => {
		if (type === 'question') {
			chatRecord.value.push({ question: content });
		} else {
			const len = chatRecord.value.length;
			chatRecord.value[len - 1].answer = content
		}
	};
	const getAiChatCount = async () => {
		const res = await aiChatCount();
		askCount.value = res.data.count;
	};
	const jumpPage = () => {
		let url;
		if (hasLogin.value) {
			url = '/pages/task/task';
		} else {
			url = '/pages/login/login';
		}
		uni.redirectTo({
			url
		});
	};
</script>

<style lang="scss" scoped>
	.tips {
		position: relative;
		width: 700rpx;
		height: 72rpx;
		margin: 48rpx auto 0;
		padding-left: 24rpx;
		padding-right: 24rpx;
		background: linear-gradient(320deg, #5B378A 6%, #A13F9D 98%);
		border-radius: 8rpx;
		color: #fff;
		.tips-text {
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
		}
		.btn-login {
			width: 124rpx;
			height: 44rpx;
			border-radius: 36rpx;
			border: 2rpx solid #fff;
			font-size: 24rpx;
		}
		.tips-arrow {
			position: absolute;
			top: 71rpx;
			right: 34rpx;
			width: 34rpx;
			height: 15rpx;
			background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
			clip-path: polygon(50% 0, 100% 100%, 0 100%);
			transform: rotate(180deg);
		}
	}
	.question-wrapper {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 114rpx;
		width: 686rpx;
		height: 80rpx;
		background: #fff;
		box-shadow: 0rpx 12rpx 58rpx 0rpx rgba(200,198,220,0.8);
		border-radius: 58rpx;
		.question-input {
			width: 550rpx;
			padding-left: 26rpx;
			text-align: left;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
			&::placeholder {
				color: #8B8B8B;
			}
		}
		.btn-ask {
			width: 124rpx;
			height: 48rpx;
			font-size: 32rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 46rpx;
			text-align: center;
			background: linear-gradient(323deg, #5B378A 23%, #A13F9D 98%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			border-left: 2rpx solid #e6e6e6;
		}
	}
	.save-wrapper {
		width: 600rpx;
		height: 400rpx;
		background-color: #fff;
		border-radius: 16rpx;
		.title {
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #181818;
			line-height: 33rpx;
		}
	}
	.chat-wrapper {
		width: 100%;
		height: calc(100vh - 600rpx);
		margin-top: 70rpx;
		padding: 0 32rpx;
		box-sizing: border-box;
		.user-question {
			padding-bottom: 32rpx;
			border-bottom: 2rpx solid #e6e6e6;
			:deep(.chat-message) {
				margin-bottom: 0;
			}
		}
	}
</style>
