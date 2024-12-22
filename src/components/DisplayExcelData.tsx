// DisplayExcelData.tsx

import React from 'react';

type DisplayExcelDataProps = {
  data: any[]; // Data passed from ExcelImport component
};

const DisplayExcelData: React.FC<DisplayExcelDataProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Doc No</th>
            <th className="px-4 py-2 border">Doc Date</th>
            <th className="px-4 py-2 border">Item Code</th>
            <th className="px-4 py-2 border">Item Description</th>
            <th className="px-4 py-2 border">Batch No</th>
            <th className="px-4 py-2 border">MFG Date</th>
            <th className="px-4 py-2 border">Exp Date</th>
            <th className="px-4 py-2 border">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{row.doc_no}</td>
              <td className="px-4 py-2 border">{row.doc_date}</td>
              <td className="px-4 py-2 border">{row.item_code}</td>
              <td className="px-4 py-2 border">{row.item_des}</td>
              <td className="px-4 py-2 border">{row.batch_no}</td>
              <td className="px-4 py-2 border">{row.mfg_date}</td>
              <td className="px-4 py-2 border">{row.exp_date}</td>
              <td className="px-4 py-2 border">{row.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayExcelData;
