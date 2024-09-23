import { useEffect, useState } from 'react';
import ExtraSelection from './ExtraSelection';
import SelectIngredient from './SelectIngredient';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Salad from './Salad';

function ComposeSalad() {
  const { inventory, shoppingCart, setShoppingCart } = useOutletContext();
  const [success, setSuccess] = useState(false);
  const [foundation, setFoundation] = useState({});
  const [protein, setProtein] = useState({});
  const [extra, setExtra] = useState([]);
  const [dressing, setDressing] = useState({});
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

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
    const extras = Object.keys(extra).filter((n) => extra[n]);
    const ingredients = [foundation, protein, ...extras, dressing]
    const salad = new Salad();
    ingredients.forEach((ingredient) =>
      salad.add(ingredient, inventory[ingredient])
    );

    setShoppingCart([...shoppingCart, salad]);
  }

  const handleSubmit = (event) => {
    if(!event.target.checkValidity()){
      event.preventDefault();
      setTouched(true);
      setSuccess(false);
    } else {
      event.preventDefault();
      setTouched(false);
      createSalad();
      setFoundation({});
      setProtein({});
      setExtra([]);
      setDressing({});
      setSuccess(true);
    }
  }

  useEffect(() => {
    if(success){
      const orderId = uuidv4();
      alert(`Din sallad är tillagd i varukorgen. Id: ${orderId}`);
      navigate(`/view-order/confirm/${orderId}`);
    }
  }, [success]);

  return (
      <div className="row h-200 mb-2 mt-2 p-4 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2> 
        <form onSubmit={handleSubmit} noValidate className={touched ? "was-validated" : ""}>
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