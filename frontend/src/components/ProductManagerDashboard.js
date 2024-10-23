import React, { useState } from 'react';
import './ProductManagerDashboard.css'; // Ensure the CSS is still imported

const ProductManagerDashboard = () => {
  const [cases, setCases] = useState([
    { id: 1, title: "Case 001", assignedTo: "John Doe", client: "Client A", description: "Description for Case 001", status: "Open", startDate: "2024-01-01", endDate: "2024-01-31" },
    { id: 2, title: "Case 002", assignedTo: null, client: "Client B", description: "Description for Case 002", status: "Closed", startDate: "2024-02-01", endDate: "2024-02-28" },
    { id: 3, title: "Case 003", assignedTo: "Jane Smith", client: "Client C", description: "Description for Case 003", status: "Open", startDate: "2024-03-01", endDate: "2024-03-31" },
    { id: 4, title: "Case 004", assignedTo: "John Wick", client: "Client D", description: "Description for Case 004", status: "In Progress", startDate: "2024-04-01", endDate: "2024-04-30" },
    { id: 5, title: "Case 005", assignedTo: "Sarah Connor", client: "Client E", description: "Description for Case 005", status: "Open", startDate: "2024-05-01", endDate: "2024-05-31" },
    { id: 6, title: "Case 006", assignedTo: null, client: "Client F", description: "Description for Case 006", status: "Open", startDate: "2024-06-01", endDate: "2024-06-30" },
    { id: 7, title: "Case 007", assignedTo: "Tony Stark", client: "Client G", description: "Description for Case 007", status: "Closed", startDate: "2024-07-01", endDate: "2024-07-31" },
    { id: 8, title: "Case 008", assignedTo: "Tony Stark", client: "Client H", description: "Description for Case 008", status: "Open", startDate: "2024-08-01", endDate: "2024-08-31" },
    { id: 9, title: "Case 009", assignedTo: "Tony Stark", client: "Client I", description: "Description for Case 009", status: "Open", startDate: "2024-09-01", endDate: "2024-09-30" },
    { id: 10, title: "Case 010", assignedTo: "Tony Stark", client: "Client J", description: "Description for Case 010", status: "In Progress", startDate: "2024-10-01", endDate: "2024-10-31" },
    { id: 11, title: "Case 011", assignedTo: "Tony Stark", client: "Client K", description: "Description for Case 011", status: "Open", startDate: "2024-11-01", endDate: "2024-11-30" },
    { id: 12, title: "Case 012", assignedTo: "Tony Stark", client: "Client L", description: "Description for Case 012", status: "Closed", startDate: "2024-12-01", endDate: "2024-12-31" },
  ]);

  const assignees = ["John Doe", "Jane Smith", "John Wick", "Sarah Connor", "Tony Stark"];

  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAssigneeChange = (caseId, newAssignee) => {
    const updatedCases = cases.map((caseItem) =>
      caseItem.id === caseId ? { ...caseItem, assignedTo: newAssignee } : caseItem
    );
    setCases(updatedCases);
  };

  const handleRowClick = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null); // Clear selected case when closing modal
  };

  return (
    <div className="dashboard-container">
      <h2>Product Manager Dashboard</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="id-column">Case ID</th>
              <th>Case Title</th>
              <th>Client Name</th>
              <th>Assigned To</th>
            </tr>
          </thead>
        </table>
        <div className="scrollable-table-container">
          <table>
            <tbody>
              {cases.map((caseItem) => (
                <tr key={caseItem.id} onClick={() => handleRowClick(caseItem)} className="clickable-row">
                  <td className="id-column">{caseItem.id}</td>
                  <td>{caseItem.title}</td>
                  <td>{caseItem.client}</td>
                  <td>
                    <select
                      className={caseItem.assignedTo ? '' : 'unassigned'}
                      value={caseItem.assignedTo || ""}
                      onChange={(e) => handleAssigneeChange(caseItem.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
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

      {/* Modal for case details */}
      {isModalOpen && selectedCase && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Case Details</h2>
            <p><strong>Case ID:</strong> {selectedCase.id}</p>
            <p><strong>Title:</strong> {selectedCase.title}</p>
            <p><strong>Client:</strong> {selectedCase.client}</p>
            <p><strong>Assigned To:</strong> {selectedCase.assignedTo || "Not Assigned"}</p>
            <p><strong>Description:</strong> {selectedCase.description}</p>
            <p><strong>Status:</strong> {selectedCase.status}</p>
            <p><strong>Start Date:</strong> {selectedCase.startDate}</p>
            <p><strong>End Date:</strong> {selectedCase.endDate}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagerDashboard;