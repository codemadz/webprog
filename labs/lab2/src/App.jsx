import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import { useState } from 'react';
import ViewOrder from './ViewOrder';

function App() {

  const [salads, setSalads] = useState([]);
  return (
    <div className="container-fluid h-100 w-100 d-flex flex-column m-2">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Salladsbaren deluxe</span>
      </header>

      <div className="row flex-grow-1 align-items-center justify-content-center m-2">
        <div className="col-12 mb-2">
          <ViewOrder inventory={inventory} salads={salads} />
        </div>
        <div className="col-12 mt-2">
          <ComposeSalad inventory={inventory} salads={salads} setSalads={setSalads} />
        </div>
      </div>

      <footer className="pb-2 pt-2 mt-2 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;