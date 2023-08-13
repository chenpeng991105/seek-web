import { followCoach } from '@/api/index.js';

export const useFollow = () => {
	const onFollowCoach = async (params, cb) => {
		await followCoach(params);
		cb();
		uni.showToast({
			title: params.is_follow ? '关注成功' : '取消关注'
		});
	};
	return {
		onFollowCoach
	};
};