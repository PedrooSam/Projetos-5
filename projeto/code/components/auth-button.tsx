"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService, type UserInfo } from "@/lib/services/auth-service";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export function AuthButtons() {
	const router = useRouter();
	const [user, setUser] = useState<UserInfo | null>(null);
	const [busca, setBusca] = useState<string>();

	useEffect(() => {
		const fetchUser = async () => {
			const response = await authService.getCurrentUser();
			setUser(response);
		};

		fetchUser();
	}, []);

	if (!user) {
		return (
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" asChild>
					<Link href="/login">Login</Link>
				</Button>
				<Button size="sm" asChild>
					<Link href="/registro">Cadastro</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
		<div className="flex items-center gap-4 flex-1">
			<div className="relative flex-1 max-w-md">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Pesquisar eventos"
					className="pl-10"
					onChange={(e) => setBusca(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							redirect("/programacao?busca=" + busca);
						}
					}}
				/>
			</div>
		</div>
		<div className="hidden md:flex items-center gap-6">
			<Link
				className="text-sm font-medium hover:text-primary transition-colors"
				href="/programacao"
			>
				Programação
			</Link>
			<Link
				className="text-sm font-medium hover:text-primary transition-colors"
				href="/dashboard"
			>
				Dashboard
			</Link>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm">
					{user.username}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem disabled>
					<span className="text-xs text-muted-foreground">{user.email}</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						authService.logout();
						router.push("/");
					}}
				>
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
		</>
	);
}
