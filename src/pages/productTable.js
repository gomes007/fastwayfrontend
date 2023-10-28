import React, { useEffect, useState } from 'react';
import ProductRow from '../components/ProductRow';

function ProductTable({ onTotalChange, setServiceOrder }) {
    const initialProduct = {
        product: null,
        details: '',
        quantity: 0,
        discountPercent: 0,
        discountAmount: 0,
        totalValue: 0,
    };

    const [rows, setRows] = useState([initialProduct]);
    const [totalValue, setTotalValue] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [averageSalePrice, setAverageSalePrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const addRow = () => {
        setRows([...rows, initialProduct]);
    };

    const removeRow = (indexToRemove) => {
        setRows(rows.filter((_, index) => index !== indexToRemove));
    };

    const handleRowChange = (updatedRow, rowIndex) => {
        const newRows = [...rows];
        newRows[rowIndex] = updatedRow;
        setRows(newRows);
    };

    useEffect(() => {
        const newTotalValue = rows.reduce((sum, row) => sum + (row.totalValue || 0), 0);
        const newTotalQuantity = rows.reduce((sum, row) => sum + (row.quantity || 0), 0);

        const totalSalePrice = rows.reduce((sum, row) => {
            const salePrice = row.product && row.product.price ? row.product.price.salePrice : 0;
            return sum + (salePrice * row.quantity);
        }, 0);

        const newAverageSalePrice = newTotalQuantity ? totalSalePrice / newTotalQuantity : 0;
        const newDiscount = newTotalValue - totalSalePrice;

        setTotalValue(newTotalValue);
        setTotalQuantity(newTotalQuantity);
        setAverageSalePrice(newAverageSalePrice);
        setDiscount(newDiscount);

        onTotalChange(newTotalValue);

        // Atualiza o estado no componente pai
        setServiceOrder(prevState => ({
            ...prevState,
            serviceOrderProducts: rows
        }));
    }, [rows, onTotalChange, setServiceOrder]);

    return (
        <div className="m-4 table-responsive" style={{ height: 'auto' }}>
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
                        onProductChange={null}
                        onRemove={() => removeRow(index)}
                        onAdd={addRow}
                        onRowUpdate={(updatedRow) => handleRowChange(updatedRow, index)}
                        serviceOrderProduct={row}
                    />
                ))}
                <tr>
                    <td className="text-center">
                        <strong>Total</strong>
                    </td>
                    <td className="text-center">
                        <strong>{totalQuantity}</strong>
                    </td>
                    <td className="text-center">
                        <strong>${averageSalePrice.toFixed(2)}</strong>
                    </td>
                    <td className="text-center">
                        <strong>${discount.toFixed(2)}</strong>
                    </td>
                    <td className="text-center">
                        <strong>${totalValue.toFixed(2)}</strong>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;
