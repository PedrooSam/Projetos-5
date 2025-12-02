"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AuthButton } from "./auth-button";

export function FestivalHeader() {
	const [busca, setBusca] = useState<string>();

	return (
		<header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between gap-4">
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
							href="/programacao"
						>
							Sobre
						</Link>
					</div>

					<AuthButton />
				</div>
			</div>
		</header>
	);
}
