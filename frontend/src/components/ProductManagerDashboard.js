import React, { useState } from 'react';
import './ProductManagerDashboard.css'; // External CSS for styling

const ProductManagerDashboard = () => {
  // Sample data to display the cases
  const [cases, setCases] = useState([
    { id: 1, title: "Case 001", assignedTo: "John Doe" },
    { id: 2, title: "Case 002", assignedTo: null },  // Not yet assigned
    { id: 3, title: "Case 003", assignedTo: "Jane Smith" },
    // Add more cases as needed
  ]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Product Manager Dashboard</h2>
      <div className="scrollable-container">
        <table className="case-table">
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
