import React from 'react';

const PositionSalaryData = ({ positions, selectedPosition, handlePositionChange, employee }) => {

    return (
        <>
            <div className="col-md-6">
                <h3>
                    <i className="fas fa-dollar-sign"></i>
                    Position and Salary
                </h3>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <label>Position</label>
                    <select name="positionSalary" className='form-select'
                            value={selectedPosition ? selectedPosition.id.toString() : ''}
                            onChange={handlePositionChange}>
                        <option value="">Select position</option>
                        {Array.isArray(positions) && positions.map((position, index) => (
                            <option key={index}
                                    value={position.id}>{position.position}</option>
                        ))}
                    </select>



                </div>
            </div>

            <div className="row">
                <div className="col-md-2 mt-2">
                    <label>Salary </label>
                    <input
                        type="text"
                        name="salary"
                        className='form-control bg-secondary'
                        value={selectedPosition ? selectedPosition.salary : ''}
                        readOnly
                    />
                </div>
                <div className="col-md-2 mt-2">
                    <label>Commission</label>
                    <input
                        type="text"
                        name="commission"
                        className='form-control bg-secondary'
                        value={selectedPosition ? selectedPosition.commission : ''}
                        readOnly
                    />
                </div>
            </div>
        </>
    );
};

export default PositionSalaryData;
