
function ExtraSelection({ inventory, extra, setExtra }) {
  const extras = Object.keys(inventory)
    .filter(name => inventory[name].extra)
    .sort((a, b) => a.localeCompare(b, 'sv', { sensitivity: 'case' }))
    .map((name, index) => {
      return (
        <div key={name} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={name}
            name={name}
            checked={extra[name] || false}
            onChange={handleExtraChange}
          />
          <label className="form-check-label" htmlFor={name}>
            {name}, {inventory[name].price}kr
          </label>
        </div>
      );
    });

  function handleExtraChange(event) {
    const name = event.target.name;
    const checked = event.target.checked;
    const newExtras = { ...extra };
    
    if (checked) {
      newExtras[name] = true;
    } else {
      delete newExtras[name];
    }
      setExtra(newExtras);
    }

  const columns = [];
  for (let i = 0; i < extras.length; i += 7) {
    columns.push(
      <div className="col" key={i}>
        {extras.slice(i, i + 7)}
      </div>
    );
  }

  return (
    <fieldset>
      <div className="row pt-2">
        {columns}
      </div>
    </fieldset>
  );
}

export default ExtraSelection;