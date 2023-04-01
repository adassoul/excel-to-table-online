import React, { useState } from "react";
import {read, utils} from "xlsx";
import "./ExcelToTable.css";

function ExcelToTable() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = read(binaryData, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const parsedData = utils.sheet_to_json(worksheet, { header: 1 });
      setData(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="container">
      <h1 className="title">Excel to Table</h1>
      <div className="upload-wrapper">
        <input
          type="file"
          id="upload-file"
          onChange={handleFileUpload}
          accept=".xlsx"
        />
        <label htmlFor="upload-file">Choose a file</label>
      </div>
      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {data[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExcelToTable;
