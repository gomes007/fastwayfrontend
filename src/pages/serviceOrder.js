import React, {useState} from 'react';
import customerService from "@/services/customerService";
import AsyncSelect from "react-select/async";

function ServiceOrder() {


  const [ServiceOrder, setServiceOrder] = useState({
    customer: null, // ou {}
    channelSales: '',
    startDate: '',
    endDate: '',
    discountAmount: '',
    discountPercent: '',
    total: '',
    otherInformation: '',
    status: 'select',
  });


  const [serviceOrderServices, setServiceOrderServices] = useState([
    {
      service: null, // ou {}
      details: '',
      quantity: 0,
      discountPercent: '',
      discountAmount: '',
      totalValue: '',
    },
  ]);



    const [selectValue, setSelectValue] = useState(null);

    const loadCustomers = async (inputValue) => {
        try {
            const data = await customerService.searchCustomerByName(inputValue);
            const items = data.items || [];
            return items.map(customer => ({
                value: customer.generalInformation.id,
                label: customer.generalInformation.name
            }));
        } catch (error) {
            console.error("Error loading customers:", error);
            return [];
        }
    };



    function handleSubmit() {

    }

    function handleChange() {

    }

    return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h4 className="card-title">General Informations</h4>
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
                                                value={selectValue}
                                                isClearable
                                                onChange={setSelectValue}
                                                placeholder="Type to search..."
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
    </>
  );
}

export default ServiceOrder;
