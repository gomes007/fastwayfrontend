import React from 'react';
import FieldForm from "@/components/Form/FieldForm";

function OthersInformationsData({provider, handleProvider}) {
    return (
        <>
            <>
                <div className="row">
                    <div className="col-md-3">
                        <FieldForm
                            label="Customer type"
                            type="select"
                            name="companyType"
                            value={provider.companyType}
                            onChange={(e) => handleProvider(e)}
                            options={[
                                {value: "PERSON", label: "Person"},
                                {value: "COMPANY", label: "Company"},
                            ]}
                        />
                    </div>
                    <div className="col-md-3">
                        <FieldForm
                            label="Situation"
                            type="select"
                            name='situation'
                            value={provider.situation}
                            onChange={(e) => handleProvider(e)}
                            options={[
                                {value: "ACTIVE", label: "Active"},
                                {value: "INACTIVE", label: "Inactive"},
                            ]}
                        />
                    </div>
                    <div className="col-md-3">
                        <FieldForm
                            label="Name"
                            type="text"
                            name='name'
                            value={provider.name}
                            onChange={(e) => handleProvider(e)}
                        />
                    </div>
                    <div className="col-md-3">
                        <FieldForm
                            label="Email"
                            type="email"
                            name='email'
                            value={provider.email}
                            onChange={(e) => handleProvider(e)}
                        />
                    </div>

                    {
                        (provider.companyType === 'PERSON') ? (
                            <>
                                <div className="col-md-3">
                                    <FieldForm
                                        label="CPF"
                                        type="text"
                                        name="cpf"
                                        value={provider.cpf}
                                        onChange={(e) => handleProvider(e)}
                                    />
                                </div>
                            </>
                        ) : (
                            provider.companyType === 'COMPANY' && (
                                <>
                                    <div className="col md 3">
                                        <FieldForm
                                            label="CNPJ"
                                            type="text"
                                            name="cnpj"
                                            value={provider.cnpj}
                                            onChange={(e) => handleProvider(e)}
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <FieldForm
                                            label="Razão Social"
                                            type="text"
                                            name="razaoSocial"
                                            value={provider.razaoSocial}
                                            onChange={(e) => handleProvider(e)}
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <FieldForm
                                            label="Fantasy Name"
                                            type="text"
                                            name="fantasyName"
                                            value={provider.fantasyName}
                                            onChange={(e) => handleProvider(e)}
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <FieldForm
                                            label="Inscrição Estadual"
                                            type="text"
                                            name="inscricaoEstadual"
                                            value={provider.inscricaoEstadual}
                                            onChange={(e) => handleProvider(e)}
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <FieldForm
                                            label="Contact Name"
                                            type="text"
                                            name="contactName"
                                            value={provider.contactName}
                                            onChange={(e) => handleProvider(e)}
                                        />
                                    </div>
                                </>

                            )
                        )
                    }

                    <div className="col-md-3">
                        <FieldForm
                            label="Phone"
                            type="text"
                            name="phone"
                            value={provider.phone}
                            onChange={(e) => handleProvider(e)}
                        />
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-12">
                        <FieldForm
                            label="Other Informations"
                            type="textarea"
                            rows={5}
                            name="otherInformations"
                            value={provider.otherInformations}
                            onChange={(e) => handleProvider(e)}
                        />
                    </div>
                </div>

            </>

        </>
    );
}

export default OthersInformationsData;
