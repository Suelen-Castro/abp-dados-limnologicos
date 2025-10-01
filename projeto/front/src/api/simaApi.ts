import axios from "axios";
import type { PaginatedResponse, Sima } from "../types/sima";
import type { Estacao, EstacaoResponse } from "../types/estacao";

// Monta a URL com a porta do backend vinda do compose
const VITE_SERVER = import.meta.env.VITE_SERVER || "http://localhost:3003";

export const getSima = async (
  page: number = 1,
  limit: number = 20,
  idestacao: string = "32445",
  inicio: string,
  fim: string,
): Promise<PaginatedResponse<Sima>> => {
  const response = await axios.get<PaginatedResponse<Sima>>(
    `${VITE_SERVER}/sima/sima/porestacao?page=${page}&limit=${limit}&idestacao=${idestacao}&inicio=${inicio}&fim=${fim}`,
  );
  return response.data;
};

export const getEstacao = async (): Promise<EstacaoResponse<Estacao>> => {
  const response = await axios.get<EstacaoResponse<Estacao>>(`${VITE_SERVER}/sima/sima/estacoes`);
  return response.data;
};
