import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function App() {

  const [salads, setSalads] = useState([]);
  
  const createShoppingBasket = (salads, inventory) => {
    return salads.map((salad) => {
      let totalPrice = 0;
      let ingredient = {};
      let name = '';
      const saladString = Object.entries(salad)
        .map(([key, value]) => {
          if (key === 'foundation' || key === 'protein' || key === 'dressing') {
            ingredient = inventory[value];
            name = value.toString();
          } else {
            ingredient = inventory[key];
            name = key.toString();
          }
          if (ingredient && ingredient.price !== undefined) {
            totalPrice += ingredient.price;
          }
          return name;
        })
        .join(', ');
  
      return {
        saladString,
        totalPrice
      };
    });
  };

  const shoppingBasket = createShoppingBasket(salads, inventory);


  return (
    <div className="container-fluid m-2 full-height">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Salladsbaren deluxe</span>
      </header>
      <Navbar />
      <Outlet context={{ inventory, salads, setSalads, shoppingBasket }}/>
      <footer className="pb-2 pt-2 mt-2 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;