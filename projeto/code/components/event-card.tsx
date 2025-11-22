import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Event {
  id: number
  title: string
  date: string
  venue: string
  image: string
}

interface EventCardProps {
  event: Event
  className?: string
}

export function EventCard({ event, className }: EventCardProps) {
  return (
    <Link href={`/evento/${event.id}`}>
      <Card
        className={`flex-shrink-0 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group ${className || "w-[280px]"}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{event.title}</h3>
          <p className="text-sm text-primary font-medium mb-2">{event.date}</p>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{event.venue}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
