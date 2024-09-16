import SelectIngredient from "./SelectIngredient";

function DressingSelection({inventory, dressing, setDressing}){

    const dressingList = Object.keys(inventory).filter(name => inventory[name].dressing)
    .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
    .map(name => {
        return <option key={name} value={name}>{name}, {inventory[name].price}kr</option>
    });

    function handleDressingChange(event){
        setDressing(event.target.value);
    }

    return(
        <div>
          <SelectIngredient label="Dressing" onChange={handleDressingChange} value={dressing} options={dressingList}/>
        </div>
    );
}

export default DressingSelection;