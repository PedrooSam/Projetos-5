import { FestivalHeader } from "@/components/festival-header"
import { FestivalFooter } from "@/components/festival-footer"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Search, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

// Mock data for the full schedule
const allEvents = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    title: "Grupo Corpo - Piracema",
    date: "21 OUT > 22 OUT",
    venue: "Teatro Paulo Pontes, Recife - PE",
    image: "/dance-performance-brasil.jpg", // Using one of the existing images
  }))

export default function ProgramacaoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FestivalHeader />

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
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button variant="outline" className="gap-2 bg-transparent">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Pesquisar eventos" className="pl-9 bg-muted/50 border-muted-foreground/20" />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allEvents.map((event) => (
            <div key={event.id} className="flex justify-center">
              <EventCard event={event} className="w-full max-w-[280px]" />
            </div>
          ))}
        </div>
      </main>

      <FestivalFooter />
    </div>
  )
}
