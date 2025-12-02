"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { type Sessao, sessaoService } from "@/lib/services/sessoes-service";
import Image from "next/image"


import "swiper/css";
import "swiper/css/pagination";

export default function SessaoCarousel() {
	const [sessoes, setSessoes] = useState<Sessao[]>();

	useEffect(() => {
		const fetchSessoes = async () => {
			sessaoService
				.getAllSessoes("1")
				.then((response) => setSessoes(response.data.results.slice(0, 5)));
		};

		fetchSessoes();
	}, []);

	return (
		<div className="w-full max-w-6xl mx-auto py-10">
			<Swiper
				spaceBetween={30}
				slidesPerView={1}
				pagination={true}
				modules={[Pagination]}
				className="mySwiper"
			>
				{/* SLIDE 01 */}
				{sessoes?.map((sessao) => (
						<SwiperSlide key={sessao.id}>
							<div className="bg-[#1a2337] rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
								{/* LADO ESQUERDO */}
								<div className="w-full md:w-1/3 bg-[#eef0e8] p-6 flex flex-col justify-between">
									<div>
										<h2 className="text-xl font-bold text-black">
											{sessao.espetaculo.nome}
										</h2>
										<p className="text-black mt-2 text-sm">
											{sessao.espetaculo.grupo}
										</p>

										<p className="text-black mt-4 font-semibold">
											{sessao.data?.toString() || "06 NOV"}
										</p>
										<p className="text-black text-sm">{sessao.teatro.nome}</p>
									</div>

									<div className="mt-10">
										<div className="w-20 h-20 bg-yellow-400 rounded-xl"></div>
									</div>
								</div>

								{/* IMAGEM CENTRAL */}
								<div className="w-full md:w-1/3">
									<Image
										src="/broadway-musical-show.jpg"
										alt="evento"
										className="w-full h-full object-cover"
										width="100"
										height="100"
									/>
								</div>

								{/* LADO DIREITO */}
								<div className="w-full md:w-1/3 p-10 flex flex-col justify-center text-white">
									<h2 className="text-3xl font-bold mb-4">
										{sessao.espetaculo.nome}
									</h2>

									<div className="flex items-center gap-2 text-gray-300">
										<span>📅</span>{" "}
										<span>{sessao.data?.toString() || "06 NOV"}</span>
									</div>

									<div className="flex items-center gap-2 text-gray-300 mt-2">
										<span>📍</span> <span>{sessao.teatro.nome}</span>
									</div>

									<Link
										href={`/evento/${sessao.id}`}
										className="mt-6 bg-white text-[#1a2337] rounded-lg px-4 py-2 font-semibold hover:opacity-80"
									>
										Ver Detalhes
									</Link>
								</div>
							</div>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
}
