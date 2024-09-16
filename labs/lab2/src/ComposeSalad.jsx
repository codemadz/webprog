import { useState } from 'react';
import FoundationSelection from './FoundationSelection';
import ProteinSelection from './ProteinSelection';
import ExtraSelection from './ExtraSelection';
import DressingSelection from './DessingSelection';

function ComposeSalad({inventory, salads, setSalads}) {
  const [foundation, setFoundation] = useState({});
  const [protein, setProtein] = useState({});
  const [extra, setExtra] = useState([]);
  const [dressing, setDressing] = useState({});

  const createSalad = () => {
    const salad = {
      foundation,
      protein,
      ...extra,
      dressing
    }
    setSalads([...salads, salad]);
  }

  const validateForm = () => {
    if (Object.keys(foundation).length === 0) {
      alert('Välj en bas');
      return false;
    }
    if (Object.keys(protein).length === 0) {
      alert('Välj ett protein');
      return false;
    }
    if (Object.keys(extra).length < 2) {
      alert('Välj minst två tillbehör');
      return false;
    }
    if (Object.keys(dressing).length === 0) {
      alert('Välj en dressing');
      return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm()) {
      alert('Sallad tillagd i varukorgen!'), console.log(foundation, protein, extra, dressing);
      createSalad();
      setFoundation({});
      setProtein({});
      setExtra([]);
      setDressing({});
    }
  }

  return (
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <fieldset className="col-md-12">
        <FoundationSelection inventory={inventory} foundation={foundation} setFoundation={setFoundation}/>
        <ProteinSelection inventory={inventory} protein={protein} setProtein={setProtein}/>
        <ExtraSelection inventory={inventory} extra={extra} setExtra={setExtra}/>
        <DressingSelection inventory={inventory} dressing={dressing} setDressing={setDressing}/>
        <button type="submit" className="btn btn-primary mt-4" onClick={handleSubmit}>Beställ</button>
        </fieldset>
      </div>
  );
}
export default ComposeSalad;