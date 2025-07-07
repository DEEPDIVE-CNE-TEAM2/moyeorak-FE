import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

// Access Token 저장 및 가져오기 헬퍼 함수
export const setAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 응답에서 401 오류가 발생하면 리프레시 토큰을 이용해 재시도하는 인터셉터
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) {
                    throw new Error("Refresh token is missing.");
                }

                const accessToken = getAccessToken();

                // 리프레시 토큰으로 새 액세스 토큰 요청
                const response = await axios.post(
                    `${BASE_URL}/api/users/refresh`,
                    { refreshToken: refreshToken },
                    {
                        headers: {
                            accessToken: accessToken,
                        },
                    }
                );

                const { accessToken: newAccessToken } = response.data;
                setAccessToken(newAccessToken);

                // 새로운 액세스 토큰으로 원래 요청 재시도
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
