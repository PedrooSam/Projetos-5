"use client"

import { FestivalHeader } from "@/components/festival-header"
import { FestivalHero } from "@/components/festival-hero"
import { SessaoCategory } from "@/components/sessao-category"
import { FestivalFooter } from "@/components/festival-footer"
import { Card } from "@/components/ui/card"
import { authService } from "@/lib/services/auth-service"
import { useEffect, useState } from "react"
import { Sessao, sessaoService } from "@/lib/services/sessoes-service"

export default function FestivalPage() {

  const [sessoes, setSessoes] = useState<Sessao[]>()

  useEffect(() => {
    const fetchSessoes = async () => {
      sessaoService.getAllSessoes("1").then(response => 
        setSessoes(response.data.results)
      )
    }

    fetchSessoes()
   
  }, [])

  const musicalSessoes = sessoes?.filter(s => s.espetaculo.categoria === "Musical")
  const dramaSessoes = sessoes?.filter(s => s.espetaculo.categoria === "Drama")
  const comediaSessoes = sessoes?.filter(s => s.espetaculo.categoria === "Comedia")
  const dancaSessoes = sessoes?.filter(s => s.espetaculo.categoria === "Dança")

  return (
    <div className="min-h-screen">
      <FestivalHeader />
      <FestivalHero />

      <main className="container mx-auto px-4 py-12 space-y-16">
        {comediaSessoes && comediaSessoes.length !== 0 && <SessaoCategory titulo="Comédia" sessoes={comediaSessoes} />}

        {dramaSessoes && dramaSessoes.length !== 0 &&<SessaoCategory titulo="Drama" sessoes={dramaSessoes} />}

        {musicalSessoes && musicalSessoes.length !== 0 &&  <SessaoCategory titulo="Musical" sessoes={musicalSessoes} />}

        {dancaSessoes && dancaSessoes.length !== 0 && <SessaoCategory titulo="Dança" sessoes={dancaSessoes} />}
      </main>

      <FestivalFooter />
    </div>
  )
}
