import React, {useRef, useState} from 'react';


import AsyncSelect from "react-select/async";
import {BsBox, BsCash, BsClipboard2Data, BsPerson} from "react-icons/bs";
import {MdAdd} from "react-icons/md";
import {GiAutoRepair, GiCardExchange} from "react-icons/gi";

import Modal from "@/components/Modal/modal";
import FieldForm from "@/components/Form/FieldForm";
import NavTitle from "@/components/NavTitle/NavTitle";

import customerService from "@/services/customerService";
import Customer from "@/pages/customer";
import costCenterService from "@/services/costCenterService";
import CostCenter from "@/pages/costCenter";
import employeeService from "@/services/employeeService";
import serviceOrderService from "@/services/serviceOrderService";

import ServiceOrderEquipmentForm from "@/components/Form/ServiceOrderEquipmentForm";
import ProductTable from "@/pages/productTable";
import ServiceTable from "@/components/ServiceTable";



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
            maxInstallmentQuantity: 0,
            installmentIntervalDays: 0,
            firstInstallmentDelayDays: 0,
            paymentType: 'select',
            paymentModality: 'select',
            creditProviderTaxPercent: 0,
            installments: []
        },
        otherInformation: '',
        attachments: [],
        discountAmount: 0,
        discountPercent: 0
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
                value: customer.id,
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
                type: 'costCenter'
            }));
            options.push({
                value: 'add_costcenter',
                label: 'Add new cost center',
                isAddButton: true,
                type: 'costCenter'
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
        } else if (type === 'costCenter') {
            setCostCenterModalOpen(true);
            console.log('Botão Adicionar Centro de Custo clicado!');
        }
    };

    const handleCloseModal = (type) => {
        if (type === 'customer') setCustomerModalOpen(false);
        if (type === 'costCenter') setCostCenterModalOpen(false);
    };


    const customerRef = useRef();
    const costCenterRef = useRef();

    const handleSaveChanges = (type) => {
        if (type === 'customer' && customerRef.current && typeof customerRef.current.saveCustomer === "function") {
            const customerData = customerRef.current.saveCustomer();
            console.log('Dados do cliente para salvar:', customerData);
            handleCloseModal('customer');
        } else if (type === 'costCenter' && costCenterRef.current && typeof costCenterRef.current.saveCost === "function") {
            const costCenterData = costCenterRef.current.saveCost();
            console.log('Dados do centro de custo para salvar:', costCenterData);
            handleCloseModal('costCenter');
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


    const handleAsyncSelectChanges = (type) => (selectedOption) => {
        switch (type) {
            case 'customer':
                setSelectedCustomer(selectedOption);
                break;
            case 'costCenter':
                setSelectedCostCenter(selectedOption);
                break;
            case 'employee':
                setSelectedEmployee(selectedOption);
                break;
            case 'expert':
                setSelectedExpert(selectedOption);
                break;
            default:
                console.warn('Unknown type in handleAsyncSelectChange:', type);
                break;
        }

        const updatedServiceOrder = {...serviceOrder};

        if (selectedOption) {
            if (selectedOption.isAddButton) {
                // Lógica para adicionar novo item (se necessário)
            } else {
                if (type === 'customer') {
                    updatedServiceOrder[type] = {
                        id: selectedOption.value,
                        generalInformation: {
                            name: selectedOption.label
                        }
                    };
                } else {
                    updatedServiceOrder[type] = {
                        id: selectedOption.value,
                        name: selectedOption.label
                    };
                }
                setServiceOrder(updatedServiceOrder);
            }
        } else {
            updatedServiceOrder[type] = null;
            setServiceOrder(updatedServiceOrder);
        }
    }






    const handleServiceOrderChanges = (path) => (event) => {
        const value = event.target ? event.target.value : event;

        if (path === 'paymentCondition.paymentType') {
            const updatedServiceOrder = { ...serviceOrder };

            if (value === 'INSTALLMENT') {
                // Se o tipo de pagamento é 'parcelado', garanta que há pelo menos uma parcela
                if (!updatedServiceOrder.paymentCondition.installments.length) {
                    updatedServiceOrder.paymentCondition.installments = [{ dueDate: '' }];
                }
            } else {
                // Se o tipo de pagamento não é 'parcelado', limpe o array de parcelas
                updatedServiceOrder.paymentCondition.installments = [];
            }

            // Atualize o tipo de pagamento
            updatedServiceOrder.paymentCondition.paymentType = value;
            setServiceOrder(updatedServiceOrder);
            return;
        }

        // Para outros casos, utilize a função de atualização de estado existente
        updateStateAtPath(path, value);
    };



    /*
    useEffect(() => {
        updateStateAtPath("paymentCondition.installments.0.value", (totalServiceValue + totalProductValue).toFixed(2));
    }, [totalServiceValue, totalProductValue]);
     */
    //end function handleChanges


    const handleSubmit = async () => {
        try {
            const updatedServiceOrder = {
                ...serviceOrder,
                employee: selectedEmployee ? { id: selectedEmployee.value } : null,
                expert: selectedExpert ? { id: selectedExpert.value } : null,
                serviceOrderEquipments
            };

            // Aqui, verificamos se 'expert' foi definido, e, se sim, o definimos como 'employee'
            if (updatedServiceOrder.expert) {
                updatedServiceOrder.employee = updatedServiceOrder.expert;
                delete updatedServiceOrder.expert;
            }

            console.log('Ordem de serviço!', updatedServiceOrder);
            const response = await serviceOrderService.createNewServiceOrder(updatedServiceOrder);
            console.log('Ordem de serviço enviada com sucesso!', response);
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
                                                    onChange={handleAsyncSelectChanges('customer')}
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
                                                    value={serviceOrder.channelSale}
                                                    onChange={handleServiceOrderChanges("channelSale")}
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
                                                    onChange={handleAsyncSelectChanges('costCenter')}
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
                                                onChange={handleAsyncSelectChanges('employee')}
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
                                                onChange={handleAsyncSelectChanges('expert')}
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
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Due Date"
                                                type="date"
                                                name="dueDate"
                                                value={serviceOrder.paymentCondition?.installments?.[0]?.dueDate || ''}
                                                onChange={handleServiceOrderChanges("paymentCondition.installments.0.dueDate")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Payment Type"
                                                type="select"
                                                name="paymentType"
                                                value={serviceOrder.paymentCondition?.paymentType || 'select'}
                                                onChange={handleServiceOrderChanges("paymentCondition.paymentType")}
                                                options={[
                                                    {value: 'select', label: 'Select Type'},
                                                    {value: "ONE_TIME", label: "One Time"},
                                                    {value: "INSTALLMENT", label: "Installment"},
                                                ]}
                                            />
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
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Max Installment"
                                                type="number"
                                                name="maxInstallmentQuantity"
                                                value={serviceOrder.paymentCondition?.maxInstallmentQuantity || ''}
                                                onChange={handleServiceOrderChanges("paymentCondition.maxInstallmentQuantity")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Interval Days"
                                                type="number"
                                                name="installmentIntervalDays"
                                                value={serviceOrder.paymentCondition?.installmentIntervalDays || ''}
                                                onChange={handleServiceOrderChanges("paymentCondition.installmentIntervalDays")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <FieldForm
                                                label="First Installment Delay Days"
                                                type="number"
                                                name="firstInstallmentDelayDays"
                                                value={serviceOrder.paymentCondition?.firstInstallmentDelayDays || ''}
                                                onChange={handleServiceOrderChanges("paymentCondition.firstInstallmentDelayDays")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Credit Provider Tax Percent"
                                                type="number"
                                                name="creditProviderTaxPercent"
                                                value={serviceOrder.paymentCondition?.creditProviderTaxPercent || ''}
                                                onChange={handleServiceOrderChanges("paymentCondition.creditProviderTaxPercent")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Discount Amount"
                                                type="number"
                                                name="discountAmount"
                                                value={serviceOrder.discountAmount || ''}
                                                onChange={handleServiceOrderChanges("discountAmount")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Discount %"
                                                type="number"
                                                name="discountPercent"
                                                value={serviceOrder.discountPercent || ''}
                                                onChange={handleServiceOrderChanges("discountPercent")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <FieldForm
                                                label="Others Informations"
                                                type="textarea"
                                                rows={4}
                                                name="otherInformation"
                                                value={serviceOrder.otherInformation || ''}
                                                onChange={handleServiceOrderChanges("otherInformation")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>
                    Save
                </button>

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
                    onClose={() => handleCloseModal('costCenter')}
                    onSave={() => handleSaveChanges('costCenter')}
                >
                    <CostCenter ref={costCenterRef} onSubmit={handleSaveChanges} isModalOpen={isCostCenterModalOpen}/>
                </Modal>

            </div>
        </>
    );
}

export default ServiceOrder;
