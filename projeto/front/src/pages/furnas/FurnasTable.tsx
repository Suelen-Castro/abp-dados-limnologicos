import React, { useState, useEffect, useMemo, useCallback } from "react";

// --- CONFIGURAÇÃO DA PALETA DE CORES (UNIFICADA) ---
// Primary: #1777af (Azul)
// Secondary: #FFA500 (Laranja)
// Background: #F3F7FB (Cinza Claro)
// Card BG: #FFFFFF (Branco)

// =========================================================================
// SIMULAÇÃO DE TIPOS E HOOKS (Para compilação no Canvas)
// Estes hooks simulam a busca de metadados (campanhas, sítios, tabelas) e dados.
// =========================================================================

// Tipos SIMULADOS
interface Meta {
  id: string;
  rotulo: string;
  dataInicio?: string;
  dataFim?: string;
}

interface HoribaRegistro {
  idHoriba: number;
  dataMedida: string;
  horaMedida: string;
  idCampanha: string;
  idSitio: string;
  profundidade: number | null;
  tempagua: number | null;
  condutividade: number | null;
  ph: number | null;
  _do: number | null;
  tds: number | null;
  redox: number | null;
  turbidez: number | null;
}

interface FurnasResponse {
  data: HoribaRegistro[]; // Usando HoribaRegistro como tipo padrão para o mock
  totalRecords: number;
  totalPages: number;
}

interface TableHeader {
  key: keyof HoribaRegistro | string; // keyof Type or general string for dynamic use
  label: string;
  format?: (value: any) => string;
}

// ------------------------------------
// Mock de Metadados
// ------------------------------------
const useFurnasMeta = () => {
  const meta: { tabelas: Meta[], campanhas: Meta[], sitios: Meta[] } = useMemo(() => ({
    tabelas: [
      { id: "tbhoriba", rotulo: "Horiba (Sonda Multi-Parâmetros)" },
      { id: "tbfluxodifusivo", rotulo: "Fluxo Difusivo" },
      { id: "tbcarbono", rotulo: "Compostos de Carbono" },
      { id: "tbconcentracaogasagua", rotulo: "Concentração de Gás (Água)" },
    ],
    campanhas: [
      { id: "C1", rotulo: "Campanha 2023 - Outono", dataInicio: "2023-03-01", dataFim: "2023-05-31" },
      { id: "C2", rotulo: "Campanha 2024 - Inverno", dataInicio: "2024-06-01", dataFim: "2024-08-31" },
    ],
    sitios: [
      { id: "S-1", rotulo: "Sítio 1 - Margem Direita" },
      { id: "S-2", rotulo: "Sítio 2 - Centro do Reservatório" },
      { id: "S-3", rotulo: "Sítio 3 - Perto da Barragem" },
    ],
  }), []);

  return { data: meta, loading: false, error: null };
};

// ------------------------------------
// Mock de Dados
// ------------------------------------
const useFurnasData = () => {
  const [data, setData] = useState<FurnasResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async ({ page, limit, idCampanha, idSitio, tableType, inicio, fim }: { page: number, limit: number, idCampanha: string, idSitio: string, tableType: string, inicio: string, fim: string }) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 600)); // Simula delay
      
      let mockData: HoribaRegistro[] = [];

      // Dados mock baseados em tbhoriba (padrão)
      if (tableType === "tbhoriba") {
        mockData = Array.from({ length: 35 }, (_, i) => ({
          idHoriba: 1000 + i,
          dataMedida: new Date(new Date('2023-05-15').getTime() + i * 86400000).toISOString().split('T')[0],
          horaMedida: (10 + i % 10).toString().padStart(2, '0') + ':00:00',
          idCampanha: ['C1', 'C2'][i % 2],
          idSitio: ['S-1', 'S-2', 'S-3'][i % 3],
          profundidade: i % 5 * 0.5,
          tempagua: 20 + i * 0.1,
          condutividade: 150 + i * 2,
          ph: 6.5 + i * 0.05,
          _do: 7.0 - i * 0.1,
          tds: 90 + i * 2.5,
          redox: 100 + i * 5,
          turbidez: 15 + i * 0.5,
        }));
      } else {
        // Mock simples para outros tipos de tabela
        mockData = Array.from({ length: 10 }, (_, i) => ({
            idHoriba: i, dataMedida: '2024-01-01', horaMedida: '12:00:00',
            idCampanha: 'N/A', idSitio: 'N/A', profundidade: null, tempagua: null, condutividade: null, ph: null, _do: null, tds: null, redox: null, turbidez: null,
        }));
      }


      const totalRecords = mockData.length;
      const totalPages = Math.ceil(totalRecords / limit);
      const startIndex = (page - 1) * limit;
      const paginatedData = mockData.slice(startIndex, startIndex + limit);

      setData({
        data: paginatedData,
        totalRecords,
        totalPages
      });
      
    } catch (e) {
      setError("Falha ao carregar dados FURNAS (Mock Error).");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};


// =========================================================================
// FUNÇÕES AUXILIARES
// =========================================================================

// Formatação da Data/Hora unificada
const formatDateTime = (date: string, time: string) => {
    try {
        const d = date.split('-');
        const t = time.split(':');
        // DD/MM/AAAA HH:MM
        return `${d[2]}/${d[1]}/${d[0].slice(2)} ${t[0]}:${t[1]}`;
    } catch {
        return 'Data Inválida';
    }
};

// =========================================================================
// COMPONENTE PRINCIPAL: FurnasPage
// =========================================================================

function FurnasPage() {
  const [page, setPage] = useState(1);
  const [tableType, setTableType] = useState<string>("tbhoriba"); // Tabela padrão
  const [idCampanha, setIdCampanha] = useState<string>("C1");
  const [idSitio, setIdSitio] = useState<string>("S-2");
  const [dataInicio, setDataInicio] = useState<string>("2023-01-01");
  const [dataFim, setDataFim] = useState<string>("2024-12-31");
  const [tituloTabela, setTituloTabela] = useState<string>("");

  const { data: metaData, loading: loadingMeta } = useFurnasMeta();
  const { data, loading, error, fetchData } = useFurnasData();

  // Define os cabeçalhos da tabela dinamicamente com base no tipo de tabela selecionada
  const columnHeaders: TableHeader[] = useMemo(() => {
    // Nota: Em um aplicativo real, essa lógica de headers seria baseada
    // na tabela real selecionada, mas aqui usamos o mock de Horiba
    if (tableType === "tbhoriba") {
      return [
        { key: 'datahora', label: 'Data/Hora', format: (row: HoribaRegistro) => formatDateTime(row.dataMedida, row.horaMedida) },
        { key: 'idCampanha', label: 'Campanha' },
        { key: 'idSitio', label: 'Sítio' },
        { key: 'profundidade', label: 'Prof. (m)' },
        { key: 'tempagua', label: 'T. Água (ºC)' },
        { key: 'condutividade', label: 'Cond. (µS/cm)' },
        { key: 'ph', label: 'pH' },
        { key: '_do', label: 'DO (mg/L)' },
        { key: 'tds', label: 'TDS (mg/L)' },
        { key: 'redox', label: 'Redox (mV)' },
        { key: 'turbidez', label: 'Turbidez (NTU)' },
      ];
    }
    
    // Fallback/Placeholder para outras tabelas
    return [
      { key: 'datahora', label: 'Data/Hora', format: (row: HoribaRegistro) => formatDateTime(row.dataMedida, row.horaMedida) },
      { key: 'idCampanha', label: 'Campanha' },
      { key: 'idSitio', label: 'Sítio' },
      { key: 'placeholder', label: `Dados de ${tableType}` },
    ];
  }, [tableType]);

  const handleFetch = useCallback(async (newPage = page) => {
    await fetchData({
      page: newPage,
      limit: 10,
      idCampanha,
      idSitio,
      tableType,
      inicio: dataInicio,
      fim: dataFim,
    });
    setPage(newPage);
    
    // Atualiza o título
    const tabela = metaData?.tabelas.find(t => t.id === tableType);
    if (tabela) {
      setTituloTabela(` - ${tabela.rotulo}`);
    } else {
        setTituloTabela('');
    }
  }, [fetchData, idCampanha, idSitio, tableType, dataInicio, dataFim, metaData, page]);

  // Busca inicial e atualização do título da tabela
  useEffect(() => {
    if (metaData) {
      handleFetch(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaData]); 
  
  // Função de reset da página e busca ao mudar filtros
  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setPage(1); // Volta para a primeira página ao mudar qualquer filtro
  };

  const getPropValue = (row: HoribaRegistro, key: string) => {
    if (key === 'datahora') return (row as any).dataMedida + ' ' + (row as any).horaMedida;
    return (row as any)[key] ?? "-";
  };
  
  return (
    <div className="min-h-screen bg-[#F3F7FB] p-4 sm:p-8 font-sans">
      <div className="max-w-full mx-auto">
        
        {/* Título da Página (Unified Style) */}
        <header className="mb-8 pt-4">
          <h1 className="text-4xl font-extrabold text-[#1777af] mb-2">
            Dados FURNAS
            <span className="text-gray-600 font-semibold">{tituloTabela}</span>
          </h1>
          <div className="h-1 w-20 bg-[#FFA500] rounded-full mt-2"></div>
        </header>

        {/* Contêiner de Filtros (Unified Style) */}
        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 items-center bg-white p-4 md:p-6 rounded-xl shadow-lg">
          
          {loadingMeta && <p className="text-gray-500">Carregando metadados...</p>}

          {/* Select de Tabela */}
          {!loadingMeta && metaData?.tabelas.length && (
            <div className="flex items-center space-x-3">
              <label className="text-gray-700 font-medium whitespace-nowrap">Tabela:</label>
              <select
                value={tableType}
                onChange={(e) => handleFilterChange(setTableType, e.target.value)}
                className="p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#1777af] focus:border-[#1777af] transition duration-150 shadow-sm"
              >
                {metaData.tabelas.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.rotulo}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Select de Campanha */}
          {!loadingMeta && metaData?.campanhas.length && (
            <div className="flex items-center space-x-3">
              <label className="text-gray-700 font-medium whitespace-nowrap">Campanha:</label>
              <select
                value={idCampanha}
                onChange={(e) => handleFilterChange(setIdCampanha, e.target.value)}
                className="p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#1777af] focus:border-[#1777af] transition duration-150 shadow-sm"
              >
                {metaData.campanhas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.rotulo}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Select de Sítio */}
          {!loadingMeta && metaData?.sitios.length && (
            <div className="flex items-center space-x-3">
              <label className="text-gray-700 font-medium whitespace-nowrap">Sítio:</label>
              <select
                value={idSitio}
                onChange={(e) => handleFilterChange(setIdSitio, e.target.value)}
                className="p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#1777af] focus:border-[#1777af] transition duration-150 shadow-sm"
              >
                {metaData.sitios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.rotulo}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Intervalo de datas */}
          <div className="flex items-center space-x-3">
            <label className="text-gray-700 font-medium whitespace-nowrap">Início:</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => handleFilterChange(setDataInicio, e.target.value)}
              className="p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#1777af] focus:border-[#1777af] transition duration-150 shadow-sm"
            />
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-gray-700 font-medium whitespace-nowrap">Fim:</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => handleFilterChange(setDataFim, e.target.value)}
              className="p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#1777af] focus:border-[#1777af] transition duration-150 shadow-sm"
            />
          </div>
          

          {/* Botão de busca */}
          <button 
            onClick={() => handleFetch(1)}
            disabled={loading || loadingMeta}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-[#FFA500] rounded-lg shadow-md hover:bg-[#ffb020] transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait"
          >
            {loading ? 'Buscando...' : 'Obter Dados'}
          </button>
        </div>

        {/* Exibição dos Dados */}
        {loading && <div className="text-center py-12"><p className="text-[#1777af] font-semibold text-lg">Carregando registros de {tableType}...</p></div>}
        {error && <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md"><p>{error}</p></div>}

        {!loading && data && (
          <>
            <div className="bg-white rounded-xl shadow-2xl overflow-x-auto border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#1777af] shadow-md">
                  <tr>
                    {columnHeaders.map((col) => (
                      <th
                        key={col.key}
                        className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data.data.map((row) => (
                    <tr key={getPropValue(row, 'idHoriba')} className="hover:bg-[#F3F7FB] transition-colors duration-150">
                      {columnHeaders.map((col) => {
                        // Use a função de formatação ou o valor da propriedade
                        const displayValue = col.format 
                            ? col.format(row) 
                            : getPropValue(row, col.key as string);
                        
                        return (
                          <td
                            key={col.key}
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                          >
                            {displayValue}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {data.data.length === 0 && (
                    <tr>
                      <td colSpan={columnHeaders.length} className="px-4 py-4 text-center text-gray-500">
                        Nenhum registro encontrado para a seleção atual.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
              <span className="text-sm text-gray-600 mb-2 sm:mb-0">
                Página {page} de {data.totalPages}. Total de {data.totalRecords} registros.
              </span>
              <div className="flex space-x-3">
                <button
                  disabled={page === 1 || loading}
                  onClick={() => handleFetch(page - 1)}
                  className="px-4 py-2 text-sm font-medium text-[#1777af] bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F3F7FB] transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Anterior
                </button>
                <button
                  disabled={page === data.totalPages || loading}
                  onClick={() => handleFetch(page + 1)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1777af] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1777af]/90 transition-colors shadow-sm"
                >
                  Próxima
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FurnasPage;