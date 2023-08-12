import React, {useEffect, useState} from 'react';
import axiosInstance from '../services/axiosService';
import NavTitle from "@/components/NavTitle/NavTitle";
import {useRouter} from "next/router";

function ProvidersList() {
    const [providers, setProviders] = useState([]);

    const router = useRouter();

    useEffect(() => {
        axiosInstance.get('/providers')
            .then(res => {
                if (Array.isArray(res.data.items)) {
                    setProviders(res.data.items);
                    console.log("Providers retrieved: ", res.data.items);
                } else {
                    console.error("Unexpected response data:", res.data.items);
                }
            })
            .catch(error => {
                console.error("Error retrieving providers: ", error);
            });
    }, []);

    const handleEdit = id => {
        router.push(`/provider?id=${id}`);
    };




    return (
        <>
            <NavTitle
                title="Providers List"
                path={[
                    { name: "Home", link: "/" },
                    { name: "Add", link: "/provider" }
                ]}
            />
            <div className='form-content'>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Other Informations</th>
                        <th>Fantasy Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {providers.map((provider, index) => (
                        <tr key={provider.id}>
                            <td>{provider.generalInformation.name}</td>
                            <td>{provider.generalInformation.email}</td>
                            <td>{provider.generalInformation.phone}</td>
                            <td>{provider.generalInformation.otherInformations}</td>
                            <td>{provider.generalInformation.fantasyName}</td>
                            <td>
                                <button onClick={() => {handleEdit(provider.id)}} className="btn btn-outline-dark">
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button onClick={() => { /* Handle Delete */ }} className="btn btn-outline-danger mt-2">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </>
    );
}

export default ProvidersList;
