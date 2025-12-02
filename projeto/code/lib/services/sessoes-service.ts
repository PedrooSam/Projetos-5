import api, { HttpResponse, Pager } from "../axios";
import { Evento, eventoService } from "./eventos-service";
import { Teatro, teatroService } from "./teatro-service";

export interface SessaoDTO {
  id: number,
  preco: number,
  espetaculo: string,
  teatro: string
}

export interface Sessao {
  id: number,
  preco: number,
  espetaculo: Evento,
  teatro: Teatro
}

class SessaoService {
  async getAllSessoes(pages: string): Promise<HttpResponse<Pager<Sessao>>> {
    const sessoesDTO: HttpResponse<Pager<SessaoDTO>> = await api.get('/sessoes?page='+ pages)

    return this.mapearListaDTOtoListaObjeto(sessoesDTO.data).then(response => {
      return {
        data: response,
        status: sessoesDTO.status
      }
    })
  }

  async getSessoesById(id: string): Promise<Sessao> {
    return await api.get(`/sessoes/${id}/`).then(response => {
      return response.data
    })
  }

  async mapearListaDTOtoListaObjeto(listaSessaoDTO: Pager<SessaoDTO>): Promise<Pager<Sessao>> {
    const results = await Promise.all(
      listaSessaoDTO.results.map(async dto => {
        return {
          id: dto.id,
          preco: dto.preco,
          espetaculo: await eventoService.getEventoById(dto.espetaculo),
          teatro: await teatroService.getTeatroById(dto.teatro)
        };
      })
    );

    return {
      count: listaSessaoDTO.count,
      results
    };
  }
}

export const sessaoService = new SessaoService()