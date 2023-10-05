import React, {useEffect, useState} from 'react';
import ProductRow from '../components/ProductRow';

function ProductTable() {
    const [rows, setRows] = useState([{}]);
    const [totalValue, setTotalValue] = useState(0);

    const addRow = () => {
        setRows([...rows, {}]);
    };

    const removeRow = (indexToRemove) => {
        setRows(rows.filter((_, index) => index !== indexToRemove));
    };

    const handleRowChange = (updatedRow, rowIndex) => {
        const newRows = [...rows];
        newRows[rowIndex] = updatedRow;
        setRows(newRows);
        console.log("Updated rows:", newRows);
    };


    useEffect(() => {
        const newTotal = rows.reduce((sum, row) => sum + (row.totalValue || 0), 0);
        setTotalValue(newTotal);
        console.log("Total value:", newTotal);
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
                        onRowUpdate={(updatedRow) => handleRowChange(updatedRow, index)}
                        serviceOrderProduct={row}
                    />

                ))}
                </tbody>
            </table>
            <div className="text-right mt-4">
                <strong>Total: ${totalValue.toFixed(2)}</strong>
            </div>
        </div>
    );
}

export default ProductTable;
