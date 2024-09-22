import { useId } from "react"

function SelectIngredient({ label, onChange, value, options }) {

    const id = useId();
    return (
      <fieldset className="col-md-12">
        <label htmlFor={id} className="form-label mt-2">{label}</label>
        <select required onChange={onChange} value={value} className="form-select" id={id}>
            <option value="">Välj {label}</option>
            {options}
        </select>
        <div className="invalid-feedback">Vänligen välj {label}.</div>
      </fieldset>
); }

export default SelectIngredient;