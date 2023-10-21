import React, {useState} from 'react';
import FieldForm from "@/components/Form/FieldForm";
import TableEquipment from "@/components/Form/TableEquipment";
import {SiBroadcom} from "react-icons/si";

const ServiceOrderEquipmentForm = ({equipmentsList, setEquipmentsList}) => {

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
                        <div className="card mb-4 mt-3">
                            <div className="card-header" style={{backgroundColor: '#F6F8FC'}}>
                                <h5 className="card-title" style={{ display: 'flex', alignItems: "center", padding: '5px', margin:0 }}>
                                    <SiBroadcom style={{marginRight: 10}}/>
                                    Equipment Details
                                </h5>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-4">
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
                                    <div className="col-md-2">
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
                                    <div className="col-md-2">
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
                                    <div className="col-md-4">
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Conditions"
                                                type="textarea"
                                                rows={4}
                                                name="conditions"
                                                value={equipment.conditions}
                                                onChange={(e) => handleChange(e)}
                                            />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Flaws"
                                                type="textarea"
                                                rows={4}
                                                name="flaws"
                                                value={equipment.flaws}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Fittings"
                                                type="textarea"
                                                rows={4}
                                                name="fittings"
                                                value={equipment.fittings}
                                                onChange={(e) => handleChange(e)}
                                            />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Solution"
                                                type="textarea"
                                                rows={4}
                                                name="solution"
                                                value={equipment.solution}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Technical Report"
                                                type="textarea"
                                                rows={4}
                                                name="technicalReport"
                                                value={equipment.technicalReport}
                                                onChange={(e) => handleChange(e)}
                                            />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Warranty Terms"
                                                type="textarea"
                                                rows={4}
                                                name="warrantyTerms"
                                                value={equipment.warrantyTerms}
                                                onChange={(e) => handleChange(e)}
                                            />
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
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default ServiceOrderEquipmentForm;
