import React, { useState, useRef } from 'react';
import Label from './Label'; // Assuming Label component is implemented

type DisplayExcelDataProps = {
  data: any[];
};

const DisplayExcelData: React.FC<DisplayExcelDataProps> = ({ data }) => {
  const [selectedRowData, setSelectedRowData] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const printSectionRef = useRef<HTMLDivElement>(null);

  const handleGenerateLabel = (row: any) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

  const handlePrintLabel = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow && printSectionRef.current) {
      printWindow.document.write('<html><head><title>Print Label</title></head><body>');
      printWindow.document.write(printSectionRef.current.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-base table-auto border-collapse">
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
            <th className="px-4 py-2 border">Action</th>
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
              <td className="px-4 py-2 border">
                <button onClick={() => handleGenerateLabel(row)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Label
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Label Preview</h2>
              <button onClick={handleCloseModal} className="text-red-500 font-bold">Close</button>
            </div>
            <div ref={printSectionRef}>
              {selectedRowData && <Label data={selectedRowData} />}
            </div>
            <div className="mt-4 text-center">
              <button onClick={handlePrintLabel} className="bg-blue-500 text-white p-2 rounded-md">
                Print Label
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayExcelData;
