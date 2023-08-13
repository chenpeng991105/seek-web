<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	view {
		margin: 0;
		padding: 0;
		font-family: PingFang SC;
		box-sizing: border-box;
	}
	input {
		font-size: 28rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #181818;
		&::placeholder {
			color: #8B8B8B;	
		}
	}
	button {
		padding: 0;
		background-color: transparent;
		outline: none;
		overflow: visible;
		&::after {
			border: none;
		}
	}
	.button-hover {
		background-color: transparent;
	}
	.page-container1 {
		position: relative;
		width: 100vw;
		height: 100vh;
		padding-top: 176rpx;
		overflow-x: hidden;
		overflow-y: auto;
		background: linear-gradient(180deg, rgba(104,57,142,0.22) 0%, #EEF0F4 14%);
	}
	.page-container2 {
		position: relative;
		width: 100%;
		height: 100vh;
		padding-top: 176rpx;
		background-color: #EEF0F4;
		overflow: auto;
	}
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.items-center {
		display: flex;
		align-items: center;
	}
	.flex-between {
		display: flex;
		justify-content: space-between;
	}
	.flex-column-between {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.avatar {
		width: 128rpx;
		height: 128rpx;
		border-radius: 20rpx;
	}
	.coach-status {
		width: 53rpx;
		height: 28rpx;
		margin-left: 16rpx;
		margin-right: 30rpx;
		border-radius: 3rpx;
		font-size: 20rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		&.online {
			border: 2rpx solid #00B42A;
			color: #00B42A;
		}
		&.offline {
			border: 2rpx solid #8B8B8B;
			color: #8B8B8B;
		}
	}
	.icon-arrow {
		width: 20rpx;
		height: 20rpx;
		border-left: 3rpx solid #ACACAC;
		border-bottom: 3rpx solid #ACACAC;
		transform: rotate(-135deg);
	}
	.popup-title {
		margin-bottom: 10rpx;
		font-size: 40rpx;
		font-weight: 600;
		text-align: center;
		color: #181818;
	}
	.center-wrapper {
		position: relative;
		width: 600rpx;
		height: 380rpx;
		padding-top: 40rpx;
		background-color: #fff;
		border-radius: 15rpx;
		color: #181818;
	}
</style>
