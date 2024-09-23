import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';
import BootstrapSpinner from './BootstrapSpinner';
import inventoryLoader from './loaders';

function App() {

  const [shoppingCart, setShoppingCart] = useState([]);
  const [inventory, setInventory] = useState([]);
  const navigation = useNavigation();
  const loading = navigation.state === 'loading';

  useEffect(() => {
    inventoryLoader().then((ingredientGroups) =>
      ingredientGroups.reduce((prev, curr) => ({ ...prev, ...curr }))
    )
    .then((allIngredients) => setInventory(allIngredients));  
  }, []);
  
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

  const shoppingBasket = createShoppingBasket(shoppingCart, inventory);

  return (
    <div className="container-fluid h-100 w-100 d-flex flex-column m-2">
      <header className="p-3 mb-4 bg-white border-bottom fixed-top d-flex justify-content-between align-items-center">
        <span className="fs-4">Salladsbaren deluxe</span>
        <Navbar />
      </header>
      {loading ? (
        <BootstrapSpinner />
      ) : (
        <Outlet context={{ inventory, shoppingCart, setShoppingCart, shoppingBasket }} />
      )}
      <footer className="p-2 mt-2 text-muted border-top fixed-bottom">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;