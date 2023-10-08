import React, {useState} from 'react';
import servicesService from "@/services/servicesService";
import Swal from "sweetalert2";
import NavTitle from "@/components/NavTitle/NavTitle";
import {MdCleaningServices} from "react-icons/md";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {IoPricetagsOutline} from "react-icons/io5";
import FieldForm from "@/components/Form/FieldForm";

function Service() {

    const [service, setService] = useState({
        serviceName: "",
        commission: "",
        description: "",
    })


    const [price, setPrice] = useState({
        unitCost: 0,
        additionalCost: 0,
        finalCost: 0,
        profitPercent: 0,
        salePrice: 0,
    });


    const handleChange = (e) => {
        setService({...service, [e.target.name]: e.target.value});
    }

    const handlePrice = async (e) => {
        const updatePrice = {...price, [e.target.name]: e.target.value};
        setPrice(updatePrice);

        if (['unitCost', 'additionalCost', 'profitPercent'].includes(e.target.name)) {
            const calculatedPrice = await servicesService.calculateProductPrice(updatePrice);
            setPrice(calculatedPrice);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            ...service,
            price: { ...price }
        }

        let response;

        response = await servicesService.createNewService(data);

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
                                            <div className="card">
                                                <div className="card-header">
                                                    <IoPricetagsOutline style={{fontSize: "20px", marginRight: "5px"}}/>
                                                    Price and Cost
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FieldForm
                                                                label="Unit Cost ($)"
                                                                type="number"
                                                                name="unitCost"
                                                                value={price.unitCost}
                                                                onChange={(e) => handlePrice(e)}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FieldForm
                                                                label="Additional Cost ($)"
                                                                type="number"
                                                                name="additionalCost"
                                                                value={price.additionalCost}
                                                                onChange={(e) => handlePrice(e)}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FieldForm
                                                                label="Final Cost ($)"
                                                                type="number"
                                                                name="finalCost"
                                                                value={price.finalCost}
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FieldForm
                                                                label="Profit (%)"
                                                                type="number"
                                                                name="profitPercent"
                                                                value={price.profitPercent}
                                                                onChange={(e) => handlePrice(e)}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FieldForm
                                                                label="Sale Price ($)"
                                                                type="number"
                                                                name="salePrice"
                                                                value={price.salePrice}
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
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
