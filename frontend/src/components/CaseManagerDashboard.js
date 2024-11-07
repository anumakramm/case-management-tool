import React, { useEffect, useState } from "react";
import "./CaseManagerDashboard.css"; // Import the CSS styles
import ScheduleMeeting from "./meeting";

const CaseManagerDashboard = () => {
  const [cases, setCases] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState({});

  // Simulated fetch function to get case data
  const fetchCases = async () => {
    const data = [
      {
        caseId: "C001",
        title: "Client A Case",
        client: "Client A",
        description: "Description of Client A case.",
        status: "In Progress",
        startDate: "2024-01-10",
        endDate: "2024-06-10",
      },
      {
        caseId: "C002",
        title: "Client B Case",
        client: "Client B",
        description: "Description of Client B case.",
        status: "Completed",
        startDate: "2024-03-15",
        endDate: "2024-09-15",
      },
    ];
    setCases(data);
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div>
      <h1>Case Manager Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Title</th>
            <th>Client</th>
            <th>Description</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <tr key={caseItem.caseId}>
              <td>{caseItem.caseId}</td>
              <td>{caseItem.title}</td>
              <td>
                <button onClick={() => handleClientClick(caseItem.client)}>
                  {caseItem.client}
                </button>
              </td>
              <td>{caseItem.description}</td>
              <td>{caseItem.status}</td>
              <td>{caseItem.startDate}</td>
              <td>{caseItem.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Pending Appointments for {selectedClient}</h2>
            <ul>
              {appointments[selectedClient] &&
              appointments[selectedClient].length > 0 ? (
                appointments[selectedClient].map((appointment, index) => (
                  <li key={index}>{appointment}</li>
                ))
              ) : (
                <li>No pending appointments</li>
              )}
            </ul>
            <h3>Add New Appointment</h3>
            <ScheduleMeeting />
            <button className="close-button" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManagerDashboard;
