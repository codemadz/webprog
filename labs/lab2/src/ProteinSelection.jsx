import SelectIngredient from "./SelectIngredient";

function ProteinSelection({ inventory, protein, setProtein }) {

    const proteinList = Object.keys(inventory).filter(name => inventory[name].protein)
      .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
      .map(name => {
        return <option key={name} value={name}>{name}, {inventory[name].price}kr</option>
      });

    function handleProtein(event){
      setProtein(event.target.value);
    }
  
    return (
        <div>
          <SelectIngredient label="Protein" onChange={handleProtein} value={protein} options={proteinList}/>
        </div>
    );
  }
  
  export default ProteinSelection;