import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import productService from "@/services/productService";
import NavTitle from "@/components/NavTitle/NavTitle";
import FieldForm from "@/components/Form/FieldForm";

function ProductsList() {

    const router = useRouter();

    const [products, setProducts] = useState([]);


    const [nameFilter, setNameFilter] = useState('');


    useEffect(() => {
        productService.getAllProducts()
            .then(res => {
                if (res && res.items) {
                    setProducts(res.items);
                }
            })
            .catch(error => {
                console.error("Error retrieving products: ", error);
            });
    }, []);


    async function fetchProducts(query) {
        const data = await productService.searchProductsByName(query);
        return data.content || [];
    }

    useEffect(() => {
        async function fetchFilteredProducts() {
            if (nameFilter.length < 1) {
                const data = await productService.getAllProducts();
                setProducts(data.items);
                return;
            }
            const filteredProducts = await fetchProducts(nameFilter);
            setProducts(filteredProducts);
        }
        fetchFilteredProducts();
    }, [nameFilter]);


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
                        <div className="card shadow mb-4 mt-">
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
