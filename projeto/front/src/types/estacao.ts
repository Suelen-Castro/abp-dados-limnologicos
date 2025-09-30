export interface Estacao {
  idestacao: string;
  rotulo: string;
  lat: number | null;
  lng: number | null;
  inicio: string | null;
  fim: string | null;
}

export interface EstacaoResponse<T> {
  success: boolean;
  data: T[];
}
