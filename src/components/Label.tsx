// src/components/Label.tsx

import React from "react";

interface LabelProps {
  data: any;
}

const Label: React.FC<LabelProps> = ({ data }) => (
  <div className="p-4 border border-gray-300 rounded-md shadow-md">
    <div><strong>Doc No:</strong> {data.doc_no}</div>
    <div><strong>Item Code:</strong> {data.item_code}</div>
    <div><strong>Description:</strong> {data.item_des}</div>
    <div><strong>Batch No:</strong> {data.batch_no}</div>
    <div><strong>Exp Date:</strong> {data.exp_date}</div>
    <div><strong>Quantity:</strong> {data.quantity}</div>
  </div>
);

export default Label;
