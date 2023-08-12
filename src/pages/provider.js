import React, {useEffect, useState} from 'react';
import NavTitle from "@/components/NavTitle/NavTitle";
import TabForm from "@/components/Form/TabForm";
import OthersInformationsData from "@/components/Form/othersInformationsData";
import AddressForm from "@/components/Form/AddressForm";
import providerService from "@/services/providerService";
import {useRouter} from "next/router";

function Provider() {

    const [provider, setProvider] = useState({
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


    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        if (query.id) {
            providerService.getProviderById(query.id)
                .then(data => {
                    const providerData = data;
                    setProvider(providerData.generalInformation);
                    setAddress(providerData.addresses);
                })
                .catch(error => console.error('Error getting provider:', error));
        }
    }, [query.id]);




    const handleProvider = (e) => {
        setProvider({...provider, [e.target.name]: e.target.value});
    }

    const redirectToProviderList = () => {
        router.push('/providersList');
    }

    const saveProvider = () => {
        let data = {
            generalInformation: {
                ...provider,
            },
            addresses: address
        };

        if (query.id) {
            return providerService.updateProvider(query.id, data)
                .then((data) => {
                    console.log("Provider updated: ", data);
                    redirectToProviderList();
                });
        } else {
            return providerService.createNewProvider(data)
                .then((data) => {
                    console.log("Provider created: ", data);
                });
        }
    };



    return (
        <>
            <NavTitle
                title="Add Provider"
                path={[
                    {name: "Home", link: "/"},
                    {name: "List", link: "/providerList"}
                ]}
            />

            <TabForm
                tabs={[
                    {
                        label: "Provider Information",
                        content: (
                            <OthersInformationsData
                                provider={provider}
                                handleProvider={handleProvider}
                            />
                        ),
                    },
                    {
                        label: 'Address',
                        content: (
                            <>
                                <AddressForm
                                    addressesList={address}
                                    setAddressesList={setAddress}
                                />
                            </>
                        )
                    },
                ]}
            />
            <div className="row">
                <div className="col-md-12">
                    <div className="float-right">
                        <button onClick={saveProvider} type="button" className="btn btn-success">
                            <i className="fa fa-save mr-12px"></i>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Provider;
