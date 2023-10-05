import React, {useEffect, useState} from 'react';
import AsyncSelect from 'react-select/async';
import ProductService from '@/services/productService';
import serviceOrderService from "@/services/serviceOrderService";


function ProductRow({onProductChange, onRemove, onAdd}) {

    const [serviceOrderProduct, setServiceOrderProduct] = useState({
        product: {
            price: {
                salePrice: 0
            }
        },
        quantity: "",
        discountType: "amount",  // default to "amount"
        discountAmount: 0,
        discountPercent: 0,
        totalValue: 0
    });


    const loadProducts = async (inputValue) => {
        const response = await ProductService.searchProductsByName(inputValue);
        return response.content.map(product => ({value: product.productName, label: product.productName}));
    };

    const handleProductSelection = async (selectedOption) => {
        if (!selectedOption) return;

        const selectedProductName = selectedOption.value;
        const products = await ProductService.searchProductsByName(selectedProductName);
        const selectedProduct = products.content[0];

        if (selectedProduct) {
            setServiceOrderProduct(prev => ({
                ...prev,
                product: selectedProduct
            }));

            if (onProductChange) {
                onProductChange(selectedProductName);
            }
        }
    };


    const handleDiscountTypeChange = (e) => {
        const discountType = e.target.value;
        if (discountType === "amount") {
            setServiceOrderProduct(prev => ({
                ...prev,
                discountType: "amount",
                discountPercent: 0  // Zerando discountPercent quando selecionado "$"
            }));
        } else {
            setServiceOrderProduct(prev => ({
                ...prev,
                discountType: "percent",
                discountAmount: 0  // Zerando discountAmount quando selecionado "%"
            }));
        }
    };




    useEffect(() => {
        const fetchSubtotal = async () => {
            const productDataToSend = {...serviceOrderProduct};
            delete productDataToSend.discountType;

            const subtotal = await serviceOrderService.calculateSubtotal(productDataToSend)
            if (subtotal) {
                setServiceOrderProduct(prevState => ({
                    ...prevState,
                    totalValue: subtotal
                }));
            }
        };

        if (serviceOrderProduct.product && serviceOrderProduct.quantity) {
            fetchSubtotal();
        }
    }, [serviceOrderProduct.product.price.salePrice, serviceOrderProduct.quantity, serviceOrderProduct.discountAmount, serviceOrderProduct.discountPercent]);



    const borderStyle = {
        border: '1px solid #e0e0e0',
        borderRadius: '.25rem',
        padding: '.375rem .75rem',
        display: 'inline-block',
        height: '100%',
        boxSizing: 'border-box'
    };


    return (
        <tr>
            <td className="text-center">
                <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadProducts}
                    onChange={handleProductSelection}
                    placeholder="Type to search..."
                />
            </td>
            <td className='d-flex align-items-center justify-content-center'>
                <input
                    className="form-control text-center"
                    type="number"
                    value={serviceOrderProduct.quantity}
                    onChange={(e) => setServiceOrderProduct(prev => ({
                        ...prev,
                        quantity: e.target.value
                    }))}
                    style={{width: "90px", maxWidth: "90px"}}
                />
            </td>
            <td className="text-center align-middle">
                <div>
                    {serviceOrderProduct.product.price.salePrice.toFixed(2)}
                </div>
            </td>
            <td className='d-flex align-items-center justify-content-center'>
                <input
                    className="form-control text-center mr-2"
                    type="number"
                    value={serviceOrderProduct.discountType === "amount" ? serviceOrderProduct.discountAmount : serviceOrderProduct.discountPercent}
                    onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (serviceOrderProduct.discountType === "amount") {
                            setServiceOrderProduct(prev => ({
                                ...prev,
                                discountAmount: value,
                                discountPercent: 0
                            }));
                        } else {
                            setServiceOrderProduct(prev => ({
                                ...prev,
                                discountPercent: value, // Sem divisão por 100
                                discountAmount: 0
                            }));
                        }
                    }}
                    style={{width: "90px", maxWidth: "90px"}}
                />
                <select
                    value={serviceOrderProduct.discountType}
                    onChange={handleDiscountTypeChange}>
                    <option value="amount">$</option>
                    <option value="percent">%</option>
                </select>
            </td>


            <td className="text-center align-middle">
                <div>
                    {serviceOrderProduct.totalValue ? serviceOrderProduct.totalValue.toFixed(2) : '0.00'}
                </div>
            </td>
            <td className="text-center">
                <button className="btn btn-danger mr-12px" onClick={onRemove}><i className="fa fa-trash"></i></button>
                <button className="btn btn-primary" onClick={onAdd}><i className="fa fa-plus"></i></button>
            </td>
        </tr>
    );
}

export default ProductRow;
