const FieldForm = ({ label, name, type, value, options, onChange, error }) => {
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
              onChange={onChange}
            />
          </>
        ) : type === 'select' ? (
          <>
            <label htmlFor={name}>{label}</label>
            <select
              className="form-control"
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
