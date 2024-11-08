import React, { useEffect, useState } from "react";
import "./CaseManagerDashboard.css"; // Import the CSS styles
import ScheduleMeeting from "./meeting";
import { getCaseMangersUsers } from "../api/caseManager";
import { useSelector } from "react-redux";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import MeetingListing from "./meeting/listing";
import { Button } from "@mui/material";

const CaseManagerDashboard = () => {
  const [cases, setCases] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const caseManagerId = useSelector((state) => state.manager.caseManagerId);
  // Simulated fetch function to get case data
  const fetchCases = async () => {
    if (caseManagerId) {
      getCaseMangersUsers(caseManagerId).then((res) => {
        setCases(res.data.users);
      });
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleRowClick = (caseItem) => {
    if (expandedRow === caseItem.id) {
      setExpandedRow(null); // Collapse if already expanded
    } else {
      setExpandedRow(caseItem.id); // Expand the clicked row
    }
  };

  useEffect(() => {
    fetchCases();
  }, [caseManagerId]);

  return (
    <div>
      <h1>Case Manager Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Case ID</th>
            <th>Client Name</th>
            <th>Email</th>
            <th>Add New Meeting</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <>
              <tr key={caseItem.id}>
                <td>
                  {expandedRow && expandedRow === caseItem.id ? (
                    <KeyboardArrowUp onClick={() => handleRowClick(caseItem)} />
                  ) : (
                    <KeyboardArrowDown
                      onClick={() => handleRowClick(caseItem)}
                    />
                  )}
                </td>
                <td>{caseItem.id}</td>
                <td>{caseItem.name}</td>
                <td>{caseItem.email}</td>
                <td>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleClientClick(caseItem)}
                  >
                    Add Meeting
                  </Button>
                </td>
              </tr>
              {expandedRow === caseItem.id && (
                <tr className="expanded-row">
                  <td colSpan="5">
                    <MeetingListing
                      caseManagerId={caseManagerId}
                      caseEmail={caseItem.email}
                    />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Appointment</h3>
            <ScheduleMeeting client={selectedClient} />
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManagerDashboard;
