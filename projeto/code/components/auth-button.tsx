"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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

export function AuthButton() {
	const router = useRouter();
	const [user, setUser] = useState<UserInfo | null>(null);

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
	);
}
