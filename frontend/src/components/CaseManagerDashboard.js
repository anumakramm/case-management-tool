import React, { useEffect, useState } from "react";
import "./CaseManagerDashboard.css"; // Import CSS styles
import Header from "./Header"; // Import the Header component
import ScheduleMeeting from "./meeting";
import MeetingListing from "./meeting/listing";
import { getCaseMangersUsers } from "../api/caseManager";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const CaseManagerDashboard = () => {
  const [cases, setCases] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const caseManagerId = useSelector((state) => state.manager.caseManagerId);

  const fetchCases = async () => {
    if (caseManagerId) {
      getCaseMangersUsers(caseManagerId).then((res) => {
        setCases(res.data.users);
      });
    }
  };

  const handleExpandCard = (caseItem) => {
    if (expandedCard === caseItem.id) {
      setExpandedCard(null); // Collapse the expanded card
    } else {
      setExpandedCard(caseItem.id); // Expand the selected card
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setExpandedCard(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchCases();
  }, [caseManagerId]);

  return (
    <div className="case-case-manager-dashboard">
      {/* Include Header */}
      <Header title="Case Manager Dashboard" />

      <div className="case-dashboard-content">
        <h1 className="case-dashboard-title">Case Details</h1>
        <div className="case-cards-container">
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className={`case-case-card ${
                expandedCard === caseItem.id ? "expanded" : ""
              }`}
            >
              <div className="case-case-card-header">
                <div className="case-card-title">
                  <h2>{caseItem.name}</h2>
                  <p>{caseItem.email}</p>
                </div>
                <div className="case-expand-icon">
                  {expandedCard === caseItem.id ? (
                    <KeyboardArrowUp
                      className="case-icon-toggle"
                      onClick={() => handleExpandCard(caseItem)}
                    />
                  ) : (
                    <KeyboardArrowDown
                      className="case-icon-toggle"
                      onClick={() => handleExpandCard(caseItem)}
                    />
                  )}
                </div>
              </div>
              {expandedCard === caseItem.id && (
                <div className="case-card-details">
                  <MeetingListing
                    caseManagerId={caseManagerId}
                    caseEmail={caseItem.email}
                  />
                </div>
              )}
              <div className="case-card-footer">
                <Button
                  variant="contained"
                  size="small"
                  className="case-add-meeting-btn"
                  onClick={() => handleClientClick(caseItem)}
                >
                  Initialize Client
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* {isModalOpen && (
        <div className="case-modal-overlay">
          <div className="case-modal-content">
            <h3>Add New Appointment</h3>
            <ScheduleMeeting client={selectedClient} />
            <button
              className="case-close-button"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CaseManagerDashboard;
