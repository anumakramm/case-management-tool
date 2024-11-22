import React, { useEffect, useState } from "react";
import "./CaseManagerDashboard.css"; // Import CSS styles
import Header from "./Header"; // Import the Header component
import ScheduleMeeting from "./meeting";
import MeetingListing from "./meeting/listing";
import { getCaseMangersUsers } from "../api/caseManager"; // Import API call
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const CaseManagerDashboard = () => {
  const [clients, setClients] = useState([]); // State to store the clients assigned to the case manager
  const [expandedCard, setExpandedCard] = useState(null);  // Track expanded card
  const [selectedClient, setSelectedClient] = useState(null);  // Track selected client for scheduling
  const [isModalOpen, setIsModalOpen] = useState(false);  // Track modal state
  const [loading, setLoading] = useState(true);  // Track loading state
  const caseManagerId = useSelector((state) => state.manager.caseManagerId);  // Get case manager ID from Redux store

  // Function to fetch all clients assigned to the case manager
  const fetchClients = async () => {
    console.log("Fetching clients for Case Manager ID Before If:", caseManagerId); // Check caseManagerId
    if (caseManagerId) {
      try {
        console.log("Fetching clients for case manager ID:", caseManagerId);  // Log to check ID
        const res = await getCaseMangersUsers(caseManagerId);  // Fetch data
        console.log("API response:", res.data);  // Log the entire API response to see the structure

        // Check if 'users' exists and is an array before updating state
        if (res.data && Array.isArray(res.data.users)) {
          setClients(res.data.users);  // Assuming 'users' contains the client data
        } else {
          console.error("No users found in the API response");
          setClients([]);  // Set an empty array if no users are found
        }
      } catch (error) {
        console.error("Error fetching assigned clients:", error);
      } finally {
        setLoading(false);  // Stop loading after the API call
      }
    }
  };

  // Handle expanding and collapsing of client cards
  const handleExpandCard = (client) => {
    if (expandedCard === client.id) {
      setExpandedCard(null); // Collapse the card
    } else {
      setExpandedCard(client.id); // Expand the selected card
    }
  };

  // Handle the click event for a client to schedule a meeting
  const handleClientClick = (client) => {
    setSelectedClient(client);
    setExpandedCard(null);  // Close any expanded card
    setIsModalOpen(true);  // Open the modal for scheduling a meeting
  };

  // Fetch assigned clients when caseManagerId changes
  useEffect(() => {
    fetchClients();
  }, [caseManagerId]);  // Ensure useEffect runs when caseManagerId changes

  // Log the clients state to verify it's being updated
  console.log("Current clients:", clients);

  return (
    <div className="case-case-manager-dashboard">
      {/* Include Header */}
      <Header title="Case Manager Dashboard" />

      <div className="case-dashboard-content">
        <h1 className="case-dashboard-title">Client Details</h1>
        
        {/* Loading message while fetching */}
        {loading ? (
          <p>Loading clients...</p>
        ) : (
          <div className="case-cards-container">
            {/* Render the list of clients */}
            {clients.length === 0 ? (
              <p>No clients found</p>  // Show a message if there are no clients
            ) : (
              clients.map((client) => (
                <div
                  key={client.id}
                  className={`case-case-card ${
                    expandedCard === client.id ? "expanded" : ""
                  }`}
                >
                  <div className="case-case-card-header">
                    <div className="case-card-title">
                      <h2>{client.name}</h2>  {/* Display the client's name */}
                      <p>{client.email}</p>  {/* Display the client's email */}
                    </div>
                    <div className="case-expand-icon">
                      {expandedCard === client.id ? (
                        <KeyboardArrowUp
                          className="case-icon-toggle"
                          onClick={() => handleExpandCard(client)}
                        />
                      ) : (
                        <KeyboardArrowDown
                          className="case-icon-toggle"
                          onClick={() => handleExpandCard(client)}
                        />
                      )}
                    </div>
                  </div>
                  {expandedCard === client.id && (
                    <div className="case-card-details">
                      <MeetingListing
                        caseManagerId={caseManagerId}
                        caseEmail={client.email}
                      />
                    </div>
                  )}
                  <div className="case-card-footer">
                    <Button
                      variant="contained"
                      size="small"
                      className="case-add-meeting-btn"
                      onClick={() => handleClientClick(client)}
                    >
                      Initialize Client
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal and meeting scheduling can be added back here */}
    </div>
  );
};

export default CaseManagerDashboard;
