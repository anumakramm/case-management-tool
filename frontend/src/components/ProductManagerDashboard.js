import React, { useState } from 'react';
import './ProductManagerDashboard.css'; // Ensure the CSS is still imported


const ProductManagerDashboard = () => {
  const caseManagers = ["John Doe", "Jane Smith", "John Wick", "Sarah Connor", "Tony Stark"];
  const clientsByCaseManager = {
    "John Doe": ["Client A", "Client B"],
    "Jane Smith": ["Client C", "Client D"],
    "John Wick": ["Client E"],
    "Sarah Connor": ["Client F"],
    "Tony Stark": ["Client G", "Client H", "Client I", "Client J", "Client K", "Client L"]
  };

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

  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseManager, setSelectedCaseManager] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

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
    setSelectedCase(null);
  };

  const handleCaseManagerChange = (e) => {
    const selectedManager = e.target.value;
    setSelectedCaseManager(selectedManager);
    setFilteredClients(clientsByCaseManager[selectedManager] || []);
    setSelectedClient("");
  };

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  const filteredCases = cases.filter(
    (caseItem) =>
      (!selectedCaseManager || caseItem.assignedTo === selectedCaseManager) &&
      (!selectedClient || caseItem.client === selectedClient)
  );

  return (
    <div className="dashboard-container">
      <h1>Product Manager Dashboard</h1>
      
      <h2>Manage Cases: </h2>
      {/* Dropdown Panel */}
      <div className="dropdown-panel">
        {/* Case Manager Dropdown */}
        <label>Select Case Manager: </label>
        <select value={selectedCaseManager} onChange={handleCaseManagerChange}>
          <option value="">Select Case Manager</option>
          {caseManagers.map((manager, index) => (
            <option key={index} value={manager}>
              {manager}
            </option>
          ))}
        </select>

        {/* Client Dropdown */}
        <label style={{ marginLeft: '20px' }}>Select Client: </label>
        <select value={selectedClient} onChange={handleClientChange}>
          <option value="">Select Client</option>
          {filteredClients.map((client, index) => (
            <option key={index} value={client}>
              {client}
            </option>
          ))}
        </select>
      </div>

      {/* Case Table */}
      <h2>Active Cases:</h2>
      <div className="table-container">
        {filteredCases.length === 0 ? (
          <p>No cases available for the selected filters.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th className="id-column">Case ID</th>
                <th>Case Title</th>
                <th>Client Name</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
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
                      onBlur={(e) => e.target.blur()}
                    >
                      <option value="" disabled>Select Assignee</option>
                      {caseManagers.map((assignee, index) => (
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
        )}
      </div>

      {/* Modal for Case Details */}
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