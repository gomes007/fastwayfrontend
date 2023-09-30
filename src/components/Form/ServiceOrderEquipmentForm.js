import React, {useState} from 'react';
import {BsClipboard2Data} from "react-icons/bs";
import FieldForm from "@/components/Form/FieldForm";
import TableEquipment from "@/components/Form/TableEquipment";

const ServiceOrderEquipmentForm = ({ equipmentsList, setEquipmentsList }) => {

    const [equipment, setEquipment] = useState({
        name: '',
        brand: '',
        model: '',
        seriesNumber: '',
        conditions: '',
        flaws: '',
        fittings: '',
        solution: '',
        technicalReport: '',
        warrantyTerms: ''
    });


    const handleChange = (event) => {
        setEquipment({
            ...equipment,
            [event.target.name]: event.target.value
        });
    }

    const handleAddEquipments = () => {
        let newEquipments = equipmentsList;

        if (equipment.index !== undefined) {
            newEquipments[equipment.index] = {...equipment};
        } else {
            if (newEquipments !== undefined && newEquipments.length > 0) {
                newEquipments.push({...equipment});
            } else {
                newEquipments = [{...equipment}]
            }
        }

        setEquipmentsList(newEquipments);

        setEquipment({
            name: '',
            brand: '',
            model: '',
            seriesNumber: '',
            conditions: '',
            flaws: '',
            fittings: '',
            solution: '',
            technicalReport: '',
            warrantyTerms: ''
        });
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow mb-4 mt-3">
                            <div className="card-header" style={{backgroundColor: '#F5F5F5FF'}}>
                                <h4 className="card-title" style={{display: 'flex', alignItems: "center"}}>
                                    <BsClipboard2Data style={{marginRight: 10}}/>
                                    Equipment Information
                                </h4>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Equipment Name"
                                                type="text"
                                                name="name"
                                                value={equipment.name}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Brand"
                                                type="text"
                                                name="brand"
                                                value={equipment.brand}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Model"
                                                type="text"
                                                name="model"
                                                value={equipment.model}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Series Number"
                                                type="text"
                                                name="seriesNumber"
                                                value={equipment.seriesNumber}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {equipment.index !== undefined && (
                    <input type='hidden' name='index' value={equipment.index}/>
                )}

                <div className="buttonAddEdit">
                    <button className="btn btn-outline-secondary"
                            onClick={() => handleAddEquipments()}>
                        {equipment.index === undefined ? 'Add' : 'Edit'}
                    </button>
                </div>

                <TableEquipment
                    equipments={equipmentsList}
                    setEditEquipment={setEquipment}
                    setDeleteEquipment={setEquipmentsList}
                />

            </div>
        </>
    );
};

export default ServiceOrderEquipmentForm;
