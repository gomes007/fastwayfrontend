import React, {useEffect, useState} from 'react';
import NavTitle from "@/components/NavTitle/NavTitle";
import TabForm from "@/components/Form/TabForm";
import FieldForm from "@/components/Form/FieldForm";

import {GiWeightScale} from "react-icons/gi";
import {BsBox, BsClipboard2CheckFill} from "react-icons/bs";
import {IoPricetagsOutline} from "react-icons/io5";
import {AiOutlineStock} from "react-icons/ai";

import Select from 'react-select';

import ProductService from "@/services/productService";
import serviceProvider from "@/services/providerService";


function Product() {

    const [product, setProduct] = useState({
        productName: '',
        barCode: '',
        weight: '',
        height: '',
        length: '',
        description: '',
        commission: ''
    });

    const [details, setDetails] = useState({
        enabled: false,
        soldSeparately: false,
        enabledOnPDV: false,
    });

    const [price, setPrice] = useState({
        unitCost: 0,
        additionalCost: 0,
        finalCost: 0,
        profitPercent: 0,
        salePrice: 0,
    });

    const [inventory, setInventory] = useState({
        minQuantity: 0,
        maxQuantity: 0,
        currentQuantity: 0,
    });

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);




    const handleProduct = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
    }

    const handleDetails = (e) => {
        const name = e.target.name;
        const currentValue = details[name];
        setDetails({
            ...details,
            [name]: !currentValue
        });
    }

    const handlePrice = async (e) => {
        const updatePrice = {...price, [e.target.name]: e.target.value};
        setPrice(updatePrice);

        if (['unitCost', 'additionalCost', 'profitPercent'].includes(e.target.name)) {
            const calculatedPrice = await ProductService.calculateProductPrice(updatePrice);
            setPrice(calculatedPrice);
        }
    }

    const handleInventory = (e) => {
        setInventory({...inventory, [e.target.name]: e.target.value});
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        let validFiles = [];
        let errorMessages = [];

        files.forEach(file => {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const validExtensions = ['jpg', 'jpeg', 'gif', 'png'];

            if (!validExtensions.includes(fileExtension)) {
                errorMessages.push(`Formato do arquivo ${file.name} não suportado, envie imagens em formato jpg, jpeg, gif ou png.`);
            } else {
                validFiles.push(file);
            }
        });

        if (errorMessages.length > 0) {
            alert(errorMessages.join('\n'));
            return;
        }

        const newPreviews = validFiles.map(file => URL.createObjectURL(file));

        setUploadedFiles([...uploadedFiles, ...validFiles]);
        setPreviews([...previews, ...newPreviews]);
    };

    const removeFile = (index) => {
        const newFiles = [...uploadedFiles];
        newFiles.splice(index, 1);
        setUploadedFiles(newFiles);

        const newPreviews = [...previews];
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    //find providers
    const [providers, setProviders] = useState([]);
    const [input, setInput] = useState('');
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState(null);


    useEffect(() => {
        async function fetchProviders() {
            const data = await serviceProvider.getAllProviders();
            console.log('Providers:', data);
            if (data && data.items) {
                setProviders(data.items);
            } else {
                setProviders([]);
            }
        }

        fetchProviders();
    }, []);


    useEffect(() => {
        if (input) {
            const filtered = providers.filter(provider =>
                provider.generalInformation && provider.generalInformation.name.toLowerCase().includes(input.toLowerCase())
            );
            console.log('Filtered Providers:', filtered);
            setFilteredProviders(filtered);
        } else {
            setFilteredProviders([]);
        }
    }, [input, providers]);

    const options = providers.map(provider => ({
        value: provider.id,
        label: provider.generalInformation.name
    }));

    //end find providers




    return (
        <>
            <NavTitle
                icon={<BsBox style={{fontSize: "20px"}}/>}
                title="Product"
                path={[
                    {name: "Products", path: "/productsList"},
                    {name: "Add Product", path: "/product"}
                ]}
            />

            <TabForm
                tabs={[
                    {
                        label: "General Data",
                        content: (
                            <div className="tab-content">
                                <div className="row">
                                    <div className="col-md-6">
                                        <FieldForm
                                            label="Product Name"
                                            type="text"
                                            name="productName"
                                            value={product.productName}
                                            onChange={(e) => handleProduct(e)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <FieldForm
                                            label="Bar Code"
                                            type="text"
                                            name="barCode"
                                            value={product.barCode}
                                            onChange={(e) => handleProduct(e)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <FieldForm
                                            label="Commission (%)"
                                            type="number"
                                            name="commission"
                                            value={product.commission}
                                            onChange={(e) => handleProduct(e)}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <GiWeightScale style={{fontSize: "20px", marginRight: "5px"}}/>
                                                Weight and Dimensions
                                            </div>
                                            <div className="card-body">
                                                <FieldForm
                                                    label="Weight"
                                                    type="text"
                                                    name="weight"
                                                    value={product.weight}
                                                    onChange={(e) => handleProduct(e)}
                                                />
                                                <FieldForm
                                                    label="Height"
                                                    type="text"
                                                    name="height"
                                                    value={product.height}
                                                    onChange={(e) => handleProduct(e)}
                                                />
                                                <FieldForm
                                                    label="Length"
                                                    type="text"
                                                    name="length"
                                                    value={product.length}
                                                    onChange={(e) => handleProduct(e)}
                                                />

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">

                                        <div className="card">
                                            <div className="card-header">
                                                <BsClipboard2CheckFill style={{fontSize: "20px", marginRight: "5px"}}/>
                                                Details
                                            </div>
                                            <div className="card-body mb-2">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <FieldForm
                                                            label="Enabled"
                                                            type="checkbox"
                                                            name="enabled"
                                                            value={details.enabled}
                                                            onChange={(e) => handleDetails(e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <FieldForm
                                                            label="Sold Separately"
                                                            type="checkbox"
                                                            name="soldSeparately"
                                                            value={details.soldSeparately}
                                                            onChange={(e) => handleDetails(e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <FieldForm
                                                            label="Enabled on PDV"
                                                            type="checkbox"
                                                            name="enabledOnPDV"
                                                            value={details.enabledOnPDV}
                                                            onChange={(e) => handleDetails(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <FieldForm
                                            label="Description"
                                            type="textarea"
                                            rows={5}
                                            name="description"
                                            value={product.description}
                                            onChange={(e) => handleProduct(e)}
                                        />

                                    </div>
                                </div>
                            </div>
                        )
                    },
                    {
                        label: "Price & Stock",
                        content: (
                            <div className="tab-content">
                                <div className="row form-group">
                                    <div className="col-md-6 mb-3">
                                        <div className="card">
                                            <div className="card-header">
                                                <IoPricetagsOutline style={{fontSize: "20px", marginRight: "5px"}}/>
                                                Price and Cost
                                            </div>
                                            <div className="card-body">
                                                <div className="row"> {/* Added a row wrapper */}
                                                    <div className="col-md-6">
                                                        <FieldForm
                                                            label="Unit Cost ($)"
                                                            type="number"
                                                            name="unitCost"
                                                            value={price.unitCost}
                                                            onChange={(e) => handlePrice(e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FieldForm
                                                            label="Additional Cost ($)"
                                                            type="number"
                                                            name="additionalCost"
                                                            value={price.additionalCost}
                                                            onChange={(e) => handlePrice(e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FieldForm
                                                            label="Final Cost ($)"
                                                            type="number"
                                                            name="finalCost"
                                                            value={price.finalCost}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FieldForm
                                                            label="Profit (%)"
                                                            type="number"
                                                            name="profitPercent"
                                                            value={price.profitPercent}
                                                            onChange={(e) => handlePrice(e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FieldForm
                                                            label="Sale Price ($)"
                                                            type="number"
                                                            name="salePrice"
                                                            value={price.salePrice}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="card">
                                            <div className="card-header">
                                                <AiOutlineStock style={{fontSize: "20px", marginRight: "5px"}}/>
                                                Stock
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <FieldForm
                                                            label="Stock"
                                                            type="number"
                                                            name="stock"
                                                            value={inventory.currentQuantity}
                                                            onChange={(e) => handleInventory(e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FieldForm
                                                            label="Minimum Stock"
                                                            type="number"
                                                            name="minimumStock"
                                                            value={inventory.minQuantity}
                                                            onChange={(e) => handleInventory(e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FieldForm
                                                            label="Maximum Stock"
                                                            type="number"
                                                            name="maximumStock"
                                                            value={inventory.maxQuantity}
                                                            onChange={(e) => handleInventory(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    },
                    {
                        label: "Pictures",
                        content: (
                            <div className="tab-content">
                                <FieldForm
                                    type="file"
                                    name="productFiles"
                                    value={uploadedFiles}
                                    onChange={handleFileChange}
                                    onRemove={removeFile}
                                    previews={previews}
                                />
                            </div>
                        )
                    },
                    {
                        label: "Provider",
                        content: (

                            <div className="provider-selector">
                                <Select
                                    options={options}
                                    onInputChange={value => setInput(value)}
                                    onChange={option => {
                                        const selected = providers.find(provider => provider.id === option.value);
                                        setSelectedProvider(selected);
                                    }}
                                    placeholder="Type to search for providers..."
                                />
                                {selectedProvider && (
                                    <div>
                                        <h3>Details of {selectedProvider.generalInformation.name}</h3>
                                        <p>Name: {selectedProvider.generalInformation.name}</p>
                                    </div>
                                )}
                            </div>
                        )
                    }
                ]}
            />
        </>
    );
}


export default Product;
