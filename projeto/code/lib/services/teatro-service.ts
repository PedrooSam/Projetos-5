import api, { HttpResponse, Pager } from "../axios"

interface Endereco {
  id: number,
  rua: string,
  bairro: string,
  cidade: string,
  estado: string
}

export interface Teatro {
  id: number,
  nome: string,
  endereco: Endereco
}

class TeatroService {
  async getAllTeatros(pages: string): Promise<HttpResponse<Pager<Teatro>>> {
    return await api.get('/teatros?page='+ pages).then(response => {
      return response
    })
  }

  async getTeatroById(id: string): Promise<Teatro> {
    return await api.get(`/teatros/${id}/`).then(response => {
      return response.data
    })
  }
}

export const teatroService = new TeatroService()