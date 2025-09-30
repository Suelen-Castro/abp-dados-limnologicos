import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSima } from "../hooks/useSima";
import { useEstacao } from "../hooks/useEstacao";

// Container principal da página
const PageContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 1.5rem;
  background-color: #f3f4f6;
`;

// Título
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
`;

// Tabela
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 0.85rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  white-space: nowrap;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }
`;

// Paginação
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#2563eb")};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#9ca3af" : "#1d4ed8")};
  }
`;

// Filtros
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #111827;
  font-size: 1rem;
  cursor: pointer;
`;

const DateInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #111827;
  font-size: 1rem;
  cursor: pointer;
`;

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yy} ${hh}:${min}`;
};

function SimaPage() {
  const [page, setPage] = useState(1);
  const [idestacao, setIdestacao] = useState<string>("32445"); // inicia com 32445
  const [dataInicio, setDataInicio] = useState<string>("2000-01-01");
  const [dataFim, setDataFim] = useState<string>("2020-01-01");
  const [tituloEstacao, setTituloEstacao] = useState<string>(""); // 🔹 título controlado

  const { data: estacoes, loading: loadingEstacoes, error: erroEstacoes } = useEstacao();
  const { data, loading, error, fetchData } = useSima();

  const estacaoSelecionada = estacoes.find((e) => e.idestacao === idestacao);
  const minDate = estacaoSelecionada?.inicio ? estacaoSelecionada.inicio.split("T")[0] : "";
  const maxDate = estacaoSelecionada?.fim ? estacaoSelecionada.fim.split("T")[0] : "";

  const handleFetch = async (newPage = page) => {
    await fetchData({
      page: newPage,
      limit: 10,
      idestacao,
      inicio: dataInicio,
      fim: dataFim,
    });
    setPage(newPage);

    // 🔹 atualiza título após a requisição concluir
    const est = estacoes.find((e) => e.idestacao === idestacao);
    if (est) {
      setTituloEstacao(` - ${est.rotulo}`);
    }
  };

  // 🔹 busca inicial ao montar a página
  useEffect(() => {
    handleFetch(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // executa só uma vez

  useEffect(() => {
    if (data && estacoes.length > 0) {
      const est = estacoes.find((e) => e.idestacao === idestacao);
      if (est) {
        setTituloEstacao(` - ${est.rotulo}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, estacoes]);

  return (
    <PageContainer>
      <Title>SIMA{tituloEstacao}</Title>

      <FilterContainer>
        {/* Select de estação */}
        {loadingEstacoes && <p>Carregando estações...</p>}
        {erroEstacoes && <p style={{ color: "red" }}>{erroEstacoes}</p>}
        {!loadingEstacoes && estacoes.length > 0 && (
          <label>
            Estação:{" "}
            <Select
              value={idestacao}
              onChange={(e) => {
                setIdestacao(e.target.value);
                setPage(1);
                // não muda o título aqui, só na requisição
              }}
            >
              {estacoes.map((est) => (
                <option key={est.idestacao} value={est.idestacao}>
                  {est.rotulo}
                </option>
              ))}
            </Select>
          </label>
        )}

        {/* Intervalo de datas */}
        {estacaoSelecionada && (
          <>
            <label>
              Data início:{" "}
              <DateInput
                type="date"
                min={minDate}
                max={maxDate || undefined}
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </label>
            <label>
              Data fim:{" "}
              <DateInput
                type="date"
                min={minDate}
                max={maxDate || undefined}
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </label>
          </>
        )}

        {/* Botão de busca */}
        <Button onClick={() => handleFetch(1)}>Obter</Button>
      </FilterContainer>

      {loading && <p>Carregando registros...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && data && (
        <>
          <Table>
            <thead>
              <tr>
                <Th>Data/Hora</Th>
                <Th>regno</Th>
                <Th>nofsamples</Th>
                <Th>proamag</Th>
                <Th>dirvt</Th>
                <Th>intensvt</Th>
                <Th>u_vel</Th>
                <Th>v_vel</Th>
                <Th>tempag1</Th>
                <Th>tempag2</Th>
                <Th>tempag3</Th>
                <Th>tempag4</Th>
                <Th>tempar</Th>
                <Th>ur</Th>
                <Th>tempar_r</Th>
                <Th>pressatm</Th>
                <Th>radincid</Th>
                <Th>radrefl</Th>
                <Th>bateria</Th>
                <Th>precipitacao</Th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((row) => (
                <Tr key={row.idsima}>
                  <Td>{formatDateTime(row.datahora)}</Td>
                  <Td>{row.regno ?? "-"}</Td>
                  <Td>{row.nofsamples ?? "-"}</Td>
                  <Td>{row.proamag ?? "-"}</Td>
                  <Td>{row.dirvt ?? "-"}</Td>
                  <Td>{row.intensvt ?? "-"}</Td>
                  <Td>{row.u_vel ?? "-"}</Td>
                  <Td>{row.v_vel ?? "-"}</Td>
                  <Td>{row.tempag1 ?? "-"}</Td>
                  <Td>{row.tempag2 ?? "-"}</Td>
                  <Td>{row.tempag3 ?? "-"}</Td>
                  <Td>{row.tempag4 ?? "-"}</Td>
                  <Td>{row.tempar ?? "-"}</Td>
                  <Td>{row.ur ?? "-"}</Td>
                  <Td>{row.tempar_r ?? "-"}</Td>
                  <Td>{row.pressatm ?? "-"}</Td>
                  <Td>{row.radincid ?? "-"}</Td>
                  <Td>{row.radrefl ?? "-"}</Td>
                  <Td>{row.bateria ?? "-"}</Td>
                  <Td>{row.precipitacao ?? "-"}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Button disabled={page === 1} onClick={() => handleFetch(page - 1)}>
              Anterior
            </Button>
            <span>
              Página {page} de {data.totalPages}
            </span>
            <Button disabled={page === data.totalPages} onClick={() => handleFetch(page + 1)}>
              Próxima
            </Button>
          </Pagination>
        </>
      )}
    </PageContainer>
  );
}

export default SimaPage;
