import React from 'react';
import {useState} from 'react';
import NavTitle from "@/components/NavTitle/NavTitle";
import FieldForm from "@/components/Form/FieldForm";
import positionSalaryService from "@/services/positionSalaryService";

function PositionSalary() {

    const [position, setPosition] = useState({
        position: '',
        salary: '',
        commission: ''
    });

    const handlePositionChange = (event) => {
        setPosition({
            ...position,
            [event.target.name]: event.target.value
        });
    }

    const savePositionSalary = () => {

        const positionSalary = {
            position: position.position,
            salary: position.salary,
            commission: position.commission
        };

        return positionSalaryService.createNewPositionSalary(positionSalary)
            .then((data) => {
                console.log('Position Salary registered', data);
                setPosition({
                    position: "",
                    salary: "",
                    commission: ""
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <>
            <NavTitle
                title="Position Salary"
                path={[
                    {name: "Home", link: "/"},
                    {name: "Position Salary", link: "/positionSalary"}

                ]}
            />

            <div className="container">
                <div className="card mt-5 p-4">
                    <div className="card-header bg-light">
                        <h3>Position Salary Register</h3>
                    </div>
                    <div className="card-body">
                        <div className="col-md-8">
                            <FieldForm
                                label="Position"
                                type="text"
                                name="position"
                                value={position?.position}
                                onChange={(e) => handlePositionChange(e)}
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <FieldForm
                                    label="Salary"
                                    type="number"
                                    name="salary"
                                    value={position?.salary}
                                    onChange={(e) => handlePositionChange(e)}
                                />
                            </div>
                            <div className="col-md-4">
                                <FieldForm
                                    label="Commission"
                                    type="number"
                                    name="commission"
                                    value={position?.commission}
                                    onChange={(e) => handlePositionChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-03 d-flex justify-content-end">
                        <button className="btn btn-primary" type="submit" onClick={savePositionSalary}>Submit</button>
                    </div>
                </div>

            </div>


        </>
    );
}

export default PositionSalary;
