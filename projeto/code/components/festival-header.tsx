import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal } from 'lucide-react'

export function FestivalHeader() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Pesquisar eventos" 
                className="pl-10"
              />
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Programação
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Ingressos
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Sobre
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
