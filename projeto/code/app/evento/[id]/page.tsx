"use client"

import { FestivalHeader } from "@/components/festival-header"
import { FestivalFooter } from "@/components/festival-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Sessao, sessaoService } from "@/lib/services/sessoes-service"
import Image from "next/image"

export default function EventoPage() {
  const { id } = useParams()
  const [sessao, setSessao] = useState<Sessao>()

  useEffect(() => {    
    const fetchSessao = async () => {
      const response = await sessaoService.getSessaoById(id as string)
      setSessao(response)
    }

    fetchSessao()
  },[id])

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>
        {sessao &&<>
        <div className="grid lg:grid-cols-[1fr,400px] gap-8 mb-16">
          {/* sessao Image */}
          <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-lg overflow-hidden bg-muted">
            <Image src={"/drama-theater-performance.jpg"} alt={sessao.espetaculo.nome} fill className="object-cover" priority />
          </div>

          {/* sessao Details & Purchase */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-4">{sessao.espetaculo.nome}</h1>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{sessao?.data.toString()}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p>18:00</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p>{sessao.teatro.nome}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="mb-4">
                    <p className="text-2xl font-bold mb-1">
                     R$ {sessao.preco}
                    </p>
                  </div>

                  <Button size="lg" className="w-full">
                    Comprar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* sessao Description */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-2xl font-bold mb-4">Descrição do Evento</h2>
          <div className="text-muted-foreground whitespace-pre-line leading-relaxed">{sessao.espetaculo.descricao}</div>
        </div>
        </>}
      </main>

    </div>
  )
}