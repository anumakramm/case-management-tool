import React, { useState } from 'react';
import './ProductManagerDashboard.css'; // Make sure this line is present

const ProductManagerDashboard = () => {
  const [cases, setCases] = useState([
    { id: 1, title: "Case 001", assignedTo: "John Doe" },
    { id: 2, title: "Case 002", assignedTo: null },
    { id: 3, title: "Case 003", assignedTo: "Jane Smith" },
    { id: 4, title: "Case 004", assignedTo: "John Wick" }, // More cases for scrolling
    { id: 5, title: "Case 005", assignedTo: "Sarah Connor" },
    { id: 6, title: "Case 006", assignedTo: "Unassigned" },
    { id: 7, title: "Case 007", assignedTo: "Tony Stark" },
    { id: 8, title: "Case 008", assignedTo: "Tony Stark" },
    { id: 9, title: "Case 009", assignedTo: "Tony Stark" },
    { id: 10, title: "Case 010", assignedTo: "Tony Stark" },
    { id: 11, title: "Case 011", assignedTo: "Tony Stark" },
    { id: 12, title: "Case 012", assignedTo: "Tony Stark" },
  ]);

  return (
    <div className="dashboard-container">
      <h2>Product Manager Dashboard</h2>
      <div className="scrollable-table-container">
        <table>
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
    </div>
  );
};

export default ProductManagerDashboard;
