import React, {useState} from 'react';
import NavTitle from "@/components/NavTitle/NavTitle";
import TabForm from "@/components/Form/TabForm";
import FieldForm from "@/components/Form/FieldForm";
import {GiWeightScale} from "react-icons/gi";
import {BsBox, BsClipboard2CheckFill} from "react-icons/bs";


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

    const [providers, setProviders] = useState([]);
    const [photos, setPhotos] = useState([]);


    const handleProduct = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
    }

    const handleDetails = (e) => {
        setDetails({...details, [e.target.name]: e.target.value});
    }

    const handlePrice = (e) => {
        setPrice({...price, [e.target.name]: e.target.value});
    }

    const handleInventory = (e) => {
        setInventory({...inventory, [e.target.name]: e.target.value});
    }


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
                        label: "Product Data",
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
                                    <div className="col-md-4">
                                        <FieldForm
                                            label="Bar Code"
                                            type="text"
                                            name="barCode"
                                            value={product.barCode}
                                            onChange={(e) => handleProduct(e)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <FieldForm
                                            label="Commission"
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
                                        <FieldForm
                                            label="Description"
                                            type="textarea"
                                            rows={5}
                                            name="description"
                                            value={product.description}
                                            onChange={(e) => handleProduct(e)}
                                        />


                                        <div className="card">
                                            <div className="card-header">
                                                <BsClipboard2CheckFill style={{fontSize: "20px", marginRight: "5px"}}/>
                                                Details
                                            </div>
                                            <div className="card-body">
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
                                    </div>
                                </div>
                            </div>

                        )
                    },
                    {
                        label: "Details",
                        content: (
                            <div className="tab-content">
                                <div className="row form-group">

                                </div>
                            </div>
                        )
                    }
                ]}
            />
        </>
    );
}


export default Product;
