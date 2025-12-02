import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FestivalHero() {
	return (
		<section className="relative bg-primary text-primary-foreground overflow-hidden">
			<div className="absolute inset-0 bg-[url('/circus-festival-stage.jpg')] bg-cover bg-center opacity-10" />

			<div className="relative container mx-auto px-4 py-16 md:py-24">
				<div className="max-w-4xl">
					<div className="text-sm font-medium mb-4 opacity-90">
						Ministério da Cultura Apresenta
					</div>

					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
						FESTIVAL
						<br />
						DE
						<br />
						CIRCO
						<br />
						BRASIL
					</h1>

					<div className="bg-foreground text-card rounded-lg p-6 md:p-8 max-w-2xl shadow-xl">
						<h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
							o vazio é cheio de coisa
						</h2>

						<p className="text-muted-foreground mb-4">
							Cia Nós No Bambu. BR[DF]
						</p>

						<div className="flex flex-wrap gap-4 mb-6">
							<div className="flex items-center gap-2 text-sm">
								<Calendar className="h-4 w-4 text-primary" />
								<span>6 NOV 20h</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<MapPin className="h-4 w-4 text-primary" />
								<span>Teatro de Santa Isabel</span>
							</div>
						</div>

						<Button size="lg" className="w-full sm:w-auto">
							Ver Detalhes
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
