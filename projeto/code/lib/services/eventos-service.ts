import { api, HttpResponse, Pager } from "../axios";

export interface Evento {
  id: number,
  nome: string,
  grupo: string,
  descricao: string,
  classificacao: string,
  categoria: string,
  image: string,
}

class EventoService {
  async getAllEventos(pages: string): Promise<HttpResponse<Pager<Evento>>> {
    return await api.get('/espetaculos?page='+ pages).then(response => {
      return response
    })
  }

  async getEventoById(id: string): Promise<Evento> {
    return await api.get(`/espetaculos/${id}/`).then(response => {
      return response.data
    })
  }
}

export const eventoService = new EventoService()