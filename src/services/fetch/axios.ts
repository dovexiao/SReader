import axios, { AxiosInstance }  from 'axios';
import Config from 'react-native-config';

const api: AxiosInstance = axios.create({
    baseURL: Config.API_URL,
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    try {
        // const token = await TokenUtils.getAccessToken();
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        // 输出请求信息的 JSON
        console.log('请求信息 JSON:', config);

        return config;
    } catch (error) {
        throw error;
    }
});

api.interceptors.response.use((response) => {
    // 输出响应信息的 JSON
    console.log('响应信息 JSON:', response);

    return response;
}, async (resError) => {
    try {
        // if (resError.response.status === 401 && resError.response.data.error.details.code === 'EXPIRED_TOKEN') {
        //     console.log('Token 过期，正在刷新 Token...');
        //     await TokenUtils.refreshTokens(api);
        //     return api.request(resError.config);
        // }
        // 输出错误响应信息的 JSON
        console.log('错误响应信息 JSON:', resError);

        return Promise.reject(resError);
    } catch (error) {
        throw error;
    }
});

export default api;
