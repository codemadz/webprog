import { useState } from 'react';
import ExtraSelection from './ExtraSelection';
import SelectIngredient from './SelectIngredient';

function ComposeSalad({inventory, salads, setSalads}) {
  const [foundation, setFoundation] = useState({});
  const [protein, setProtein] = useState({});
  const [extra, setExtra] = useState([]);
  const [dressing, setDressing] = useState({});

  const foundationList = Object.keys(inventory).filter(name => inventory[name].foundation)
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .map(name => {
    return <option key={name} value={name}>{name}, {inventory[name].price}kr</option>
  });

  function handleFoundationChange(event) {
   setFoundation(event.target.value);
  }

  const proteinList = Object.keys(inventory).filter(name => inventory[name].protein)
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .map(name => {
    return <option key={name} value={name}>{name}, {inventory[name].price}kr</option>
  });

  function handleProtein(event){
    setProtein(event.target.value);
  }

  const dressingList = Object.keys(inventory).filter(name => inventory[name].dressing)
    .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
    .map(name => {
        return <option key={name} value={name}>{name}, {inventory[name].price}kr</option>
    });

  function handleDressingChange(event){
        setDressing(event.target.value);
  }

  const createSalad = () => {
    const salad = {
      foundation,
      protein,
      ...extra,
      dressing
    }
    setSalads([...salads, salad]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createSalad();
    setFoundation({});
    setProtein({});
    setExtra([]);
    setDressing({});
    alert('Sallad tillagd i varukorgen!');
  }

  return (
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2> 
        <form onSubmit={handleSubmit}>
          <fieldset className="col-md-12">
          <SelectIngredient label="Bas" onChange={handleFoundationChange} value={foundation} options={foundationList}/>
          <SelectIngredient label="Protein" onChange={handleProtein} value={protein} options={proteinList}/>
          <ExtraSelection inventory={inventory} extra={extra} setExtra={setExtra}/>
          <SelectIngredient label="Dressing" onChange={handleDressingChange} value={dressing} options={dressingList}/>
          <button type="submit" className="btn btn-primary mt-4">Beställ</button>
          </fieldset>
        </form>
      </div>
  );
}
export default ComposeSalad;