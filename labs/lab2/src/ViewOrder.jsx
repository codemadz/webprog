import { useOutletContext } from "react-router-dom";
import OrderModal from "./OrderModal";
import { useState } from "react";

function ViewOrder() {
    const { shoppingCart, setShoppingCart, showModal, setShowModal } = useOutletContext();
    const [orderDetails, setOrderDetails] = useState({});

    const makeOrder = function () {
      const url = "http://localhost:8080/orders/";
      let orderItems = shoppingCart.map((salad) =>
        Object.keys(salad.ingredients)
      );
      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderItems),
      });
    };

    function validateOrder(){
      makeOrder()
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then((res) => {
          setOrderDetails(res);
          setShowModal(true);
          setShoppingCart([]);
      });
    }

    function clearShoppingCart() {
      window.localStorage.removeItem("shoppingCart");
      setShoppingCart([]);
    }

    return (
      <div>
      <div className="w-100 h-100 mb-1 mt-4 pt-5 p-4 bg-light border rounded-3" style={{ minHeight: '60vh', minWidth: '100vh'}}>
        <h2>Varukorgen</h2>
        <div className="p-2 mt-3 border rounded-2">
        <OrderModal orderDetails={orderDetails} showModal={showModal} setShowModal={setShowModal} />
        {shoppingCart.length === 0 ? (
          <p className="mt-3" type="text">Varukorgen är just nu tom.</p>
        ) : (
          shoppingCart.map((salad, index) => (
            <div key={index}>
              <p className="form-control w-100 h-25 align-content-center" type="text">{`${Object.keys(salad.ingredients).join(", ")}, Pris: ${salad.getPrice()}kr`}</p>
            </div>
            
          ))
        )}
        </div>
        <div>
          <p className="mt-2 fw-bold">Totalt pris: {shoppingCart.reduce((acc, salad) => acc + salad.getPrice(), 0)}kr</p>
        </div>
      </div>
        {shoppingCart.length !== 0 && (
          <div>
          <button onClick={validateOrder} className="btn btn-primary mb-4 mt-4 m-2">Beställ</button>
          <button onClick={clearShoppingCart} className="btn btn-primary mb-4 mt-4 m-2">Rensa varukorg</button>  
          </div>
        )}
      </div>
    );
  }
  
  export default ViewOrder;

   