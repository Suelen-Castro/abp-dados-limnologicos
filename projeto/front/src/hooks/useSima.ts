import { useState, useCallback } from "react";
import { getSima } from "../api/simaApi";
import type { PaginatedResponse, Sima } from "../types/sima";

export const useSima = () => {
  const [data, setData] = useState<PaginatedResponse<Sima> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (params: {
      page: number;
      limit: number;
      idestacao: string;
      inicio: string;
      fim: string;
    }) => {
      setLoading(true);
      try {
        const res = await getSima(
          params.page,
          params.limit,
          params.idestacao,
          params.inicio,
          params.fim,
        );
        setData(res);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao buscar dados de Sima");
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { data, loading, error, fetchData };
};
