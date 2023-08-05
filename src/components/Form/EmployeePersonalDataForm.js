import React, {useEffect, useState} from 'react';
import FieldForm from './FieldForm';

const EmployeePersonalDataForm = ({ employee, handleEmployeeChange, handleProfilePicChange, handleFilesChange }) => {

    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [filesPreviews, setFilesPreviews] = useState([]);

    useEffect(() => {
        return () => {
            if (profilePicPreview) URL.revokeObjectURL(profilePicPreview);
            filesPreviews.forEach(URL.revokeObjectURL);
        }
    }, [profilePicPreview, filesPreviews]);


    const handleProfilePicPreview = (e) => {
        handleProfilePicChange(e);
        if (profilePicPreview) {
            URL.revokeObjectURL(profilePicPreview);
        }
        setProfilePicPreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleProfilePicRemove = () => {
        handleProfilePicChange(null);
        if (profilePicPreview) {
            URL.revokeObjectURL(profilePicPreview);
        }
        setProfilePicPreview(null);
    }


    const handleFilesPreview = (e) => {
        handleFilesChange(e);
        if (filesPreviews.length > 0) {
            filesPreviews.forEach(URL.revokeObjectURL);
        }
        const newPreviews = Array.from(e.target.files).map(file => URL.createObjectURL(file));
        setFilesPreviews(newPreviews);
    }


    const handleFileRemove = (index) => {
        handleFilesChange(null, index);
        URL.revokeObjectURL(filesPreviews[index]);
        setFilesPreviews(prev => prev.filter((_, i) => i !== index));
    }


    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <h3>
                        <i className="fa fa-address-card" aria-hidden="true"></i>
                        Employee Data
                    </h3>
                </div>
            </div>
            <div className='content'>
                <div className="line_01">
                    <div className="col_01">
                        <div className="row">
                            <div className="col-md-4">
                                <FieldForm
                                    label="Name"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={employee?.name}
                                    onChange={handleEmployeeChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <FieldForm
                                    label="Private Email"
                                    type="email"
                                    id="privateEmail"
                                    name="privateEmail"
                                    value={employee.privateEmail}
                                    onChange={handleEmployeeChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <FieldForm
                                    label="CPF"
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    value={employee.cpf}
                                    onChange={handleEmployeeChange}
                                />
                            </div>
                            <div className="col-md-2">
                                <FieldForm
                                    label="Phone"
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={employee.phone}
                                    onChange={handleEmployeeChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <FieldForm
                                    label="Birth Date"
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={employee.birthDate}
                                    onChange={handleEmployeeChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <FieldForm
                                    label='Gender'
                                    type="radio"
                                    id='gender'
                                    name='gender'
                                    value={employee.gender}
                                    onChange={handleEmployeeChange}
                                    options={[
                                        {value: 'MALE', label: 'Male'},
                                        {value: 'FEMALE', label: 'Female'}
                                    ]}
                                />
                            </div>

                            <div className="col-md-4">
                                <FieldForm
                                    label="Hire Date"
                                    type="date"
                                    id="hireDate"
                                    name="hireDate"
                                    value={employee.hireDate}
                                    onChange={handleEmployeeChange}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col_2">
                    <div className='col-md-4'>
                        <FieldForm
                            label="Profile Picture"
                            type="file"
                            id="profilePic"
                            name="profilePic"
                            onChange={handleProfilePicPreview}
                        />
                        {profilePicPreview && (
                            <img src={profilePicPreview} alt="Profile Preview" style={{ width: '100px', height: '100px' }}/>
                        )}
                    </div>
                    <div>
                        <FieldForm
                            label="Documents"
                            type="file"
                            id="files"
                            name="files"
                            onChange={handleFilesPreview}
                            onRemove={handleFileRemove}
                            previews={filesPreviews}
                        />
                    </div>
                </div>
            </div>
            <div className="line_03">
                <FieldForm
                    label='Others Informations'
                    type="textarea"
                    rows={4}
                    id="otherInformations"
                    name="otherInformations"
                    value={employee.otherInformations}
                    onChange={handleEmployeeChange}
                />
            </div>
        </>
    );
};

export default EmployeePersonalDataForm;
