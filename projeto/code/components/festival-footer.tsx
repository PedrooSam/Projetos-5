export function FestivalFooter() {
  return (
    <footer className="bg-muted mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Programação Completa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Suporte
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Ajuda</h3>
            <p className="text-sm text-muted-foreground">
              ajuda.com.br
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
