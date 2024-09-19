import React, { useState } from 'react';
import Header from '../header/Header';
import * as XLSX from 'xlsx'; // Import xlsx for Excel reading
import Table from '@mui/material/Table'; // Material-UI table
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Geocoding.css';

const Geocoding = () => {
  const [excelData, setExcelData] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Extract data as a 2D array
      setExcelData(jsonData);
      setFileUploaded(true); // Enable the other buttons after file upload
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Header />
      <div className="container">
        <main>
          <h2 className="geocoding-title">Geocoding</h2>
          <img className="banner-image" src="/Images/banner_3.jpg" alt="Geocoding Process Banner" />
          <div className="button-group">
            <button className="button-3d">Download Data Template</button>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="upload-file"
            />
            <label htmlFor="upload-file" className="button-3d">
              Upload Data File
            </label>
            <button className="button-3d" disabled={!fileUploaded}>Validate Data</button>
            <button className="button-3d" disabled={!fileUploaded}>Run Geocode Process</button>
            <button className="button-3d" disabled={!fileUploaded}>Export Result</button>
          </div>

          {/* Render table only if data exists */}
          {excelData.length > 0 && (
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table aria-label="Excel Data Table">
                <TableHead>
                  <TableRow>
                    {excelData[0].map((col, index) => (
                      <TableCell key={index}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {excelData.slice(1).map((row, index) => (
                    <TableRow key={index}>
                      {row.map((cell, idx) => (
                        <TableCell key={idx}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </main>
      </div>
    </>
  );
};

export default Geocoding;
