import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import productService from "@/services/productService";
import NavTitle from "@/components/NavTitle/NavTitle";

function ProductsList() {

    const router = useRouter();

    const [products, setProducts] = useState([]);

    const [nameFilter, setNameFilter] = useState('');

    const applyFilters = (items) => {
        let filteredProducts = items;

        if (nameFilter) {
            filteredProducts = filteredProducts.filter(product => product.productName.toLowerCase().includes(nameFilter.toLowerCase()));
        }

        return filteredProducts;
    }

    async function fetchProducts(query) {
        const data = await productService.searchProductsByName(query);
        return data.content || [];
    }


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
                                        <div className="form-group">
                                            <label htmlFor="nameFilter">Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="nameFilter"
                                                value={nameFilter}
                                                onChange={event => setNameFilter(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Unit Cost</th>
                                                <th>Picture</th>
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
