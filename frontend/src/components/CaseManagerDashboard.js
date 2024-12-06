import React, { useEffect, useState } from "react";
import "./CaseManagerDashboard.css"; // Import CSS styles
import Header from "./Header"; // Import the Header component
import ScheduleMeeting from "./meeting";
import MeetingListing from "./meeting/listing";
import {
  getCaseMangersUserMeeting,
  getCaseMangersUsers,
} from "../api/caseManager"; // Import API call
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { initiateClient } from "../api/caseManager"; // Import the initiateClient function

const CaseManagerDashboard = () => {
  const [clients, setClients] = useState([]); // State to store the clients assigned to the case manager
  const [expandedCard, setExpandedCard] = useState(null); // Track expanded card
  const [selectedClient, setSelectedClient] = useState(null); // Track selected client for scheduling
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [loading, setLoading] = useState(true); // Track loading state
  const caseManagerId = useSelector((state) => state.manager.caseManagerId); // Get case manager ID from Redux store

  // Function to fetch all clients assigned to the case manager
  const fetchClients = async () => {
    if (caseManagerId) {
      try {
        const res = await getCaseMangersUsers(caseManagerId); // Fetch data
        if (res.data && Array.isArray(res.data.users)) {
          setClients(res.data.users); // Assuming 'users' contains the client data
        } else {
          setClients([]); // Set an empty array if no users are found
        }
      } catch (error) {
        console.error("Error fetching assigned clients:", error);
      } finally {
        setLoading(false); // Stop loading after the API call
      }
    }
  };

  // Function to handle client initialization
  const handleClientInit = async (client) => {
    if (!caseManagerId) {
      console.error("Case Manager ID is missing");
      return;
    }

    try {
      // Call the initiateClient function to start the process
      const serviceId = client.service_id; // Assuming each client has a service_id
      const response = await initiateClient(
        caseManagerId,
        client.id,
        serviceId
      );
      console.log("Client initialization response:", response.data);

      // You can add success message or further actions based on response
      alert(`Client ${client.name} has been initialized successfully.`);
    } catch (error) {
      console.error("Error initializing client:", error);
      alert("Failed to initialize client. Please try again.");
    }
  };

  const getClientMeetingDetails = (clientId, serviceId) => {
    getCaseMangersUserMeeting().then((res) => {
      setClients(res.data);
    });
  };

  // Handle expanding and collapsing of client cards
  const handleExpandCard = (client) => {
    if (expandedCard === client.id + " " + client.service_id) {
      setExpandedCard(null); // Collapse the card
    } else {
      setExpandedCard(client.id + " " + client.service_id); // Expand the selected card
    }
  };

  // Handle the click event for a client to schedule a meeting
  const handleClientClick = (client) => {
    setSelectedClient(client);
    setExpandedCard(null); // Close any expanded card
    setIsModalOpen(true); // Open the modal for scheduling a meeting
  };

  useEffect(() => {
    if (caseManagerId) fetchClients(caseManagerId);
  }, []);

  // Fetch assigned clients when caseManagerId changes
  useEffect(() => {
    fetchClients();
  }, [caseManagerId]); // Ensure useEffect runs when caseManagerId changes

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
              <p>No clients found</p> // Show a message if there are no clients
            ) : (
              clients.map((client) => (
                <div
                  key={client.id}
                  className={`case-case-card ${
                    expandedCard === client.id + " " + client.service_id
                      ? "expanded"
                      : ""
                  }`}
                >
                  <div className="case-case-card-header">
                    <div className="case-card-title">
                      <h2>{client.name}</h2> {/* Display the client's name */}
                      <p>{client.email}</p> {/* Display the client's email */}
                    </div>
                    <div className="case-expand-icon">
                      {expandedCard === client.id + " " + client.service_id ? (
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
                  {expandedCard === client.id + " " + client.service_id && (
                    <div className="case-card-details">
                      <MeetingListing
                        clientId={client.id}
                        serviceId={client.service_id}
                      />
                    </div>
                  )}
                  <div className="case-card-footer">
                    <Button
                      variant="contained"
                      size="small"
                      className="case-add-meeting-btn"
                      onClick={() => handleClientInit(client)} // Call handleClientInit instead of handleClientClick
                    >
                      Set Up Meetings
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
