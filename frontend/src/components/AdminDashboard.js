import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './AdminDashboard.css';
import { AddClient } from '../api/client';

const Modal = ({ isOpen, onClose, onSubmit, formTitle, formData, setFormData }) => {
    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="modal-overlay">
            <div className="modal centered-modal">
                <h2>{formTitle}</h2>
                <form onSubmit={onSubmit} className="form-container">
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="form-group">
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={handleInputChange}
                                required
                                placeholder={`Enter ${key}`}
                            />
                        </div>
                    ))}
                    <div className="modal-buttons">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });
    const [formType, setFormType] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(''); // New state for Snackbar message

    const handleOpenModal = (type) => {
        setFormType(type);
        setFormTitle(`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`);
        setFormData({ name: '', email: '', role: type === 'product-manager' ? 'Product Manager' : 'Case Manager' });
        setIsModalOpen(true);
    };

    useEffect(() => {
        // do these type of api calls but with dunamic data with help of form
        // AddClient(
        //     {
        //         name: "XYZT",
        //         email: "xyzt@gmail.com"
        //     }).then((res) => { console.log(res) }).catch((err) => { console.log(err) })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Adding ${formType}:`, formData);

        // Set custom Snackbar message based on formType
        let message = '';
        if (formType === 'product-manager') {
            message = 'Product Manager added successfully!';
        } else if (formType === 'case-manager') {
            message = 'Case Manager added successfully!';
        } else if (formType === 'client') {
            message = 'Client added successfully!';
        }
        setSnackbarMessage(message);

        setIsModalOpen(false);
        setSnackbarOpen(true);
        setFormData({ name: '', email: '', role: '' });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <div className="navbar">
                <a href="#">Home</a>
                <a href="#">Admin Dashboard</a>
                <a href="#">Case Manager Dashboard</a>
                <a href="#">Product Manager Dashboard</a>
            </div>
            
            <div className="admin-dashboard">
                <h1>Admin Dashboard</h1>
                <div className="button-container">
                    <button className="btn btn-success" onClick={() => handleOpenModal('product-manager')}>Add Product Manager</button>
                    <button className="btn btn-info" onClick={() => handleOpenModal('case-manager')}>Add Case Manager</button>
                    <button className="btn btn-warning" onClick={() => handleOpenModal('client')}>Add Client</button>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                formTitle={formTitle}
                formData={formData}
                setFormData={setFormData}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage} {/* Display custom message */}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AdminDashboard;
