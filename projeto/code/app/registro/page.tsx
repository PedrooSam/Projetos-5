"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	authService,
	type RegisterFormData,
	registerSchema,
} from "@/lib/services/auth-service";

export default function RegisterPage() {
	const router = useRouter();
	const [serverError, setServerError] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		setServerError("");
		try {
			await authService.register(data.username, data.email, data.password);
		} catch (err) {
			setServerError("Erro ao criar conta. Tente novamente.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background px-4">
			<Card className="w-full max-w-md p-8 space-y-6">
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold text-foreground">Cadastro</h1>
					<p className="text-muted-foreground">Crie sua conta do Festival</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Nome de Usúario</Label>
						<Input
							id="username"
							type="text"
							placeholder="Seu nome completo"
							{...register("username")}
							disabled={isSubmitting}
						/>
						{errors.username && (
							<p className="text-sm text-destructive">
								{errors.username.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="seu.email@exemplo.com"
							{...register("email")}
							disabled={isSubmitting}
						/>
						{errors.email && (
							<p className="text-sm text-destructive">{errors.email.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Senha</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							{...register("password")}
							disabled={isSubmitting}
						/>
						{errors.password && (
							<p className="text-sm text-destructive">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirmar Senha</Label>
						<Input
							id="confirmPassword"
							type="password"
							placeholder="••••••••"
							{...register("confirmPassword")}
							disabled={isSubmitting}
						/>
						{errors.confirmPassword && (
							<p className="text-sm text-destructive">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					{serverError && (
						<div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
							{serverError}
						</div>
					)}

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Criando conta..." : "Cadastrar"}
					</Button>
				</form>

				<div className="text-center text-sm text-muted-foreground">
					Já tem conta?{" "}
					<Link
						href="/login"
						className="text-primary hover:underline font-medium"
					>
						Faça login aqui
					</Link>
				</div>
			</Card>
		</div>
	);
}
