import axios, { AxiosRequestConfig } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
const base_url = 'https://api.zoom.us/v2';

const commonAPI = async <T>(httpMethod: HttpMethod, endpoint: string, reqBody: object = {}, options: AxiosRequestConfig = {}, token?: string) => {
    try {
        const reqConfig: AxiosRequestConfig = {
            method: httpMethod,
            url: `${base_url}${endpoint}`,
            data: reqBody,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            ...options,
        }
        const result = await axios(reqConfig);
        return result.data;
    } catch (err: any) {
        
        const message = err.response?.data?.message || err.message || 'Request failed';
        const status = err.response?.status || err.response?.status || 500;

        const error = new Error(message);
        (error as any).status = status;
        throw error;
    }
}

export default commonAPI