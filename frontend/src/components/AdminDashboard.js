import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductManager,
  getAllProductManagers,
} from "../api/productManager";
import { addCaseManagers, getAllCaseManagers } from "../api/caseManager";
import { addClient, getAllClients } from "../api/client";
import { addServices, deleteOrRetainUser } from "../api/admin"; // Importing the services API
import Header from "./Header"; // Import the Header component
import "./AdminDashboard.css";
import ListOfUSersModal from "./listOfUsers";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  formTitle,
  formData,
  setFormData,
  formType,
  handleFileUpload,
  setFile,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">{formTitle}</h2>
        {formType === "services" ? (
          <form onSubmit={handleFileUpload}>
            <div className="form-group">
              <label>Upload .xlsx File</label>
              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            <div className="modal-buttons">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmit} className="modal-form">
            {Object.keys(formData).map((key) => (
              <div key={key} className="form-group">
                <label className="form-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder={`Enter ${key}`}
                  required
                />
              </div>
            ))}
            <div className="modal-buttons">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [formType, setFormType] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [file, setFile] = useState(null); // State for the file upload
  const [openListModal, setOpenListModal] = useState();
  // const [listOfUsers, setListOfUsers] = useState([]);

  const navigate = useNavigate();

  const handleOpenModal = (type) => {
    setFormType(type);
    setFormTitle(`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setFormData({
      name: "",
      email: "",
      role: type,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let message = "";
    if (formType === "product_manager") {
      addProductManager({
        name: formData.name,
        email: formData.email,
        role: formData.role,
      });
      message = "Product Manager added successfully!";
      // navigate("/admin");
    } else if (formType === "case_manager") {
      addCaseManagers({
        name: formData.name,
        email: formData.email,
        role: formData.role,
      });
      message = "Case Manager added successfully!";
      // navigate("/admin");
    } else if (formType === "client") {
      addClient({
        name: formData.name,
        email: formData.email,
        role: formData.role,
      });
      message = "Client added successfully!";
      // navigate("/admin");
    }

    setSnackbarMessage(message);
    setIsModalOpen(false);
    setSnackbarOpen(true);
    setFormData({ name: "", email: "", role: "" });
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setSnackbarMessage("Please upload a file.");
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await addServices(formData)
      .then((res) => {
        setSnackbarMessage("Services file uploaded successfully!");
      })
      .catch((err) => setSnackbarMessage("Services file uploaded failed!")); // Call the addServices API function

    setFile(null);
    setIsModalOpen(false);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleListModalOpen = (isOpen, modalFor, dataFunc) => {
    dataFunc.then((res) => {
      setTimeout(() => handleOpenListModal(isOpen, modalFor, res.data), 1000);
    });
  };

  const handleOpenListModal = (isOpen, modalFor, listOfUsers) => {
    setOpenListModal({
      isOpen: isOpen,
      modalFor: modalFor,
      data: listOfUsers,
    });
  };

  return (
    <div className="admin-dashboard-container">
      <Header title="Admin Dashboard" />

      <div className="cards-container">
        {/* Product Manager */}
        <div className="card">
          <div className="card-header gradient-bg">
            <h2 className="card-title">Product Manager</h2>
          </div>
          <div className="card-body">
            <p>
              Add a new Product Manager to manage your products effectively.
            </p>
            <Link
              to="#"
              onClick={() =>
                handleListModalOpen(
                  true,
                  "product_manager",
                  getAllProductManagers()
                )
              }
            >
              List of Product Managers
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => handleOpenModal("product_manager")}
            >
              Add Product Manager
            </button>
          </div>
        </div>

        {/* Case Manager */}
        <div className="card">
          <div className="card-header gradient-bg-2">
            <h2 className="card-title">Case Manager</h2>
          </div>
          <div className="card-body">
            <p>Add a Case Manager to oversee all case-related operations.</p>
            <Link
              to="#"
              onClick={() =>
                handleListModalOpen(true, "case_manager", getAllCaseManagers())
              }
            >
              List of Case Managers
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => handleOpenModal("case_manager")}
            >
              Add Case Manager
            </button>
          </div>
        </div>

        {/* Client */}
        <div className="card">
          <div className="card-header gradient-bg-3">
            <h2 className="card-title">Client</h2>
          </div>
          <div className="card-body">
            <p>
              Add a new Client to allow them to use the platform and access
              services.
            </p>
            <Link
              to="#"
              onClick={() =>
                handleListModalOpen(true, "clients", getAllClients())
              }
            >
              List of Clients
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => handleOpenModal("client")}
            >
              Add Client
            </button>
          </div>
        </div>

        {/* Services */}
        <div className="card">
          <div className="card-header gradient-bg-2">
            <h2 className="card-title">Services</h2>
          </div>
          <div className="card-body">
            <p>Upload a file to manage available services efficiently.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setFormType("services");
                setFormTitle("Upload Services");
                setIsModalOpen(true);
              }}
            >
              Upload Services
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle={formTitle}
        onSubmit={formType === "services" ? handleFileUpload : handleSubmit}
        formType={formType}
        handleFileUpload={handleFileUpload}
        setFile={setFile}
        formData={formData}
        setFormData={setFormData}
      />
      {openListModal && (
        <ListOfUSersModal
          isOpen={openListModal.isOpen}
          data={openListModal.data}
          modalFor={openListModal.modalFor}
          handleClose={() =>
            setOpenListModal({
              isOpen: false,
              data: [],
              modalFor: undefined,
            })
          }
          handleUserDeleteOrRetain={deleteOrRetainUser}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminDashboard;
