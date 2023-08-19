import React, {useEffect, useState} from 'react';
import NavTitle from "@/components/NavTitle/NavTitle";
import providerService from "@/services/providerService";
import Swal from "sweetalert2";
import FieldForm from "@/components/Form/FieldForm";
import ReactPaginate from "react-paginate";
import {useRouter} from "next/router";


function ProvidersList() {

    const router = useRouter();

    const [providers, setProviders] = useState([]);


    const [companyTypeFilter, setCompanyTypeFilter] = useState('all');
    const [situationFilter, setSituationFilter] = useState('all');
    const [nameFilter, setNameFilter] = useState('');


    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;


    const applyFilters = (items) => {
        let filteredProviders = items;

        if (nameFilter) {
            filteredProviders = filteredProviders.filter(provider => provider.generalInformation.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }

        if (companyTypeFilter !== 'all') {
            filteredProviders = filteredProviders.filter(provider => provider.generalInformation.companyType.toLowerCase() === companyTypeFilter.toLowerCase());
        }

        if (situationFilter !== 'all') {
            filteredProviders = filteredProviders.filter(provider => provider.generalInformation.situation.toLowerCase() === situationFilter.toLowerCase());
        }

        return filteredProviders;
    }

    useEffect(() => {
        providerService.getAllProviders(currentPage + 1, itemsPerPage)
            .then(data => {
                //debugger;
                if (Array.isArray(data.items)) {
                    const filteredProviders = applyFilters(data.items);
                    setProviders(filteredProviders);
                    setTotalPages(data.totalPages || 1);
                } else {
                    console.error("Unexpected response data:", data.items);
                }
            })
            .catch(error => {
                console.error("Error retrieving providers: ", error);
            });
    }, [currentPage, nameFilter, companyTypeFilter, situationFilter]);

    const handleEdit = id => {
        router.push(`/provider?id=${id}`);
    };

    const handleDeleteProvider = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this provider!",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete',
            width: '300px',
            height: '200px'
        }).then((result) => {
            if (result.isConfirmed) {
                providerService.deleteProvider(id)
                    .then(() => {
                        setProviders(providers.filter(provider => provider.id !== id));

                    })
                    .catch(error => {
                        console.error("Error deleting provider: ", error);
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the provider. Please try again.',
                            'error'
                        )
                    });
            }
        });
    };


    return (
        <>
            <NavTitle
                title="Providers List"
                path={[
                    {name: "Home", link: "/"},
                    {name: "Add", link: "/provider"}
                ]}
            />

            <div className="filter-section mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <FieldForm
                            label="Filter by Name:"
                            type="text"
                            name="nameFilter"
                            value={nameFilter}
                            onChange={e => setNameFilter(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <FieldForm
                            label="Company Type:"
                            type="select"
                            name="companyTypeFilter"
                            value={companyTypeFilter}
                            onChange={e => setCompanyTypeFilter(e.target.value)}
                            options={[
                                {value: "all", label: "All"},
                                {value: "Person", label: "Person"},
                                {value: "Company", label: "Company"},
                            ]}
                        />
                    </div>
                    <div className="col-md-3">
                        <FieldForm
                            label="Situation:"
                            type="select"
                            name="situationFilter"
                            value={situationFilter}
                            onChange={e => setSituationFilter(e.target.value)}
                            options={[
                                {value: "all", label: "All"},
                                {value: "Active", label: "Active"},
                                {value: "Inactive", label: "Inactive"},
                            ]}
                        />
                    </div>
                </div>
            </div>


            <div className='form-content mt-3 table-responsive'>
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>CompanyType</th>
                        <th>Situation</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {providers.map((provider, index) => (
                        <tr key={provider.id}>
                            <td>{provider.generalInformation.name}</td>
                            <td>{provider.generalInformation.email}</td>
                            <td>{provider.generalInformation.phone}</td>
                            <td>{provider.generalInformation.companyType}</td>
                            <td>{provider.generalInformation.situation}</td>
                            <td>
                                <button onClick={() => {
                                    handleEdit(provider.id)
                                }} style={{border: 'none'}} className="btn btn-outline-dark mr-15px">
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button onClick={() => {
                                    handleDeleteProvider(provider.id)
                                }} style={{border: 'none'}} className="btn btn-outline-danger">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({selected}) => setCurrentPage(selected)}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />

            </div>
        </>
    );
}

export default ProvidersList;
