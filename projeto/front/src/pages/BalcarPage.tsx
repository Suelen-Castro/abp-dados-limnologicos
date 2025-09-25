import React, { useState } from "react";
import Papa from "papaparse";
import Table from "../components/Balcar/Table";

const BalcarPage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [data, setData] = useState<Record<string, unknown>[]>([]);

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTable(value);

    // Exemplo de dados mockados só para teste:
    if (value === "tabela1") {
      setData([
        { id: 1, nome: "Bruno", idade: 25 },
        { id: 2, nome: "Ana", idade: 30 },
      ]);
    } else if (value === "tabela2") {
      setData([
        { id: 1, cidade: "São Paulo", estado: "SP" },
        { id: 2, cidade: "Curitiba", estado: "PR" },
      ]);
    } else {
      setData([]);
    }
  };

  const handleExportCSV = () => {
    if (data.length === 0) return;

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedTable || "dados"}.csv`;
    link.click();
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.headerText}>Balcar Page</h1>
        <select value={selectedTable} onChange={handleTableChange} style={styles.tableSelect}>
          <option value="">Selecione uma tabela</option>
          <option value="tabela1">Tabela 1</option>
          <option value="tabela2">Tabela 2</option>
        </select>
        <button onClick={handleExportCSV} style={styles.exportBtn}>
          Exportar CSV
        </button>
      </header>

      <div style={styles.tableContainer}>
        <Table data={data} />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  app: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f3f7fb",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#1777af",
    color: "white",
    padding: "10px 0",
  },
  headerText: {
    marginBottom: "10px",
  },
  tableSelect: {
    padding: "8px",
    marginRight: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  exportBtn: {
    padding: "10px 15px",
    backgroundColor: "#ffa500",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  tableContainer: {
    marginTop: "20px",
  },
};

export default BalcarPage;

