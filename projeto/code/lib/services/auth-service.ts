import { z } from "zod";
import { api, auth, type HttpResponse } from "../axios";

export const loginSchema = z.object({
	username: z
		.string()
		.min(2, "Nome de Usuário deve ter no mínimo 2 caracteres"),
	password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const registerSchema = z
	.object({
		username: z
			.string()
			.min(2, "Nome de Usuário deve ter no mínimo 2 caracteres"),
		email: z.string().email("Email inválido"),
		password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não correspondem",
		path: ["confirmPassword"],
	});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export interface UserInfo {
	id: string;
	username: string;
	email: string;
}

class AuthService {
	async register(
		username: string,
		email: string,
		password: string,
	): Promise<HttpResponse<any>> {
		const data = { username: username, email: email, password: password };
		const response = await auth.post("/users/", data).catch((error) => {
			console.log(error);
		});

		await this.fetchAndSaveUserInfo();
		return { data: response.data, status: response.status };
	}

	async login(username: string, password: string): Promise<HttpResponse<any>> {
		const data = { username: username, password: password };
		const response = await auth.post("/jwt/create/", data);
		console.log(response);

		await this.fetchAndSaveUserInfo();
		return { data: response.data, status: response.status };
	}

	// Busca o usuário atual
	async getCurrentUser(): Promise<UserInfo> {
		const response = await auth.get("/users/me/");

		return response.data;
	}

	private setUserInfo(userInfo: UserInfo): void {
		if (typeof window !== "undefined") {
			localStorage.setItem("teatro_user", JSON.stringify(userInfo));
		}
	}

	getUserInfo(): UserInfo | null {
		if (typeof window === "undefined") return null;
		const userInfo = localStorage.getItem("teatro_user");
		return userInfo ? JSON.parse(userInfo) : null;
	}

	private async fetchAndSaveUserInfo(): Promise<void> {
		try {
			const userInfo = await this.getCurrentUser();
			this.setUserInfo(userInfo);
		} catch {
			this.logout();
		}
	}

	async logout(): Promise<void> {
		try {
			await auth.post("/jwt/logout/", {}, { withCredentials: true });
		} catch (e) {
			console.error("Erro ao deslogar", e);
		} finally {
			if (typeof window !== "undefined") {
				localStorage.removeItem("teatro_user");
				window.location.href = "/login";
			}
		}
	}
}

export const authService = new AuthService();
