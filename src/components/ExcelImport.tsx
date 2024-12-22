import React, { useState } from "react";
import * as XLSX from "xlsx";
import DisplayExcelData from "./DisplayExcelData";
import { ExcelData } from "./types"; // Import your ExcelData type from types.ts
import { log } from "console";

const ExcelImport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const [tempData, setTempData] = useState<any[]>([]); // tempData to pass to DisplayExcelData
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  interface ExcelData {
    [key: string]: any; // This allows the data to be flexible based on headers.
  }

  const readExcelFile = async (): Promise<void> => {
    try {
      if (!file) {
        setError("Please select an Excel file to upload.");
        return;
      }

      setLoading(true);
      setError("");

      const reader = new FileReader();

      // Wrapping the reader's onload in a promise for async handling
      const fileData = await new Promise<ArrayBuffer>((resolve, reject) => {
        reader.onload = (e) => {
          const data = e.target?.result;
          if (data) {
            resolve(data as ArrayBuffer);
          } else {
            reject("Error reading file");
          }
        };
        reader.onerror = (err) => {
          reject(err);
        };

        reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
      });

      // Now that we have the file data, process it with XLSX
      const workbook = XLSX.read(fileData, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Use the first sheet
      const sheet = workbook.Sheets[sheetName];

      // Parse the sheet into JSON data
      const jsonData: ExcelData[] = XLSX.utils.sheet_to_json(sheet, {
        header: 1, // Use the first row as headers
        defval: "", // Set a default empty value for missing fields
      });

      console.log("Parsed Excel Data:", jsonData); // Debugging log

      // Extract headers from the first row
      const headers = jsonData[0];

      // Map the data from the second row onwards (skip the header)
      const structuredData = jsonData.slice(1).map((row) => {
        const rowObject: ExcelData = {};

        headers.forEach((header: string | number, index: string | number) => {
          // Only add rows with data, skipping empty or undefined fields
          if (
            row[index] !== undefined &&
            row[index] !== null &&
            row[index] !== ""
          ) {
            rowObject[header] = row[index];
          }
        });

        return rowObject;
      });

      // Filter out empty rows (where all values are empty)
      const filteredData = structuredData.filter((row) =>
        Object.values(row).some((value) => value !== "")
      );

      console.log("Filtered Data:", filteredData); // Debugging log

      // Set filtered data into state (or pass it to a handler)
      setTempData(filteredData); // Assuming you have a setTempData function
      setExcelData(filteredData); // Optionally, keep the original data in state
    } catch (err) {
      console.error("Error reading file:", err);
      setError("There was an error processing the file.");
    } finally {
      setLoading(false); // Assuming setLoading exists to control loading state
    }
  };

  // You can now call readExcelFile without passing a file as an argument
  // For example, trigger it when a file is selected:
  // document.querySelector('#file-input')?.addEventListener('change', () => readExcelFile());

  // You can use this function when an Excel file is selected
  // For example:
  // readExcelFile(file);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Import Excel File</h2>

      <div className="mb-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="mb-2"
        />
        <button
          onClick={readExcelFile}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Import"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Display the imported data if available */}
      {tempData.length > 0 ? (
        <DisplayExcelData data={tempData} />
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default ExcelImport;
