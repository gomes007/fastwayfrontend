import React, {useState} from 'react';
import withAuth from "@/services/withAuth";
import {useRouter} from "next/router";
import AuthService from "@/services/authService";
import TabForm from "@/components/Form/TabForm";
import FieldForm from "@/components/Form/FieldForm";
import custumerService from "@/services/customerService";


const Customer = () => {

    const router = useRouter();

    const handleLogout = () => {
        AuthService.logout();
        router.push('/login').then(r => r);
    };


    const [credit, setCredit] = useState({
        creditLimit: 0.0,
        creditLimitExceeded: false
    });


    const [customer, setCustomer] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        otherInformations: '',
        situation: 'select',
        companyType: 'select',

        fantasyName: '',
        cnpj: '',
        razaoSocial: '',
        inscricaoEstadual: '',
        contactName: '',

    });


    const [address, setAddress] = useState([]);


    const handleCustomer = (event) => {
        setCustomer({
            ...customer,
            [event.target.name]: event.target.value
        });
    }

    const handleCredit = (e) => {
        var actualValue = credit[e.target.name];
        var newValue = (e.target.name === 'creditLimitExceeded') ? !actualValue : e.target.value;

        setCredit({
            ...credit,
            [e.target.name]: newValue
        });
    }

    const saveCustomer = () => {
        let data = {
            ...credit,
            generalInformation: {
                ...customer,
            },
            addresses: address
        }
        console.log(data);

        return custumerService.createNewCustomer(data)
            .then((data) => {
                console.log('Customer registered', data);
                setCustomer({
                    name: "",
                    email: "",
                    phone: "",
                    otherInformations: "",
                    situation: "select",
                    companyType: "select",
                    cpf: '',
                    fantasyName: "",
                    cnpj: "",
                    razaoSocial: "",
                    inscricaoEstadual: "",
                    contactName: "",
                });
                setCredit({
                    creditLimit: 0.0,
                    creditLimitExceeded: false
                });
                setAddress([]);
            }).catch((error) => {
                console.log(error);
            });

    }


    return (
        <>
            <div className="content">
                <TabForm
                    tabs={[
                        {
                            label: 'Personal Data',
                            content: (
                                <>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h3>
                                                <i className="fa fa-address-card" aria-hidden="true"></i>
                                                Customer Data
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-3">
                                            <FieldForm
                                                label="Customer type"
                                                type="select"
                                                name="companyType"
                                                value={customer.companyType}
                                                onChange={(e) => handleCustomer(e)}
                                                options={[
                                                    {value: "PERSON", label: "Person"},
                                                    {value: "COMPANY", label: "Company"},
                                                ]}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <FieldForm
                                                label="Situation"
                                                type="select"
                                                name='situation'
                                                value={customer.situation}
                                                onChange={(e) => handleCustomer(e)}
                                                options={[
                                                    {value: "ACTIVE", label: "Active"},
                                                    {value: "INACTIVE", label: "Inactive"},
                                                ]}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <FieldForm
                                                label="Name"
                                                type="text"
                                                name='name'
                                                value={customer.name}
                                                onChange={(e) => handleCustomer(e)}
                                            />
                                        </div>
                                    </div>

                                </>
                            )

                        }
                    ]}
                />
            </div>
        </>
    );
};

export default withAuth(Customer);
