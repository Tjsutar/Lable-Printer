import React, { useState } from "react";
import * as XLSX from "xlsx";

interface ExcelRow {
  [key: string]: any;
}

const ExcelImport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [tempData, setTempData] = useState<ExcelRow[]>([]); // Array of row objects
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null); // Track hovered row
  const [selectedRow, setSelectedRow] = useState<ExcelRow | null>(null); // Track selected row for detailed display
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility state

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setError("Please upload a valid Excel (.xlsx) file.");
        return;
      }
      setFile(file);
      setError("");
    }
  };

  const readExcelFile = async (): Promise<void> => {
    try {
      if (!file) {
        setError("Please select an Excel file to upload.");
        return;
      }

      setLoading(true);
      setError("");

      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const fileData = reader.result as ArrayBuffer;
        const workbook = XLSX.read(fileData, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData: any[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1, // Use the first row as headers
          defval: "", // Default empty value for missing fields
        });

        const headers = jsonData[0] as string[];
        const structuredData: ExcelRow[] = jsonData.slice(1).map((row: any[]) => {
          const rowObject: ExcelRow = {};

          headers.forEach((header: string, index: number) => {
            if (row[index] !== undefined && row[index] !== null && row[index] !== "") {
              rowObject[header] = row[index];
            }
          });

          return rowObject;
        });

        const filteredData = structuredData.filter((row) =>
          Object.values(row).some((value) => value !== "")
        );

        setTempData(filteredData);
      };

      reader.onerror = (err) => {
        console.error("File read error:", err);
        setError("There was an error reading the file.");
        setLoading(false);
      };
    } catch (err) {
      console.error("Error reading file:", err);
      setError("There was an error processing the file.");
    } finally {
      setLoading(false);
    }
  };

  // Handle row click to set the selected row and open the modal
  const handleRowClick = (row: ExcelRow) => {
    setSelectedRow(row); // Set the selected row for detailed display
    setIsModalOpen(true); // Open the modal
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Handle the print functionality for the selected row
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=600,height=400");
    const printContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; background-color: #f4f6f9; margin: 0; }
            .modal-content { margin: 20px; }
            .row-details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .row-details span { font-weight: bold; font-size: 18px; color: #333; }
          </style>
        </head>
        <body>
          <div class="modal-content">
            <h3 style="font-size: 24px; font-weight: bold; color: #007BFF;">Selected Row Details</h3>
            <div class="row-details">
              ${Object.entries(selectedRow!).map(
                ([key, value]) => `
                  <div><span>${key}:</span> ${value}</div>
                `
              ).join('')}
            </div>
          </div>
        </body>
      </html>
    `;
    printWindow?.document.write(printContent);
    printWindow?.document.close();
    printWindow?.print();
  };
  

  // Handle the print functionality for all rows
  const handlePrintAll = () => {
    const printWindow = window.open("", "_blank", "width=600,height=400");
    const printContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; background-color: #f4f6f9; margin: 0; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th, .table td { padding: 8px; border: 1px solid #ccc; }
            .table th { background-color: #f2f2f2; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="table-container">
            <h3 style="color: #007BFF;">Imported Data</h3>
            <table class="table">
              <thead>
                <tr>
                  ${Object.keys(tempData[0]).map((header) => `<th>${header}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${tempData.map(row => `
                  <tr>
                    ${Object.values(row).map(cell => `<td>${cell}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;
    printWindow?.document.write(printContent);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <h2 className="text-3xl font-semibold text-white mb-6">Import Excel File</h2>

      <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="border p-2 rounded-md mb-4 w-full"
        />
        <div className="flex gap-4">
          <button
            onClick={readExcelFile}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Import"}
          </button>
          <button
            onClick={handlePrintAll}
            disabled={tempData.length === 0}
            className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md transition-all duration-300 disabled:opacity-50"
          >
            Print All
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Display the imported data if available */}
      {tempData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Table to display Excel data */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full  border-collapse">
              <thead>
                <tr>
                  {Object.keys(tempData[0]).map((header, index) => (
                    <th key={index} className="px-6 py-4 border bg-gray-200">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tempData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    onMouseEnter={() => setHoveredRow(rowIndex)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => handleRowClick(row)}
                    className={`cursor-pointer ${hoveredRow === rowIndex ? "bg-gray-100" : ""}`}
                  >
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 border">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No data to display</p>
      )}

      {/* Modal for selected row details */}
      {isModalOpen && selectedRow && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Selected Row Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedRow).map(([key, value], index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-bold">{key}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-6 py-2 rounded-md"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="bg-green-500 text-white px-6 py-2 rounded-md"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelImport;
