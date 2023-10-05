import React, {useEffect, useState} from 'react';
import ProductRow from '../components/ProductRow';
import serviceOrderService from "@/services/serviceOrderService";


function ProductTable() {

    const [rows, setRows] = useState([{}]);
    const [grandTotal, setGrandTotal] = useState(0);


    const addRow = () => {
        setRows([...rows, {}]);
    };


    const removeRow = (indexToRemove) => {
        setRows(rows.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
        const calculateGrandTotal = async () => {
            const total = await serviceOrderService.calculateTotalFromProducts(rows);
            console.log('Current rows:', rows);
            setGrandTotal(total);
            console.log('Current rows:', grandTotal);
        };

        calculateGrandTotal();
    }, [rows]);



    return (
        <div className="m-4" style={{height: "500px"}}>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th className="text-center">Product name</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Sales price</th>
                    <th className="text-center">Discount</th>
                    <th className="text-center">Subtotal</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <ProductRow
                        key={index}
                        onProductChange={index === rows.length - 1 ? addRow : null}
                        onRemove={() => removeRow(index)}
                        onAdd={addRow}
                    />
                ))}
                </tbody>
            </table>
            <div className="text-right mt-4">
                <strong>Total Geral: </strong>${grandTotal ? grandTotal.toFixed(2) : '0.00'}
            </div>
        </div>
    );
}

export default ProductTable;

