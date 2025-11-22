import { FestivalHeader } from "@/components/festival-header"
import { FestivalFooter } from "@/components/festival-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EventCard } from "@/components/event-card"

// Sample events data - In a real app, this would come from a database
const eventsData = [
  {
    id: 1,
    title: "Grupo Corpo - Piracema",
    date: "21 OUT > 22 OUT",
    fullDate: "Sábado, 21 > 22 de Outubro",
    time: "20:00 BRT",
    venue: "Teatro Paulo pontes, Recife - PE",
    image: "/theatrical-performance-poster.jpg",
    price: 1125.0,
    installments: 12,
    installmentPrice: 93.75,
    description:
      "Que rufem os tambores e as alfaias, o grande dia chegou: vendas abertas! Agora é só correr pro abraço (e folia), amizade.\n\nQue seu arrependimento nunca seja não ter vivido o #GrupoCorpo2025.\n\nO Grupo Corpo apresenta Piracema, uma celebração da dança contemporânea brasileira que encanta platéias há anos. Esta apresentação única em João Pessoa promete uma experiência inesquecível de arte e movimento.",
  },
  {
    id: 2,
    title: "Grupo Corpo - Piracema",
    date: "21 OUT > 22 OUT",
    fullDate: "Sábado, 21 > 22 de Outubro",
    time: "20:00 BRT",
    venue: "Teatro Paulo pontes, Recife - PE",
    image: "/theatrical-performance-poster.jpg",
    price: 1125.0,
    installments: 12,
    installmentPrice: 93.75,
    description: "Uma apresentação mágica do Grupo Corpo com a performance Piracema.",
  },
]

export default function EventoPage({ params }: any) {
  const eventId = Number.parseInt(params.id)
  const event = eventsData.find((e) => e.id === eventId) || eventsData[0]

  // Get related events (excluding current event)
  const relatedEvents = eventsData.filter((e) => e.id !== eventId).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <FestivalHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>

        <div className="grid lg:grid-cols-[1fr,400px] gap-8 mb-16">
          {/* Event Image */}
          <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-lg overflow-hidden bg-muted">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
          </div>

          {/* Event Details & Purchase */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{event.fullDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p>{event.time}</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p>{event.venue}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="mb-4">
                    <p className="text-2xl font-bold mb-1">
                      {event.installments}x de R$ {event.installmentPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">sem juros</p>
                    <p className="text-sm text-muted-foreground mt-1">ou R$ {event.price.toFixed(2)} à vista</p>
                  </div>

                  <Button size="lg" className="w-full">
                    Comprar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Description */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-2xl font-bold mb-4">Descrição do Evento</h2>
          <div className="text-muted-foreground whitespace-pre-line leading-relaxed">{event.description}</div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Veja também</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((relatedEvent) => (
                <EventCard key={relatedEvent.id} event={relatedEvent} className="w-full" />
              ))}
            </div>
          </div>
        )}
      </main>

      <FestivalFooter />
    </div>
  )
}
