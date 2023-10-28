import React, {useEffect, useState} from 'react';
import ServiceService from "@/services/servicesService";
import AsyncSelect from "react-select/async";

function ServiceRow({onServiceChange, onRemove, onAdd, onRowUpdate}) {

    const [serviceOrderService, setServiceOrderService] = useState({
        service: {price: {salePrice: 0}},
        quantity: 0,
        discountType: "amount",
        discountAmount: 0,
        discountPercent: 0,
        totalValue: 0
    });

    const loadServices = async (inputValue) => {
        const response = await ServiceService.searchServicesByName(inputValue);
        return response.content.map(service => ({value: service.serviceName, label: service.serviceName}));
    }

    const handleServiceSelection = async (selectedOption) => {
        if (!selectedOption) return;

        const selectedServiceName = selectedOption.value;
        const services = await ServiceService.searchServicesByName(selectedServiceName);
        const selectedService = services.content[0];

        console.log("Selected service:", selectedService);

        if (selectedService) {
            setServiceOrderService(prev => ({...prev, service: selectedService}));
            if (onServiceChange) onServiceChange(selectedServiceName);
        }
    };

    useEffect(() => {
        if (onRowUpdate) {
            const serviceDataToSend = {...serviceOrderService};
            delete serviceDataToSend.discountType;
            onRowUpdate(serviceDataToSend);
        }
    }, [serviceOrderService]);

    useEffect(() => {
        const fetchSubtotal = async () => {
            const serviceDataToSend = {
                service: serviceOrderService.service,
                quantity: serviceOrderService.quantity,
                discountAmount: serviceOrderService.discountAmount,
                discountPercent: serviceOrderService.discountPercent
            };

            const subtotal = await ServiceService.calculateSubtotal(serviceDataToSend);
            if (subtotal) {
                setServiceOrderService(prevState => ({...prevState, totalValue: subtotal}));
            }
        };

        if (serviceOrderService.service && serviceOrderService.quantity)
            fetchSubtotal().then(r => console.log(r));
    }, [serviceOrderService.service.price.salePrice, serviceOrderService.quantity, serviceOrderService.discountAmount, serviceOrderService.discountPercent]);


    const handleDiscountTypeChange = (e) => {
        const discountType = e.target.value;
        if (discountType === "amount") {
            setServiceOrderService(prev => ({
                ...prev,
                discountType: "amount",
                discountPercent: 0
            }));
        } else {
            setServiceOrderService(prev => ({
                ...prev,
                discountType: "percent",
                discountAmount: 0
            }));
        }
    };

    return (
        <tr>
            <td className="text-center">
                <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadServices}
                    onChange={handleServiceSelection}
                    placeholder="Type to search..."
                    menuPosition={"absolute"}
                />
            </td>
            <td className='d-flex align-items-center justify-content-center'>
                <input
                    className="form-control text-center"
                    type="number"
                    value={serviceOrderService.quantity}
                    onChange={(e) => setServiceOrderService(prev => ({
                        ...prev,
                        quantity: e.target.value
                    }))}
                    style={{width: "90px", maxWidth: "90px"}}
                />
            </td>
            <td className="text-center align-middle">
                <div>
                    {serviceOrderService.service.price.salePrice.toFixed(2)}
                </div>
            </td>
            <td className='d-flex align-items-center justify-content-center'>
                <input
                    className="form-control text-center mr-2"
                    type="number"
                    value={serviceOrderService.discountType === "amount" ? serviceOrderService.discountAmount : serviceOrderService.discountPercent}
                    onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (serviceOrderService.discountType === "amount") {
                            setServiceOrderService(prev => ({
                                ...prev,
                                discountAmount: value,
                                discountPercent: 0
                            }));
                        } else {
                            setServiceOrderService(prev => ({
                                ...prev,
                                discountPercent: value,
                                discountAmount: 0
                            }));
                        }
                    }}
                    style={{width: "90px", maxWidth: "90px"}}
                />
                <select className="form-select text-center" style={{width: "auto", maxWidth: "auto"}}
                        value={serviceOrderService.discountType}
                        onChange={handleDiscountTypeChange}>
                    <option value="amount">$</option>
                    <option value="percent">%</option>
                </select>
            </td>


            <td className="text-center align-middle">
                <div>
                    {serviceOrderService.totalValue ? serviceOrderService.totalValue.toFixed(2) : '0.00'}
                </div>
            </td>
            <td className="text-center">
                <button className="btn btn-danger mr-12px" onClick={onRemove}><i className="fa fa-trash"></i></button>
                <button className="btn btn-primary" onClick={onAdd}><i className="fa fa-plus"></i></button>
            </td>
        </tr>
    );
}

export default ServiceRow;
