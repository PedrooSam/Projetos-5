import { FestivalHeader } from '@/components/festival-header'
import { FestivalHero } from '@/components/festival-hero'
import { EventCategory } from '@/components/event-category'
import { FestivalFooter } from '@/components/festival-footer'

const comedyEvents = [
  {
    id: 1,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/theatrical-performance-poster.jpg'
  },
  {
    id: 2,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/comedy-theater-poster.jpg'
  },
  {
    id: 3,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/brazilian-circus-performance.jpg'
  }
]

const dramaEvents = [
  {
    id: 4,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/drama-theater-performance.jpg'
  },
  {
    id: 5,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/dramatic-stage-play.jpg'
  },
  {
    id: 6,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/theatrical-drama.jpg'
  }
]

const musicalEvents = [
  {
    id: 7,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/musical-theater-performance.jpg'
  },
  {
    id: 8,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/broadway-musical-show.jpg'
  },
  {
    id: 9,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/musical-stage-performance.jpg'
  }
]

const completeEvents = [
  {
    id: 10,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/dance-performance-brasil.jpg'
  },
  {
    id: 11,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/contemporary-dance-show.jpg'
  },
  {
    id: 12,
    title: 'Grupo Corpo - Piracema',
    date: '21 OUT > 22 OUT',
    venue: 'Teatro Paulo Pontes, João Pessoa - PB',
    image: '/brazilian-festival-performance.jpg'
  }
]

export default function FestivalPage() {
  return (
    <div className="min-h-screen">
      <FestivalHeader />
      <FestivalHero />
      
      <main className="container mx-auto px-4 py-12 space-y-16">
        <EventCategory 
          title="Comédia"
          events={comedyEvents}
        />
        
        <EventCategory 
          title="Drama"
          events={dramaEvents}
        />
        
        <EventCategory 
          title="Musical"
          events={musicalEvents}
        />
        
        <EventCategory 
          title="Programação completa"
          events={completeEvents}
        />
      </main>
      
      <FestivalFooter />
    </div>
  )
}
