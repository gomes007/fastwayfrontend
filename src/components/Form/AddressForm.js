import React, {useState} from "react";
import FieldForm from "./FieldForm";
import TableAddress from "./TableAddress";

const AddressForm = ({addressesList, setAddressesList}) => {

    const [address, setAddress] = useState({
        zipCode: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: '',
    });


    const [modalShow, setModalShow] = useState(false);

    const handleAddress = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
        console.log(address);

        if (e.target.name === 'zipCode' && e.target.value.length === 8) {
            fetch(`https://viacep.com.br/ws/${e.target.value}/json/`)
                .then(response => response.json())
                .then(data => {
                    setAddress({
                        ...address,
                        zipCode: data.cep,
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    });
                });
        }
    }



    const handleAddAddress = () => {
        let newAddresses = addressesList;


        if (address.index !== undefined) {
            newAddresses[address.index] = {...address};
        } else {
            if (newAddresses !== undefined && newAddresses.length > 0) {
                newAddresses.push({...address});
            } else {
                newAddresses = [{...address}]
            }
        }

        setAddressesList(newAddresses);

        setAddress({
            zipCode: '',
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            complement: '',
        });
    }



    return (
        <>

            <div className="row">
                <div className="col-md-12">
                    <h6>
                        <i className="fa fa-list-alt margin-right-5px"></i>
                        <span> Address</span>
                    </h6>
                </div>
            </div>

            <div className="address-form">
                <div className="row">
                    <>
                        <div className="col-md-2">
                            <FieldForm
                                label="ZipCode"
                                type="text"
                                name="zipCode"
                                value={address?.zipCode}
                                onChange={(e) => handleAddress(e)} e
                            />
                        </div>

                        <div className="col-md-5">
                            <FieldForm
                                label="Street"
                                type="text"
                                name="street"
                                value={address?.street}
                                onChange={(e) => handleAddress(e)}
                            />
                        </div>

                        <div className="col-md-2">
                            <FieldForm
                                label="Number"
                                type="number"
                                name="number"
                                value={address?.number}
                                onChange={(e) => handleAddress(e)}
                            />
                        </div>

                        <div className="col-md-3">
                            <FieldForm
                                label="Complement"
                                type="text"
                                name="complement"
                                value={address?.complement}
                                onChange={(e) => handleAddress(e)}
                            />
                        </div>

                        <div className="col-md-3">
                            <FieldForm
                                label="Neighborhood"
                                type="text"
                                name="neighborhood"
                                value={address?.neighborhood}
                                onChange={(e) => handleAddress(e)}
                            />
                        </div>


                        <div className="col-md-3">
                            <FieldForm
                                label="City"
                                type="text"
                                name="city"
                                value={address?.city}
                                onChange={(e) => handleAddress(e)}
                            />
                        </div>

                        <div className="col-md-3">
                            <FieldForm
                                label="State"
                                type="text"
                                name="state"
                                value={address?.state}
                                onChange={(e) => handleAddress(e)}
                            />
                        </div>
                    </>
                </div>

                {address.index !== undefined && (
                    <input type='hidden' name='index' value={address.index}/>
                )}

                <div className="buttonAddEdit">
                    <button className="btn btn-outline-secondary"
                            onClick={() => handleAddAddress()}>
                        {address.index === undefined ? 'Add' : 'Edit'}
                    </button>
                </div>
            </div>

            <TableAddress
                addresses={addressesList}
                setEditAddress={setAddress}
                setDeleteAddress={setAddressesList}
            />
        </>
    )
}

export default AddressForm
