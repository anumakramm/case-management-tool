import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./ProductManagerDashboard.css";
import Header from "../components/Header";
import { getAllCaseMangers } from "../api/caseManager";
import { getAllClients } from "../api/client";
import { linkCaseManagerAndClient } from "../api/productManager";

const ProductManagerDashboard = () => {
  const [caseManagers, setCaseManagers] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedSection, setSelectedSection] = useState("linkCases"); // Sidebar toggle
  const [selectedCaseManager, setSelectedCaseManager] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);

  // Fetch data for Case Managers and Clients
  useEffect(() => {
    const fetchData = async () => {
      try {
        const caseManagerResponse = await getAllCaseMangers();
        setCaseManagers(caseManagerResponse.data);

        const clientResponse = await getAllClients();
        setClients(clientResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClientSelection = (event, newValue) => {
    setSelectedClients(newValue.map((n) => Number(n)));
  };

  const handleAssignClients = async () => {
    try {
      await linkCaseManagerAndClient(
        selectedCaseManager?.id,
        selectedClients
      );
      setSelectedCaseManager(null);
      setSelectedClients([]);
    } catch (error) {
      console.error("Error assigning clients:", error);
    }
  };

  return (
    <div className="product-dashboard-container">
      <Header title="Product Manager Dashboard" />

      {/* Sidebar */}
      <div className="product-sidebar">
        <div
          className={`sidebar-item ${
            selectedSection === "linkCases" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("linkCases")}
        >
          Link Cases
        </div>
        <div
          className={`sidebar-item ${
            selectedSection === "activeCases" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("activeCases")}
        >
          Active Cases
        </div>
      </div>

      {/* Main Content */}
      <div className="product-main-content">
        {selectedSection === "linkCases" && (
          <div className="dropdown-panel">
            {/* Select Case Manager */}
            <div className="dropdown-panel-item">
              <label>Select Case Manager:</label>
              <Autocomplete
                options={caseManagers}
                getOptionLabel={(option) => option.name}
                value={selectedCaseManager}
                onChange={(event, newValue) =>
                  setSelectedCaseManager(newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Case Manager"
                    placeholder="Case Manager"
                  />
                )}
                style={{ width: 300 }}
              />
            </div>

            {/* Select Clients */}
            <div className="dropdown-panel-item">
              <label>Select Clients:</label>
              <Autocomplete
                multiple
                options={clients.map((c) => String(c.id))}
                disableCloseOnSelect
                value={selectedClients.map((s) => String(s))}
                onChange={handleClientSelection}
                getOptionLabel={(option) =>
                  clients.find((c) => c.id == option)?.email
                }
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<Checkbox />}
                      checkedIcon={<Checkbox checked />}
                      checked={selected}
                      style={{ marginRight: 8 }}
                    />
                    {clients.find((c) => c.id == option)?.email}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Clients"
                    placeholder="Clients"
                  />
                )}
                style={{ width: 300 }}
              />
            </div>

            {/* OK Button */}
            <button onClick={handleAssignClients} className="ok-button">
              OK
            </button>
          </div>
        )}

        {selectedSection === "activeCases" && (
          <div className="cards-container">
            {clients.map((client) => (
              <div className="product-card" key={client.id}>
                <h3>Product: {client.name}</h3>
                <p>{client.email}</p>
                <span>
                  Assigned To:{" "}
                  {caseManagers.find(
                    (c) => c.id === client.case_manager_id
                  )?.name || "Unassigned"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagerDashboard;
