import React, { useState, useEffect } from "react"; 
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "./ProductManagerDashboard.css";
import { getAllCaseMangers } from "../api/caseManager";
import { getAllClients } from "../api/client";
import { useSelector } from "react-redux";
import { linkCaseManagerAndClient } from "../api/productManager";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProductManagerDashboard = () => {
  const [caseManagers, setCaseManagers] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedCaseManager, setSelectedCaseManager] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);
  const productManagerId = useSelector(
    (state) => state.manager.productManagerId
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const caseManagerResponse = await getAllCaseMangers();
        setCaseManagers(caseManagerResponse.data);

        const clientResponse = await getAllClients(); // Use getAllClients function here
        setClients(clientResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCaseManagerChange = (e) => {
    setSelectedCaseManager(e.target.value);
    setSelectedClients([]); // Clear previously selected clients
  };

  const handleClientSelection = (event, newValue) => {
    setSelectedClients(newValue.map((n) => Number(n)));
  };

  const handleAssignClients = async () => {
    try {
      await linkCaseManagerAndClient(
        productManagerId,
        selectedCaseManager,
        selectedClients
      );

      setSelectedCaseManager("");
      setSelectedClients([]); // Clear selection after assignment
    } catch (error) {
      console.error("Error assigning clients:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Product Manager Dashboard</h1>
      <h2>Manage Cases: </h2>
      <div className="dropdown-panel">
        <div className="dropdown-panel-item">
          <label>Select Case Manager: </label>
          <select
            value={selectedCaseManager}
            onChange={handleCaseManagerChange}
          >
            <option value="">Select Case Manager</option>
            {caseManagers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-panel-item">
          <label>Select Clients: </label>
          <Autocomplete
            multiple
            options={clients.map((c) => String(c.id))}
            disableCloseOnSelect
            value={selectedClients.map((s) => String(s))}
            onChange={handleClientSelection}
            getOptionLabel={(option) =>
              clients.find((c) => c.id == option).email
            }
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={selected}
                  style={{ marginRight: 8 }}
                />
                {clients.find((c) => c.id == option).email}
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

        <button
          onClick={handleAssignClients}
          className="ok-button"
          style={{ marginLeft: "20px" }}
        >
          OK
        </button>
      </div>

      <h2>Active Cases:</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Client Name</th>
              <th>Client Email</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((caseItem) => (
              <tr key={caseItem.id}>
                <td>{caseItem.id}</td>
                <td>{caseItem.name}</td>
                <td>{caseItem.email}</td>
                <td>
                  {caseManagers.find((c) => c.id == caseItem.case_manager_id)
                    ?.name || "Unassigned"}
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
