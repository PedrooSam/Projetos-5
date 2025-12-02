import api, { type HttpResponse, type Pager } from "../axios";
import { type Evento, eventoService } from "./eventos-service";
import { type Teatro, teatroService } from "./teatro-service";

export interface SessaoDTO {
	id: number;
	preco: number;
	espetaculo: string;
	teatro: string;
	data: Date;
}

export interface Sessao {
	id: number;
	preco: number;
	espetaculo: Evento;
	teatro: Teatro;
	data: Date;
}

class SessaoService {
	async getAllSessoes(pages: string): Promise<HttpResponse<Pager<Sessao>>> {
		const sessoesDTO: HttpResponse<Pager<SessaoDTO>> = await api.get(
			`/sessoes?page=${pages}`,
		);

		return this.mapearListaDTOtoListaObjeto(sessoesDTO.data).then(
			(response) => {
				return {
					data: response,
					status: sessoesDTO.status,
				};
			},
		);
	}

	async getSessaoById(id: string): Promise<Sessao> {
		const sessaoDTO: HttpResponse<SessaoDTO> = await api
			.get(`/sessoes/${id}/`)

		return this.mapearDTOtoObjeto(sessaoDTO.data).then((response) => response);
	}

	async mapearListaDTOtoListaObjeto(
		listaSessaoDTO: Pager<SessaoDTO>,
	): Promise<Pager<Sessao>> {
		const results = await Promise.all(
			listaSessaoDTO.results.map(async (dto) => {
				return {
					id: dto.id,
					preco: dto.preco,
					data: dto.data,
					espetaculo: await eventoService.getEventoById(dto.espetaculo),
					teatro: await teatroService.getTeatroById(dto.teatro),
				};
			}),
		);

		return {
			count: listaSessaoDTO.count,
			results,
		};
	}

	async mapearDTOtoObjeto(dto: SessaoDTO): Promise<Sessao> {
		const sessao: Sessao = {
			id: dto.id,
			preco: dto.preco,
			data: dto.data,
			espetaculo: await eventoService.getEventoById(dto.espetaculo),
			teatro: await teatroService.getTeatroById(dto.teatro),
		};

		return sessao;
	}
}

export const sessaoService = new SessaoService();
