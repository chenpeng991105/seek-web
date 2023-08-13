import { onShareAppMessage } from '@dcloudio/uni-app';

export const useShare = (params = {}) => {  
    let defaultOptions = {  
        title: 'Hello SEEK',
        path: '/pages/ai/ai',
        ...params
    };
    const shareApp = (options = {}) => {
        onShareAppMessage(() => {
            return {
                ...defaultOptions,
                ...options
            }
        })
    };
    return {
        onShareAppMessage: shareApp
    }
};