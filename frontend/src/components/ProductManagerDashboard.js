// src/ProductManagerDashboard.js
import React, { useState } from 'react';

const ProductManagerDashboard = () => {
  // Sample data to display the cases
  const [cases, setCases] = useState([
    { id: 1, title: "Case 001", assignedTo: "John Doe" },
    { id: 2, title: "Case 002", assignedTo: null },  // Not yet assigned
    { id: 3, title: "Case 003", assignedTo: "Jane Smith" },
  ]);

  return (
    <div style={styles.container}>
      <h2>Product Manager Dashboard</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Case Title</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <tr key={caseItem.id}>
              <td>{caseItem.id}</td>
              <td>{caseItem.title}</td>
              <td>{caseItem.assignedTo ? caseItem.assignedTo : "Unassigned"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
  },
};

export default ProductManagerDashboard;
