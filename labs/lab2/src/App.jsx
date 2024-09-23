import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';
import BootstrapSpinner from './BootstrapSpinner';
import inventoryLoader from './loaders';
import Salad from './Salad';

function App() {

  const [shoppingCart, setShoppingCart] = useState(() => {
    const savedCart = window.localStorage.getItem('shoppingCart');
    return savedCart ? Salad.parse(savedCart) : [];
  });
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const loading = navigation.state === 'loading';

  useEffect(() => {
    inventoryLoader().then((ingredientGroups) =>
      ingredientGroups.reduce((prev, curr) => ({ ...prev, ...curr }))
    )
    .then((allIngredients) => setInventory(allIngredients));  
  }, []);

  useEffect(() => {
    window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }, [shoppingCart]);
  
  return (
    <div className="container-fluid h-100 w-100 d-flex flex-column m-2">
      <header className="p-3 mb-4 bg-white border-bottom fixed-top d-flex justify-content-between align-items-center">
        <span className="fs-4">Salladsbaren deluxe</span>
        <Navbar />
      </header>
      {loading ? (
          <BootstrapSpinner />
      ) : (
        <Outlet context={{ inventory, shoppingCart, setShoppingCart, showModal, setShowModal }} />
      )}
      <footer className="p-2 mt-2 bg-white text-muted border-top fixed-bottom">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;