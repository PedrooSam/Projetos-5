"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { SessaoCard } from "@/components/sessao-card";
import { Button } from "@/components/ui/button";
import type { Sessao } from "@/lib/services/sessoes-service";

interface SessaoCategoryProps {
	titulo: string;
	sessoes: Sessao[];
	viewAllHref?: string;
}

export function SessaoCategory({
	titulo,
	sessoes,
	viewAllHref,
}: SessaoCategoryProps) {
	const scrollRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const scrollAmount = 400;
			const newScrollLeft =
				scrollRef.current.scrollLeft +
				(direction === "left" ? -scrollAmount : scrollAmount);
			scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
		}
	};

	return (
		<section>
			<div className="flex items-center justify-between mb-6">
				<div className="flex flex-row">
					<h2 className="text-2xl md:text-3xl font-bold">{titulo}</h2>
					<p className="text-2xl md:text-3xl ms-2 me-2">|</p>
					{viewAllHref ? (
						<Link
							href={viewAllHref}
							className="text-white font-medium hover:underline cursor-pointer text-2xl md:text-3xl"
						>
							Ver Tudo
						</Link>
					) : (
						<span className="text-white hover:underline cursor-pointer text-xl mt-1">
							Ver Tudo
						</span>
					)}
				</div>
				<div className="flex flex-row gap-4">
					<Button
						variant="outline"
						size="icon"
						className="z-10 shadow-lg bg-transparent rounded-full border-2 border-foreground hover:bg-foreground group"
						onClick={() => scroll("left")}
					>
						<ChevronLeft className="h-4 w-4 group-hover:text-black" />
					</Button>

					<Button
						variant="outline"
						size="icon"
						className="z-10 shadow-lg bg-transparent rounded-full border-2 border-foreground hover:bg-foreground group"
						onClick={() => scroll("right")}
					>
						<ChevronRight className="h-4 w-4 group-hover:text-black" />
					</Button>
				</div>
			</div>

			<div className="relative">
				<div
					ref={scrollRef}
					className="grid grid-cols-3 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				>
					{sessoes.map((sessao) => (
						<SessaoCard key={sessao.id} sessao={sessao} />
					))}
				</div>
			</div>
		</section>
	);
}
