import React, {useState} from 'react';
import customerService from "@/services/customerService";
import AsyncSelect from "react-select/async";
import FieldForm from "@/components/Form/FieldForm";
import {BsClipboard2Data} from "react-icons/bs";
import {MdAdd} from "react-icons/md";
import NavTitle from "@/components/NavTitle/NavTitle";
import {GiAutoRepair} from "react-icons/gi";
import Modal from "@/components/Modal/modal";
import customer from "@/pages/customer";

function ServiceOrder() {


  const [serviceOrder, setServiceOrder] = useState({
    customer: null, // ou {}
    channelSales: '',
    startDate: '',
    endDate: '',
    discountAmount: '',
    discountPercent: '',
    total: '',
    otherInformation: '',
    status: 'select',
    costCenter: null, // ou {}
  });


  const [serviceOrderServices, setServiceOrderServices] = useState(
    {
      service: null, // ou {}
      details: '',
      quantity: 0,
      discountPercent: '',
      discountAmount: '',
      totalValue: '',
    },
  );



    const [selectValue, setSelectValue] = useState(null);



    // function to load customers from the API
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
            });
            return options;
        } catch (error) {
            console.error("Error loading customers:", error);
            return [];
        }
    };

    const [isModalOpen, setModalOpen] = useState(false);

    const handleAddButtonClick = () => {
        setModalOpen(true);
        console.log('Botão Adicionar Cliente clicado!');
    };


    const formatOptionLabel = (option, { context }) => {
        if (context === 'menu' && option.isAddButton) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleAddButtonClick}>
                    <MdAdd size={20} style={{ marginRight: '5px' }} />
                    Add new customer
                </div>
            );
        }
        return option.label;
    };
    // end function to load customers from the API


    const handleServiceOrderChange = (field) => (data) => {
        // Verificar primeiro se é o botão especial
        if (data && data.isAddButton) {
            handleAddButtonClick();
            return;
        }

        // Depois, verificar se o evento vem de um campo normal
        if (data && data.target) {
            setServiceOrder({
                ...serviceOrder,
                [data.target.name]: data.target.value
            });
        } else {
            // Se vier de um AsyncSelect...
            if (field === "customer") {
                setSelectValue(data);
            }
            // você pode adicionar mais condicionais para outros AsyncSelects aqui.

            if (data) {
                setServiceOrder(prevState => ({
                    ...prevState,
                    [field]: data.value
                }));
            } else {
                setServiceOrder(prevState => ({
                    ...prevState,
                    [field]: null
                }));
            }
        }
    };




    function handleSubmit() {

    }

    function handleChange() {

    }

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
                    <div className="card shadow mb-4 mt-3">
                        <div className="card-header" style={{backgroundColor: '#F5F5F5FF'}}>
                            <h4 className="card-title" style={{display: 'flex' ,alignItems: "center"}}>
                                <BsClipboard2Data style={{marginRight: 10}}/>
                                General Informations
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="mycss">
                                            <label>Customer</label>
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                loadOptions={loadCustomers}
                                                value={selectValue}
                                                isClearable
                                                onChange={handleServiceOrderChange("customer")}
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
                                                onChange={handleServiceOrderChange("status")}
                                                options={[
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
                                                onChange={handleServiceOrderChange("startDate")}
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
                                                onChange={handleServiceOrderChange("endDate")}
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
                                                onChange={handleServiceOrderChange("channelSales")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2>Adicionar Cliente</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">

                        </div>
                    </div>
                </div>
            </Modal>
        </div>


    </>
  );
}

export default ServiceOrder;
