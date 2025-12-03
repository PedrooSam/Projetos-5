"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AuthButtons } from "./auth-button";

export function FestivalHeader() {
	

	return (
		<header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-end gap-4">			
					<AuthButtons />
				</div>
			</div>
		</header>
	);
}
