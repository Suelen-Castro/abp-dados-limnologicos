// app/front/src/hooks/useEstacao.ts
import { useEffect, useState } from "react";
import { getEstacao } from "../api/simaApi";
import type { Estacao, EstacaoResponse } from "../types/estacao";

export const useEstacao = () => {
  const [data, setData] = useState<Estacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getEstacao()
      .then((res: EstacaoResponse<Estacao>) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Erro ao buscar estações");
      })
      .finally(() => setLoading(false));
  }, []); // só roda no mount

  return { data, loading, error };
};
