export const useLogin = () => {
	const hasLogin = () => {
		if (!uni.getStorageSync('has_login')) {
			uni.showToast({
				title: '请先登录',
				icon: 'error',
				success: () => {
					const timer = setTimeout(() => {
						uni.redirectTo({
							url: '/pages/login/login'
						});
						clearTimeout(timer);
					}, 1500);
				}
			});
			return false;
		}
		return true;
	};
	
	return {
		hasLogin
	}
};