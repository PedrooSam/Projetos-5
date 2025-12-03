import axios, { AxiosHeaders } from "axios";

const url = process.env.NEXT_PUBLIC_API_LINK || "http://localhost:8000";

export interface HttpResponse<T> {
	data: T;
	status: number;
}

export interface Pager<T> {
	count: number;
	results: T[];
}

export const auth = axios.create({
	baseURL: url + "/auth",
	headers: new AxiosHeaders({
		"Content-Type": "application/json",
	}),
	withCredentials: true,
});

export const api = axios.create({
	baseURL: url + "/api",
	headers: new AxiosHeaders({
		"Content-Type": "application/json",
	}),
	withCredentials: true,
});

api.defaults.withCredentials = true;
auth.defaults.withCredentials = true;

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

api.interceptors.response.use(
	(response) => response,

	async (error) => {
		const originalRequest = error.config;

		// Só tenta refresh quando for 401 e não for retry ainda
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(() => api(originalRequest))
					.catch((err) => Promise.reject(err));
			}

			isRefreshing = true;

			try {
				await auth.post("/jwt/refresh/");

				processQueue(null);
				window.location.reload();
				return api(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				window.location.replace("/login")
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}


		return Promise.reject(error);
	},
);

export default api;
