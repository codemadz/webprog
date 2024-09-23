import { useEffect, useState } from 'react';
import ExtraSelection from './ExtraSelection';
import SelectIngredient from './SelectIngredient';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Salad from './Salad';
import CartModal from './CartModal';

function ComposeSalad() {
  const { inventory, shoppingCart, setShoppingCart, showModal, setShowModal } = useOutletContext();
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();
  const [saladId, setSaladId] = useState("");
  const [modalClosed, setModalClosed] = useState(false);

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [extra, setExtra] = useState({});
  const [dressing, setDressing] = useState("");

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
    setSaladId(salad.uuid);
    setShoppingCart([...shoppingCart, salad]);
  }

  const clearForm = () => {
    setTouched(false);
    setFoundation("");
    setProtein("");
    setExtra({});
    setDressing("");
  }

  const handleSubmit = (event) => {
    if(!event.target.checkValidity()){
      event.preventDefault();
      setTouched(true);
      setSuccess(false);
    } else {
      event.preventDefault();
      setShowModal(true);
      setTouched(false);
      createSalad();
      clearForm();
      setSuccess(true);
    }
  }

  useEffect(() => {
    if(success && modalClosed){
      navigate(`/view-order/confirm/${saladId}`);
    }
  }, [success, modalClosed]);

  function handleModalClosed(){
    setShowModal(false);
    setModalClosed(true);
  }

  return (
      <div className="row h-200 mb-2 mt-2 p-4 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2> 
        <CartModal saladId={saladId} showModal={showModal} setShowModal={handleModalClosed} />
        <form onSubmit={handleSubmit} onReset={clearForm} noValidate className={touched ? "was-validated" : ""}>
          <fieldset className="col-md-12">
          <SelectIngredient label="Bas" onChange={handleFoundationChange} value={foundation} options={foundationList}/>
          <SelectIngredient label="Protein" onChange={handleProtein} value={protein} options={proteinList}/>
          <ExtraSelection inventory={inventory} extra={extra} setExtra={setExtra}/>
          <SelectIngredient label="Dressing" onChange={handleDressingChange} value={dressing} options={dressingList}/>
          <button type="submit" className="btn btn-primary mt-4 m-2">Lägg till i varukorgen</button>
          <button type="reset" className="btn btn-primary mt-4 m-2">Rensa</button>
          </fieldset>
        </form>
      </div>
  );
}
export default ComposeSalad;