import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import productService from "@/services/productService";
import NavTitle from "@/components/NavTitle/NavTitle";
import FieldForm from "@/components/Form/FieldForm";


function ProductsList() {

    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [providers, setProviders] = useState([]);

    const [nameFilter, setNameFilter] = useState('');
    const [providerFilter, setProviderFilter] = useState('');


    const fetchProducts = useCallback(async () => {
        let fetchedProducts;

        if (nameFilter) {
            const { content } = await productService.searchProductsByName(nameFilter);
            fetchedProducts = content || [];
        } else if (providerFilter) {
            const { content } = await productService.searchProductsByProviderName(providerFilter);
            fetchedProducts = content || [];
        } else {
            const { items } = await productService.getAllProducts();
            fetchedProducts = items || [];
        }

        setProducts(fetchedProducts);

        const allProviders = fetchedProducts.flatMap(product => product.providers);
        const uniqueProviders = Array.from(new Set(allProviders.map(provider => provider.id)))
            .map(id => allProviders.find(provider => provider.id === id));
        setProviders(uniqueProviders);

    }, [nameFilter, providerFilter]);

    useEffect(() => {
        fetchProducts();
    }, [nameFilter, providerFilter, fetchProducts]);




    return (
        <>
            <NavTitle
                title="Products"
                path={[
                    {name: "Home", url: "/"},
                    {name: "Products", url: "/products"}
                ]}
            />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow mb-4 mt-3">
                            <div className="card-header py-3">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <h6 className="m-0 font-weight-bold text-primary">Products List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <FieldForm
                                            label="Search by Name"
                                            type="text"
                                            name="nameFilter"
                                            value={nameFilter}
                                            onChange={e => setNameFilter(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="providerFilter">Search by Provider</label>
                                        <select
                                            id="providerFilter"
                                            name="providerFilter"
                                            value={providerFilter}
                                            onChange={e => setProviderFilter(e.target.value)}
                                        >
                                            <option value="">-- Select Provider --</option>
                                            {providers.map(provider => (
                                                <option key={provider.id} value={provider.generalInformation.name}>
                                                    {provider.generalInformation.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Unit Cost</th>
                                                <th>Sales Price</th>
                                                <th>Provider</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {products.map((product, index) => (
                                                <tr key={product.id}>
                                                    <td>{product.productName}</td>
                                                    <td>{product.price.unitCost}</td>
                                                    <td>{product.price.salePrice}</td>
                                                    <td>
                                                        {product.providers.map((provider, index) => (
                                                            <span key={provider.id}>
                                                                {provider.generalInformation.name}{index < product.providers.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))};
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => router.push(`/products/${product.id}`)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-12">
                                        footer
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


export default ProductsList;
