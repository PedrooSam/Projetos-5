import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sessao } from "@/lib/services/sessoes-service"
import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface SessaoCardProps {
  sessao: Sessao
  className?: string
}

export function SessaoCard({ sessao, className }: SessaoCardProps) {

  return (
    <Link href={`/evento/${sessao.id}`} className="hover:scale-105 hover:transition-transform hover:duration-300 rounded-2xl p-4">
      <Card
        className={`flex-shrink-0 pt-0 bg-foreground overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${className || "w-[25vw]"}`}
      >
        <Image
          src={"/placeholder.svg"}
          alt={sessao.espetaculo.nome || "n/a"}
          width={500}
          height={300}
          className="relative bg-muted object-cover"
        />
        <CardContent className="p-4">
          <h3 className="font-semibold text-primary mb-2 line-clamp-1">{sessao.espetaculo.grupo} - {sessao.espetaculo.nome}</h3>
          <p className="text-sm text-primary font-medium mb-2">{"21 > 22 de Outubro"}</p>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{sessao.teatro.nome}, {sessao.teatro.endereco.cidade} - {sessao.teatro.endereco.estado}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
