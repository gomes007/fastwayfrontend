import React from 'react';
import FieldForm from './FieldForm';

const AddressData = ({ address, handleAddressChange }) => {
    return (
        <div className="content">
            <div className="line_01">
                <div className="col_01">
                    <div className="row">
                        <div className="col-md-4">
                            <FieldForm
                                label="Zip Code"
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={address.zipCode}
                                onChange={handleAddressChange}
                            />
                        </div>

                        <div className="col-md-4">
                            <FieldForm
                                label="Street"
                                type="text"
                                id="street"
                                name="street"
                                value={address.street}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <FieldForm
                                label="Number"
                                type="text"
                                id="number"
                                name="number"
                                value={address.number}
                                onChange={handleAddressChange}
                            />
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-4">
                            <FieldForm
                                label="Complement"
                                type="text"
                                id="complement"
                                name="complement"
                                value={address.complement}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <FieldForm
                                label="Neighborhood"
                                type="text"
                                id="neighborhood"
                                name="neighborhood"
                                value={address.neighborhood}
                                onChange={handleAddressChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FieldForm
                                label="City"
                                type="text"
                                id="city"
                                name="city"
                                value={address.city}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <FieldForm
                                label="State"
                                type="text"
                                id="state"
                                name="state"
                                value={address.state}
                                onChange={handleAddressChange}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressData;
