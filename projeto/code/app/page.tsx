"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SessaoCarousel from "@/components/sessao-carrousel";
import { FestivalFooter } from "@/components/festival-footer";
import { FestivalHeader } from "@/components/festival-header";
import { FestivalHero } from "@/components/festival-hero";
import { SessaoCategory } from "@/components/sessao-category";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authService } from "@/lib/services/auth-service";
import { type Sessao, sessaoService } from "@/lib/services/sessoes-service";

export default function FestivalPage() {
	const [sessoes, setSessoes] = useState<Sessao[]>();

	const categories = ["Musical", "Drama", "Comedia", "Dança"];

	useEffect(() => {
		const fetchSessoes = async () => {
			sessaoService
				.getAllSessoes("1")
				.then((response) => setSessoes(response.data.results));
		};

		fetchSessoes();
	}, []);

	const musicalSessoes = sessoes?.filter(
		(s) => s.espetaculo.categoria === "Musical",
	);
	const dramaSessoes = sessoes?.filter(
		(s) => s.espetaculo.categoria === "Drama",
	);
	const comediaSessoes = sessoes?.filter(
		(s) => s.espetaculo.categoria === "Comedia",
	);
	const dancaSessoes = sessoes?.filter(
		(s) => s.espetaculo.categoria === "Dança",
	);

	return (
		<div className="min-h-screen">
			<FestivalHeader />
			<SessaoCarousel />

			<main className="container mx-auto px-4 py-12 space-y-16">
				<div className="flex justify-center gap-2">
					{categories.map((categoria, index) => (
						<Link key={index} href={"/programacao?categoria=" + categoria}>
							<Button
								variant="outline"
								className="border-white hover:bg-white hover:text-[#1a2337]"
							>
								{categoria}
							</Button>
						</Link>
					))}
				</div>
				{comediaSessoes && comediaSessoes.length !== 0 && (
					<SessaoCategory titulo="Comédia" sessoes={comediaSessoes} />
				)}

				{dramaSessoes && dramaSessoes.length !== 0 && (
					<SessaoCategory titulo="Drama" sessoes={dramaSessoes} />
				)}

				{musicalSessoes && musicalSessoes.length !== 0 && (
					<SessaoCategory titulo="Musical" sessoes={musicalSessoes} />
				)}

				{dancaSessoes && dancaSessoes.length !== 0 && (
					<SessaoCategory titulo="Dança" sessoes={dancaSessoes} />
				)}
			</main>

			<FestivalFooter />
		</div>
	);
}
