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
    <div className="container-fluid h-100 w-100 d-flex flex-column m-2">
      <header className="p-3 mb-4 bg-white border-bottom fixed-top d-flex justify-content-between align-items-center">
        <span className="fs-4">Salladsbaren deluxe</span>
        <Navbar />
      </header>
      <Outlet context={{ inventory, salads, setSalads, shoppingBasket }}/>
      <footer className="p-2 mt-2 text-muted border-top fixed-bottom">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;