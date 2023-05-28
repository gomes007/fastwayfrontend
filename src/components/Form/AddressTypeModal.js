import React, { useState } from 'react';
import axios from 'axios';

function AddressTypeModal({ isOpen, onRequestClose, onAddressTypeCreated }) {
    const [label, setLabel] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.token : null;

        if (!token) {
            console.log("No token found");
            return;
        }

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        try {
            const response = await axios.post('http://localhost:8080/address/types', { label }, config);
            if (response.status === 201) {
                onAddressTypeCreated(response.data);
                onRequestClose();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Address Type</h5>
                                <button type="button" className="close" onClick={onRequestClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="addressTypeLabel">Address Type Label</label>
                                        <input
                                            id="addressTypeLabel"
                                            type="text"
                                            className="form-control"
                                            value={label}
                                            onChange={e => setLabel(e.target.value)}
                                            placeholder="Enter address type label"
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                                <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddressTypeModal;
