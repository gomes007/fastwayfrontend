import React, {forwardRef, useImperativeHandle, useState} from 'react';
import Swal from "sweetalert2";
import costCenterService from "@/services/costCenterService";
import NavTitle from "@/components/NavTitle/NavTitle";
import FieldForm from "@/components/Form/FieldForm";
import {AiOutlinePlusCircle} from "react-icons/ai";


const CostCenter = (props, ref) => {
    const {initialData = {}, onSubmit, isModalOpen} = props;

    const [costCenter, setCostCenter] = useState({
        name: '',
        status: 'select',
    });

    const handleChange = (e) => {
        setCostCenter({...costCenter, [e.target.name]: e.target.value});
    }

    const saveCost = async (e) => {
        e.preventDefault();
        let response;
        response = await costCenterService.createNewCostCenter(costCenter);

        if (response) {
            await Swal.fire({
                icon: "success",
                title: "Cost Center Created",
                text: `Cost Center ${response.name} has been created successfully`,
                width: '300px',
                height: '200px'
            });
        } else {
            await Swal.fire({
                icon: "error",
                title: "Cost Center Creation Failed",
                text: `Cost Center ${costCenter.name} could not be created`,
                width: '300px',
                height: '200px'
            });
        }
    }

    // used by serviceOrder.js at modal
    useImperativeHandle(ref, () => ({
        saveCost
    }));


    return (
        <>
            {!isModalOpen && (
            <NavTitle
                icon={<i className="fa fa-balance-scale" style={{fontSize: "20px"}}/>}
                title="Cost Center"
                path={[
                    {name: "Cost Center", path: "/"},
                    {name: "Add Cost Center", path: "/costCenter"}
                ]}
            />
            )}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mt-4">
                            <div className="card-header">
                                <h4 className="card-title" style={{display: 'flex', alignItems: "center"}}>
                                    <AiOutlinePlusCircle style={{marginRight: 10}}/>
                                    Add Cost Name
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveCost}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <FieldForm
                                                    label="Cost Center Name"
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter Cost Center Name"
                                                    value={costCenter.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <FieldForm
                                                    label="Status"
                                                    type="select"
                                                    name="status"
                                                    value={costCenter.status}
                                                    onChange={handleChange}
                                                    options={[
                                                        {value: 'select', label: 'Select Status'},
                                                        {value: 'ENABLED', label: 'Active'},
                                                        {value: 'DISABLED', label: 'Inactive'},
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-right">
                                            <button type="submit" className="btn btn-primary">Add Cost Center</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default forwardRef(CostCenter);
