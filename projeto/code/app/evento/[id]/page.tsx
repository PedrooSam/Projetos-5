"use client"

import { FestivalHeader } from "@/components/festival-header"
import { FestivalFooter } from "@/components/festival-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EventCard } from "@/components/sessao-card"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Evento, eventoService } from "@/lib/services/eventos-service"

export default function EventoPage({ params }: any) {
  const { id } = useParams()
  const [event, setEvent] = useState<Evento>()

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await eventoService.getEventoById(id as string)
      setEvent(response.data)
    }
    fetchEvent()
  },[])

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
        {event &&<>
        <div className="grid lg:grid-cols-[1fr,400px] gap-8 mb-16">
          {/* Event Image */}
          <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-lg overflow-hidden bg-muted">
            {/*<Image src={event.image !== || "theatrical-performance-poster.jpg"} alt={event.title} fill className="object-cover" priority />*/}
          </div>

          {/* Event Details & Purchase */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-4">{event.nome}</h1>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{event?.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p></p>
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
                      10x de R$ 20.00
                    </p>
                    <p className="text-sm text-muted-foreground">sem juros</p>
                    <p className="text-sm text-muted-foreground mt-1">ou R$ 200.00 à vista</p>
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
        </>}
      </main>

      <FestivalFooter />
    </div>
  )
}
