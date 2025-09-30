import React from "react";

interface TableProps {
  data: Record<string, unknown>[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  if (data.length === 0) {
    return <p>Selecione uma tabela para visualizar os dados.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div style={styles.tableContainer}>
      <table style={styles.dataTable}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} style={styles.tableHeader}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={rowIndex % 2 === 0 ? styles.tableRowEven : undefined}
            >
              {headers.map((header) => (
                <td key={header} style={styles.tableCell}>
                  {String(row[header] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  tableContainer: {
    marginTop: "20px",
  },
  dataTable: {
    width: "80%",
    margin: "0 auto",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
  },
  tableHeader: {
    backgroundColor: "#1777af",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  tableCell: {
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  tableRowEven: {
    backgroundColor: "#f9f9f9",
  },
};

export default Table;

