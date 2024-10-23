import React, { useState } from 'react';
import './ProductManagerDashboard.css'; // Ensure the CSS is still imported

const ProductManagerDashboard = () => {
  const [cases, setCases] = useState([
    { id: 1, title: "Case 001", assignedTo: "John Doe", client: "Client A" },
    { id: 2, title: "Case 002", assignedTo: null, client: "Client B" },
    { id: 3, title: "Case 003", assignedTo: "Jane Smith", client: "Client C" },
    { id: 4, title: "Case 004", assignedTo: "John Wick", client: "Client D" },
    { id: 5, title: "Case 005", assignedTo: "Sarah Connor", client: "Client E" },
    { id: 6, title: "Case 006", assignedTo: null, client: "Client F" },
    { id: 7, title: "Case 007", assignedTo: "Tony Stark", client: "Client G" },
    { id: 8, title: "Case 008", assignedTo: "Tony Stark", client: "Client H" },
    { id: 9, title: "Case 009", assignedTo: "Tony Stark", client: "Client I" },
    { id: 10, title: "Case 010", assignedTo: "Tony Stark", client: "Client J" },
    { id: 11, title: "Case 011", assignedTo: "Tony Stark", client: "Client K" },
    { id: 12, title: "Case 012", assignedTo: "Tony Stark", client: "Client L" },
  ]);

  // Available list of assignees
  const assignees = ["John Doe", "Jane Smith", "John Wick", "Sarah Connor", "Tony Stark"];

  // Handle case assignment update
  const handleAssigneeChange = (caseId, newAssignee) => {
    const updatedCases = cases.map((caseItem) =>
      caseItem.id === caseId ? { ...caseItem, assignedTo: newAssignee } : caseItem
    );
    setCases(updatedCases);
  };

  return (
    <div className="dashboard-container">
      <h2>Product Manager Dashboard</h2>
      <div className="scrollable-table-container">
        <table>
          <thead>
            <tr>
              <th className="id-column">Case ID</th> {/* Added class for width control */}
              <th>Case Title</th>
              <th>Client Name</th> {/* New Client Name column */}
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem.id}>
                <td className="id-column">{caseItem.id}</td> {/* Narrower Case ID column */}
                <td>{caseItem.title}</td>
                <td>{caseItem.client}</td> {/* Display Client Name */}
                <td>
                  <select
                    className={caseItem.assignedTo ? '' : 'unassigned'} // Apply 'unassigned' class if no assignee
                    value={caseItem.assignedTo || ""}
                    onChange={(e) => handleAssigneeChange(caseItem.id, e.target.value)}
                  >
                    <option value="" disabled>Select Assignee</option>
                    {assignees.map((assignee, index) => (
                      <option key={index} value={assignee}>
                        {assignee}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagerDashboard;
