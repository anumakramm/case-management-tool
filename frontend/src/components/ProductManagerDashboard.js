import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "./ProductManagerDashboard.css";
import axios from "axios";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProductManagerDashboard = () => {
  // State for case managers, clients, cases, selected case manager, and selected clients
  const [caseManagers, setCaseManagers] = useState([]);
  const [clients, setClients] = useState([]);
  const [cases, setCases] = useState([]);
  const [selectedCaseManager, setSelectedCaseManager] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const caseManagersResponse = await axios.get("/api/caseManagers");
        const clientsResponse = await axios.get("/api/clients");
        const casesResponse = await axios.get("/api/cases");

        setCaseManagers(caseManagersResponse.data);
        setClients(clientsResponse.data.map((client) => client.name)); // Assuming clients have a "name" field
        setCases(casesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle case manager selection
  const handleCaseManagerChange = (e) => {
    setSelectedCaseManager(e.target.value);
    setSelectedClients([]); // Clear previously selected clients
  };

  // Handle client selection
  const handleClientSelection = (event, newValue) => {
    setSelectedClients(newValue);
  };

  // Assign selected clients to the selected case manager
  const handleAssignClients = () => {
    const updatedCases = cases.map((caseItem) => {
      if (selectedClients.includes(caseItem.client) && selectedCaseManager) {
        return { ...caseItem, assignedTo: selectedCaseManager };
      }
      return caseItem;
    });
    setCases(updatedCases);
    setSelectedClients([]); // Clear selected clients after assignment
  };

  return (
    <div className="dashboard-container">
      <h1>Product Manager Dashboard</h1>

      <h2>Manage Cases: </h2>
      <div className="dropdown-panel">
        {/* Case Manager Dropdown */}
        <div className="dropdown-panel-item">
          <label>Select Case Manager: </label>
          <select
            value={selectedCaseManager}
            onChange={handleCaseManagerChange}
          >
            <option value="">Select Case Manager</option>
            {caseManagers.map((manager) => (
              <option key={manager.id} value={manager.name}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>

        {/* Client Autocomplete with Multi-Select */}
        <div className="dropdown-panel-item">
          <label>Select Clients: </label>
          <Autocomplete
            multiple
            options={clients}
            disableCloseOnSelect
            value={selectedClients}
            onChange={handleClientSelection}
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={selected}
                  style={{ marginRight: 8 }}
                />
                {option}
              </li>
            )}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Clients"
                placeholder="Clients"
              />
            )}
          />
        </div>

        {/* Assign Button */}
        <button
          onClick={handleAssignClients}
          className="ok-button"
          style={{ marginLeft: "20px" }}
        >
          OK
        </button>
      </div>

      {/* Display Cases Table */}
      <h2>Active Cases:</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Case Title</th>
              <th>Client Name</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem.id}>
                <td>{caseItem.id}</td>
                <td>{caseItem.title}</td>
                <td>{caseItem.client}</td>
                <td>{caseItem.assignedTo || "Unassigned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagerDashboard;
