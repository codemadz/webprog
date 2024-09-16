import SelectIngredient from "./SelectIngredient";

function FoundationSelection({ inventory, foundation, setFoundation }) {

  const foundationList = Object.keys(inventory).filter(name => inventory[name].foundation)
    .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
    .map(name => {
      return <option key={name} value={name}>{name}, {inventory[name].price}kr</option>
    });

  function handleFoundationChange(event) {
    setFoundation(event.target.value);
  }

  return (
    <div>
          <SelectIngredient label="Bas" onChange={handleFoundationChange} value={foundation} options={foundationList}/>
    </div>
  );
}

export default FoundationSelection;