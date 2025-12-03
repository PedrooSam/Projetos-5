"use client";

import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FestivalFooter } from "@/components/festival-footer";
import { FestivalHeader } from "@/components/festival-header";
import { SessaoCard } from "@/components/sessao-card";
import { Input } from "@/components/ui/input";
import { type Sessao, sessaoService } from "@/lib/services/sessoes-service";

export default function ProgramacaoPage() {
	const [allSessoes, setAllSessoes] = useState<Sessao[]>([]);
	const [filteredSessoes, setFilteredSessoes] = useState<Sessao[]>([]);

	const searchParams = useSearchParams();
	const busca = searchParams.get("busca");
	const categoria = searchParams.get("categoria");

	useEffect(() => {
		const fetchSessoes = async () => {
			const response = await sessaoService.getAllSessoes("1");
			setAllSessoes(response.data.results);
			setFilteredSessoes(response.data.results);
		};

		fetchSessoes();
	}, []);

	useEffect(() => {
		if (allSessoes.length > 0) {
			filterParams();
		}
	}, [busca, categoria, allSessoes]);

	function filterSearch(nome: string | null) {
		console.log(nome);
		if (nome === null) return;
		if (nome.length < 3) {
			setFilteredSessoes(allSessoes);
			return;
		}
		setFilteredSessoes(
			allSessoes.filter(
				(s) =>
					s.espetaculo.nome.toLowerCase().startsWith(nome.toLowerCase()) ||
					s.espetaculo.grupo.toLowerCase().startsWith(nome.toLowerCase()),
			),
		);
		console.log(filteredSessoes);
	}

	function filterParams() {
		let result = allSessoes;

		if (busca && busca.length >= 3) {
			const lower = busca.toLowerCase();
			result = result.filter(
				(s) =>
					s.espetaculo.nome.toLowerCase().includes(lower) ||
					s.espetaculo.grupo.toLowerCase().includes(lower),
			);
		}

		if (categoria && categoria !== "todas") {
			result = result.filter(
				(s) => s.espetaculo.categoria.toLowerCase() === categoria.toLowerCase(),
			);
		}

		setFilteredSessoes(result);
	}

	return (
		<div className="min-h-screen flex flex-col bg-background">
			
			<main className="flex-1 container mx-auto px-4 py-8">
				{/* Back Button */}
				<div className="mb-8">
					<Link
						href="/"
						className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
					>
						<ChevronLeft className="mr-2 h-4 w-4" />
						Voltar
					</Link>
				</div>

				{/* Filters and Search */}
				<div className="flex flex-col md:flex-row gap-4 items-center justify-end mb-8">
					<div className="relative w-full md:w-[300px]">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							onChange={(e) => filterSearch(e.target.value)}
							placeholder="Pesquisar eventos"
							className="pl-9 bg-muted/50 border-muted-foreground/20"
						/>
					</div>
				</div>

				{/* Events Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{filteredSessoes.map((sessao) => (
						<div key={sessao.id} className="flex justify-center">
							<SessaoCard sessao={sessao} className="w-full max-w-[280px]" />
						</div>
					))}
				</div>
			</main>

		</div>
	);
}
