import React, {useState} from 'react';
import servicesService from "@/services/servicesService";
import Swal from "sweetalert2";
import NavTitle from "@/components/NavTitle/NavTitle";
import {MdCleaningServices} from "react-icons/md";
import {AiOutlinePlusCircle} from "react-icons/ai";

function Service() {

    const [service, setService] = useState({
        serviceName: "",
        unitCost: "",
        commission: "",
        description: "",
    })

    const handleChange = (e) => {
        setService({...service, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        response = await servicesService.createNewService(service);

        if (response) {
            await Swal.fire({
                icon: "success",
                title: "Service Created",
                text: `Service ${response.serviceName} has been created successfully`,
                width: '300px',
                height: '200px'
            });
        } else {
            await Swal.fire({
                icon: "error",
                title: "Service Creation Failed",
                text: `Service ${service.serviceName} could not be created`,
                width: '300px',
                height: '200px'
            });
        }
    }


    return (
        <>
            <NavTitle
                icon={<MdCleaningServices style={{fontSize: "20px"}}/>}
                title="Service"
                path={[
                    {name: "Services", path: "/"},
                    {name: "Add Services", path: "/service"}
                ]}
            />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mt-4">
                            <div className="card-header">
                                <h4 className="card-title" style={{display: 'flex' ,alignItems: "center"}}>
                                    <AiOutlinePlusCircle style={{marginRight: 10}}/>
                                    Add Service
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Service Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="serviceName"
                                                    value={service.serviceName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Unit Cost</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="unitCost"
                                                    value={service.unitCost}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Commission</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="commission"
                                                    value={service.commission}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea
                                                    className="form-control"
                                                    name="description"
                                                    value={service.description}
                                                    onChange={handleChange}
                                                    rows={4}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button type="submit" className="btn btn-primary">Submit</button>
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

export default Service;
