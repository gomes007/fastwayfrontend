import Swal from "sweetalert2";

const TableEquipment = ({ equipments, setEditEquipment, setDeleteEquipment }) => {

    const handleDeleteEquipment = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this equipment!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete'
        }).then((result) => {
            if (result.isConfirmed) {
                setDeleteEquipment(equipments.filter((equipment, i) => i !== index));
            }
        })
    }

    return (
        <div className="table-responsive tb">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Model</th>
                        <th scope="col">Series_Number</th>
                        <th scope="col">Conditions</th>
                        <th scope="col">Flaws</th>
                        <th scope="col">Fittings</th>
                        <th scope="col">Solution</th>
                        <th scope="col">Technical_Report</th>
                        <th scope="col">Warranty_Terms</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        equipments?.map((equipment, index) => {
                            return (
                                <tr key={index}>
                                    <td>{equipment.name}</td>
                                    <td>{equipment.brand}</td>
                                    <td>{equipment.model}</td>
                                    <td>{equipment.seriesNumber}</td>
                                    <td>{equipment.conditions}</td>
                                    <td>{equipment.flaws}</td>
                                    <td>{equipment.fittings}</td>
                                    <td>{equipment.solution}</td>
                                    <td>{equipment.technicalReport}</td>
                                    <td>{equipment.warrantyTerms}</td>
                                    <td className='tableButtons'>
                                        <button className='btn btn-outline-dark'
                                            onClick={() => setEditEquipment({ ...equipment, index })}>
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                        <button className='btn btn-outline-danger mt-2'
                                            onClick={() => handleDeleteEquipment(index)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TableEquipment;
