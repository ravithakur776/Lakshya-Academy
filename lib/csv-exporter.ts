/**
 * Helper utility to export any array of records as a downloadable CSV file
 */
export function exportToCsv(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) {
    alert("No data available to export.");
    return;
  }

  const separator = ",";
  const keys = Object.keys(rows[0]);
  
  const csvHeader = keys.join(separator);
  const csvRows = rows.map((row) => {
    return keys
      .map((key) => {
        let cell = row[key] === null || row[key] === undefined ? "" : row[key];
        cell = cell instanceof Date ? cell.toLocaleString() : String(cell);
        cell = cell.replace(/"/g, '""');
        if (cell.search(/("|,|\n)/g) >= 0) {
          cell = `"${cell}"`;
        }
        return cell;
      })
      .join(separator);
  });

  const csvContent = [csvHeader, ...csvRows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
