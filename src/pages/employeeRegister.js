import React, { useState } from "react";
import withAuth from "@/services/withAuth";
import FieldForm from "@/components/Form/FieldForm";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

import EmployeeService from "@/services/employeeService";
import AuthService from "@/services/authService";

const EmployeeRegister = () => {
  const router = useRouter();

  const handleLogout = () => {
    AuthService.logout();
    router.push("/login").then((r) => r);
  };

  const [state, setState] = useState({
    name: "",
    cpf: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const employee = {
      name: state.name,
      cpf: state.cpf,
    };

    EmployeeService.saveEmployee(employee, state.file)
      .then((data) => {
        console.log("Employee registered", data);
      })
      .catch((error) => {
        console.error("Error registering employee", error);
      });
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setState({
      ...state,
      file,
    });
    setSelectedFile(URL.createObjectURL(file));
  };

  return (
    <div className="content">
      <form className="form-content" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-sm-6">
            <FieldForm
              label="name"
              name="name"
              type="text"
              value={state.name}
              onChange={handleChange}
              error={errors.name}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <FieldForm
              label="cpf"
              name="cpf"
              type="text"
              value={state.cpf}
              onChange={handleChange}
              error={errors.cpf}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="img">
            {selectedFile && <img src={selectedFile} alt="Selected file" />}
            <label htmlFor="file" className="file-upload-label">
              {selectedFile ? "Change img" : "Select img"}
            </label>
            <input
              type="file"
              className="form-control-file"
              id="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <Button onClick={handleLogout}>Deslogar</Button>
      </form>
    </div>
  );
};

export default withAuth(EmployeeRegister);
