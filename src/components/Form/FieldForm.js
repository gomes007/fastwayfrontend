const FieldForm = ({label, name, type, value, options, onChange, rows, error, onRemove, previews}) => {
    return (
        <div className="form-group">
            {type === 'textarea' ? (
                <>
                    <label htmlFor={name}>{label}</label>
                    <textarea
                        className="form-control"
                        id={name}
                        name={name}
                        value={value}
                        rows={rows}
                        onChange={onChange}
                    />
                </>
            ) : type === 'select' ? (
                <>
                    <label htmlFor={name}>{label}</label>
                    <select
                        className="form-select"
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                    >
                        {options.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        })}
                    </select>
                </>
            ) : type === 'checkbox' ? (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={name}
                        name={name}
                        value={value}
                        checked={value}
                        onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor={name}>
                        {label}
                    </label>
                </div>
            ) : type === 'radio' ? (
                <>
                    <label className="d-block mb-0">{label}</label>
                    <div className="d-flex border gap-md-2 form-control">
                        {options.map((option, index) => (
                            <div key={index} className="form-check ">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id={`${name}_${index}`}
                                    name={name}
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={onChange}
                                />
                                <label className="form-check-label" htmlFor={`${name}_${index}`}>
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </>
            ) : type === 'file' ? (
                <>
                    <div className="image-container form-control">
                        {Array.isArray(previews) && previews.map((preview, index) => (
                            <div className="img" key={index}>
                                {preview && <img src={preview} alt="Selected file" />}
                                <label
                                    type="button"
                                    onClick={() => onRemove(index)}
                                    className="file-upload-label remove-img-button"
                                >
                                    Remove
                                </label>
                            </div>
                        ))}
                        <div className="file-actions">
                            <input
                                type="file"
                                id={name}
                                name={name}
                                onChange={onChange}
                                style={{ display: "none" }}
                                multiple
                            />
                            <label type='button' htmlFor={name} className="file-upload-label">
                                {value ? "Change files" : "Select files"}
                            </label>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <label htmlFor={name}>{label}</label>
                    <input
                        className="form-control"
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                    />
                </>
            )}
            {error && <span className="text-danger">{error}</span>}
        </div>
    );
};

export default FieldForm;
