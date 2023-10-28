import React, {useEffect, useRef, useState} from 'react';
import customerService from "@/services/customerService";
import AsyncSelect from "react-select/async";
import FieldForm from "@/components/Form/FieldForm";
import {BsBox, BsCash, BsClipboard2Data, BsPerson} from "react-icons/bs";
import {MdAdd} from "react-icons/md";
import NavTitle from "@/components/NavTitle/NavTitle";
import {GiAutoRepair, GiCardExchange} from "react-icons/gi";
import Modal from "@/components/Modal/modal";
import Customer from "@/pages/customer";
import costCenterService from "@/services/costCenterService";
import CostCenter from "@/pages/costCenter";
import employeeService from "@/services/employeeService";
import ServiceOrderEquipmentForm from "@/components/Form/ServiceOrderEquipmentForm";
import ProductTable from "@/pages/productTable";
import ServiceTable from "@/components/ServiceTable";
import axios from "axios";


function ServiceOrder() {

    const [serviceOrder, setServiceOrder] = useState({
        customer: null,
        channelSale: '',
        employee: null,
        status: 'select',
        startDate: '',
        endDate: '',
        costCenter: null,
        serviceOrderProducts: [],
        serviceOrderServices: [],
        paymentCondition: {
            maxInstallmentQuantity: '',
            installmentIntervalDays: '',
            firstInstallmentDelayDays: '',
            paymentType: 'select',
            paymentModality: 'select',
            creditProviderTaxPercent: '',
            installments: []
        },
        otherInformation: '',
        attachments: [],
        discountAmount: '',
        discountPercent: ''
    });


    const [serviceOrderEquipments, setServiceOrderEquipments] = useState([]);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedCostCenter, setSelectedCostCenter] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedExpert, setSelectedExpert] = useState(null);

    const [totalServiceValue, setTotalServiceValue] = useState(0);
    const [totalProductValue, setTotalProductValue] = useState(0);


    const loadCustomers = async (inputValue) => {
        try {
            const data = await customerService.searchCustomerByName(inputValue);
            const items = data.items || [];
            const options = items.map(customer => ({
                value: customer.generalInformation.id,
                label: customer.generalInformation.name
            }));
            options.push({
                value: 'add_button',
                label: 'Add new customer',
                isAddButton: true,
                type: 'customer'
            });
            return options;
        } catch (error) {
            console.error("Error loading customers:", error);
            return [];
        }
    };


    const loadCostCenters = async (inputValue) => {
        try {
            const data = await costCenterService.searchCostCenterByName(inputValue);
            const items = data.items || [];
            const options = items.map(costCenter => ({
                value: costCenter.id,
                label: costCenter.name,
                type: 'costcenter'
            }));
            options.push({
                value: 'add_costcenter',
                label: 'Add new cost center',
                isAddButton: true,
                type: 'costcenter'
            });
            return options;
        } catch (error) {
            console.error("Error loading cost centers:", error);
            return [];
        }
    };

    const loadEmployees = async (inputValue) => {
        try {
            const data = await employeeService.searchEmployeeByName(inputValue);
            const items = data.items || [];
            const options = items.map(employee => ({
                value: employee.id,
                label: employee.name,
            }));
            return options;
        } catch (error) {
            console.error("Error loading employees:", error);
            return [];
        }
    };


    const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
    const [isCostCenterModalOpen, setCostCenterModalOpen] = useState(false);

    const handleAddButtonClick = (type) => {
        if (type === 'customer') {
            setCustomerModalOpen(true);
            console.log('Botão Adicionar Cliente clicado!');
        } else if (type === 'costcenter') {
            setCostCenterModalOpen(true);
            console.log('Botão Adicionar Centro de Custo clicado!');
        }
    };

    const handleCloseModal = (type) => {
        if (type === 'customer') setCustomerModalOpen(false);
        if (type === 'costcenter') setCostCenterModalOpen(false);
    };


    const customerRef = useRef();
    const costCenterRef = useRef();

    const handleSaveChanges = (type) => {
        if (type === 'customer' && customerRef.current && typeof customerRef.current.saveCustomer === "function") {
            const customerData = customerRef.current.saveCustomer();
            console.log('Dados do cliente para salvar:', customerData);
            handleCloseModal('customer');
        } else if (type === 'costcenter' && costCenterRef.current && typeof costCenterRef.current.saveCost === "function") {
            const costCenterData = costCenterRef.current.saveCost();
            console.log('Dados do centro de custo para salvar:', costCenterData);
            handleCloseModal('costcenter');
        }
    };


    const formatOptionLabel = (option, {context}) => {
        if (context === 'menu' && option.isAddButton) {
            return (
                <div
                    style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                    onClick={() => handleAddButtonClick(option.type)}
                >
                    <MdAdd size={20} style={{marginRight: '5px'}}/>
                    {option.label}
                </div>
            );
        }
        return option.label;
    };


    //begin function handleChanges
    const updateStateAtPath = (path, value) => {
        let newState = {...serviceOrder};

        path.split('.').reduce((o, k, i, ks) => {
            if (i === ks.length - 1) {
                o[k] = value;
            } else {
                o[k] = o[k] || (isNaN(ks[i + 1]) ? {} : []);
            }
            return o[k];
        }, newState);

        setServiceOrder(newState);
    };

    const handleAsyncSelectChange = (setter) => (selectedOption) => {
        setter(selectedOption);
    };

    const handleServiceOrderEquipmentsChange = (index, field) => (event) => {
        const value = event.target ? event.target.value : event;
        const updatedEquipments = [...serviceOrderEquipments];
        updatedEquipments[index] = {
            ...updatedEquipments[index],
            [field]: value,
        };
        setServiceOrderEquipments(updatedEquipments);
    };

    const handleServiceOrderChanges = (path) => (event) => {
        const value = event.target ? event.target.value : event;
        updateStateAtPath(path, value);
    };

    useEffect(() => {
        updateStateAtPath("paymentCondition.installments.0.value", (totalServiceValue + totalProductValue).toFixed(2));
    }, [totalServiceValue, totalProductValue]);
    //end function handleChanges


    const handleSubmit = async () => {
        try {
            const updatedServiceOrder = {
                ...serviceOrder,
                serviceOrderEquipments
            };
            const response = await axios.post('/api/service-orders', updatedServiceOrder);
            console.log('Ordem de serviço enviada com sucesso!', response.data);
        } catch (error) {
            console.error('Erro ao enviar a ordem de serviço', error);
        }
    };



    return (
        <>
            <NavTitle
                icon={<GiAutoRepair style={{fontSize: "20px"}}/>}
                title="Service Order"
                path={[
                    {name: "Services", path: "/"},
                    {name: "Add Service Order", path: "/serviceOrder"}
                ]}
            />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4 mt-3">
                            <div className="card-header" style={{backgroundColor: '#F6F8FC'}}>
                                <h5 className="card-title"
                                    style={{display: 'flex', alignItems: "center", padding: '5px', margin: 0}}>
                                    <BsClipboard2Data style={{marginRight: 10}}/>
                                    General Informations
                                </h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Customer</label>
                                                <AsyncSelect
                                                    cacheOptions
                                                    defaultOptions
                                                    loadOptions={loadCustomers}
                                                    value={selectedCustomer}
                                                    isClearable
                                                    onChange={handleAsyncSelectChange(setSelectedCustomer)}
                                                    placeholder="Type to search..."
                                                    formatOptionLabel={formatOptionLabel}
                                                />

                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <FieldForm
                                                    label="Status"
                                                    type="select"
                                                    name="status"
                                                    value={serviceOrder.status}
                                                    onChange={handleServiceOrderChanges("status")}
                                                    options={[
                                                        {value: 'select', label: 'Select Status'},
                                                        {value: "OPEN", label: "Open"},
                                                        {value: "IN_PROGRESS", label: "In progress"},
                                                        {value: "FINISHED", label: "Finished"},
                                                        {value: "CANCELED", label: "Canceled"},
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <FieldForm
                                                    label="Start Date"
                                                    type="date"
                                                    name="startDate"
                                                    value={serviceOrder.startDate}
                                                    onChange={handleServiceOrderChanges("startDate")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <FieldForm
                                                    label="End Date"
                                                    type="date"
                                                    name="endDate"
                                                    value={serviceOrder.endDate}
                                                    onChange={handleServiceOrderChanges("endDate")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FieldForm
                                                    label="Channel Sales"
                                                    type="text"
                                                    name="channelSales"
                                                    value={serviceOrder.channelSales}
                                                    onChange={handleServiceOrderChanges("channelSales")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>CostCenter</label>
                                                <AsyncSelect
                                                    cacheOptions
                                                    defaultOptions
                                                    loadOptions={loadCostCenters}
                                                    value={selectedCostCenter}
                                                    isClearable
                                                    onChange={handleAsyncSelectChange(setSelectedCostCenter)}
                                                    placeholder="Type to search..."
                                                    formatOptionLabel={formatOptionLabel}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4 mt-3">
                            <div className="card-header" style={{backgroundColor: '#F6F8FC'}}>
                                <h5 className="card-title"
                                    style={{display: 'flex', alignItems: "center", padding: '5px', margin: 0}}>
                                    <BsPerson style={{marginRight: 10}}/>
                                    Employee
                                </h5>
                            </div>

                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Seller</label>
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                loadOptions={loadEmployees}
                                                value={selectedEmployee}
                                                isClearable
                                                onChange={handleAsyncSelectChange(setSelectedEmployee)}
                                                placeholder="Type to search..."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Expert</label>
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                loadOptions={loadEmployees}
                                                value={selectedExpert}
                                                isClearable
                                                onChange={handleAsyncSelectChange(setSelectedExpert)}
                                                placeholder="Type to search..."
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>


                <div className="row">
                    <ServiceOrderEquipmentForm
                        equipmentsList={serviceOrderEquipments}
                        setEquipmentsList={setServiceOrderEquipments}
                    />
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4 mt-3">
                            <div className="card-header" style={{backgroundColor: '#F6F8FC'}}>
                                <h5 className="card-title"
                                    style={{display: 'flex', alignItems: "center", padding: '5px', margin: 0}}>
                                    <BsBox style={{marginRight: 10}}/>
                                    Products/Equipment parts
                                </h5>
                            </div>
                            <div className="card-body">
                                <ProductTable setServiceOrder={setServiceOrder} onTotalChange={setTotalProductValue} />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4 mt-3">
                            <div className="card-header" style={{backgroundColor: '#F6F8FC'}}>
                                <h5 className="card-title"
                                    style={{display: 'flex', alignItems: "center", padding: '5px', margin: 0}}>
                                    <GiCardExchange style={{marginRight: 10}}/>
                                    Services
                                </h5>
                            </div>
                            <div className="card-body">
                                <ServiceTable onTotalChange={setTotalServiceValue} setServiceOrder={setServiceOrder} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4 mt-3">
                            <div className="card-header" style={{backgroundColor: '#F6F8FC'}}>
                                <h5 className="card-title"
                                    style={{display: 'flex', alignItems: "center", padding: '5px', margin: 0}}>
                                    <BsCash style={{marginRight: 10}}/>
                                    Payment
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Due Date"
                                                type="date"
                                                name="date"
                                                value={serviceOrder.paymentCondition?.installments?.[0]?.dueDate?.split('T')[0] || ''}
                                                onChange={handleServiceOrderChanges("paymentCondition.installments.0.dueDate")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">

                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Payment Method"
                                                type="select"
                                                name="modality"
                                                value={serviceOrder.paymentCondition?.paymentModality || 'select'}
                                                onChange={handleServiceOrderChanges("paymentCondition.paymentModality")}
                                                options={[
                                                    {value: 'select', label: 'Select Modality'},
                                                    {value: "MONEY", label: "Money"},
                                                    {value: "CREDIT_CARD", label: "Credit Card"},
                                                    {value: "DEBIT_CARD", label: "Debit Card"},
                                                    {value: "BILL", label: "Bill"},
                                                ]}
                                            />

                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div>
                <Modal
                    title="Add new customer"
                    isOpen={isCustomerModalOpen}
                    onClose={() => handleCloseModal('customer')}
                    onSave={() => handleSaveChanges('customer')}
                >
                    <Customer ref={customerRef} onSubmit={handleSaveChanges} isModalOpen={isCustomerModalOpen}/>
                </Modal>
            </div>
            <div>
                <Modal
                    title="Add new cost center"
                    isOpen={isCostCenterModalOpen}
                    onClose={() => handleCloseModal('costcenter')}
                    onSave={() => handleSaveChanges('costcenter')}
                >
                    <CostCenter ref={costCenterRef} onSubmit={handleSaveChanges} isModalOpen={isCostCenterModalOpen}/>
                </Modal>

            </div>
        </>
    );
}

export default ServiceOrder;
