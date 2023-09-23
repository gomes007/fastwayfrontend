import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import productService from "@/services/productService";
import NavTitle from "@/components/NavTitle/NavTitle";
import FieldForm from "@/components/Form/FieldForm";
import {GrCaretNext, GrCaretPrevious} from "react-icons/gr";
import Swal from "sweetalert2";


function ProductsList() {

    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [providers, setProviders] = useState([]);

    const [nameFilter, setNameFilter] = useState('');
    const [providerFilter, setProviderFilter] = useState('');

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);


    const [paginationInfo, setPaginationInfo] = useState({
        itemsPerPage: 10,
        currentPage: 1,
        totalRecordsQuantity: 0,
        totalPages: 1,
        previousPage: null
    });


    const fetchProducts = useCallback(async () => {
        let fetchedProducts;

        if (nameFilter) {
            const {content} = await productService.searchProductsByName(nameFilter);
            fetchedProducts = content || [];
        } else if (providerFilter) {
            const {content} = await productService.searchProductsByProviderName(providerFilter, page, size);
            fetchedProducts = content || [];
        } else {
            const response = await productService.getAllProductsPages(page, size);
            fetchedProducts = response.items || [];
            setPaginationInfo({
                itemsPerPage: response.itemsPerPage,
                currentPage: response.currentPage,
                totalRecordsQuantity: response.totalRecordsQuantity,
                totalPages: response.totalPages,
                previousPage: response.previousPage
            });
        }
        setProducts(fetchedProducts);

        const allProviders = fetchedProducts.flatMap(product => product.providers);
        const uniqueProviders = Array.from(new Set(allProviders.map(provider => provider.id)))
            .map(id => allProviders.find(provider => provider.id === id));

        setProviders(uniqueProviders);

        const fetchAllAttachments = await Promise.all(
            fetchedProducts.map(async product => {
                const attachments = await productService.getProductAttachmentsById(product.id);
                return {
                    ...product,
                    images: attachments.map(a => `data:image/jpeg;base64,${a.imageData}`)
                };
            })
        );
        setProducts(fetchAllAttachments);
    }, [nameFilter, providerFilter, page, size]);


    useEffect(() => {
        fetchProducts();
    }, [nameFilter, providerFilter, page, size, fetchProducts]);



    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this product!",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete',
            width: '300px',
            height: '200px'
        }).then((result) => {
            if (result.isConfirmed) {
                productService.deleteProduct(id)
                    .then(() => {
                        setProducts(products.filter(product => product.id !== id));

                    })
                    .catch(error => {
                        console.error("Error deleting provider: ", error);
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the product. Please try again.',
                            'error'
                        )
                    });
            }
        });
    };


    const handleEdit = id => {
        router.push(`/product?id=${id}`);
    };

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
                                    <div className="col-12 col-md-3">
                                        <label htmlFor="providerFilter">Search by Provider</label>
                                        <select className="form-select"
                                            id="providerFilter"
                                            name="providerFilter"
                                            value={providerFilter}cwedsas
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
                                    <div className="col-12 table-responsive">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Unit Cost</th>
                                                <th>Sales Price</th>
                                                <th>Provider</th>
                                                <th>Images</th>
                                                <th>Stock</th>
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
                                                        {product.images && product.images.length > 0 && (
                                                            <div id={`carousel${product.id}`} className="carousel slide" data-bs-ride="carousel" style={{width: '50px'}}>
                                                                <div className="carousel-inner">
                                                                    {product.images.map((image, idx) => (
                                                                        <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
                                                                            <img src={image} className="d-block w-100" alt={`product-${index}-image-${idx}`} />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <button className="carousel-control-prev" type="button" data-bs-target={`#carousel${product.id}`} data-bs-slide="prev">
                                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                </button>
                                                                <button className="carousel-control-next" type="button" data-bs-target={`#carousel${product.id}`} data-bs-slide="next">
                                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>{product.inventory.currentQuantity}</td>

                                                    <td>
                                                        <button onClick={() => {
                                                            handleEdit(product.id)
                                                        }} style={{border: 'none'}} className="btn btn-outline-dark mr-15px">
                                                            <i className="fa-solid fa-pen"></i>
                                                        </button>
                                                        <button onClick={() => {
                                                            handleDeleteProduct(product.id)
                                                        }} style={{border: 'none'}} className="btn btn-outline-danger">
                                                            <i className="fa-solid fa-trash-can"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                        <div className="pagination">
                                            <div
                                                onClick={() => {
                                                    if (page !== 1) {
                                                        setPage(Math.max(page - 1, 1))
                                                    }
                                                }}
                                                style={{
                                                    cursor: (page === 1 ? 'not-allowed' : 'pointer'),
                                                    opacity: (page === 1 ? 0.5 : 1)
                                                }}
                                            >
                                                <GrCaretPrevious size={15} />
                                            </div>
                                            <span>Page {page} of {paginationInfo.totalPages}</span>
                                            <div
                                                onClick={() => setPage(Math.min(page + 1, paginationInfo.totalPages))}
                                                style={{ cursor: 'pointer', opacity: (page === paginationInfo.totalPages ? 0.5 : 1) }}
                                            >
                                                <GrCaretNext size={15} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-12">
                                        <span>Total records: {paginationInfo.totalRecordsQuantity}</span>
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
