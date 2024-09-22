import { useOutletContext } from "react-router-dom";

function ViewOrder() {
    const { shoppingBasket } = useOutletContext();

    return (
      <div className="w-100 h-100 mb-2 mt-2 p-4 bg-light border rounded-3" style={{ minHeight: '75vh', minWidth: '100vh'}}>
        <h2>Varukorgen</h2>
        <div className="p-2 border rounded-2">
        {shoppingBasket.length === 0 ? (
          <p type="text">Varukorgen är just nu tom.</p>
        ) : (
          shoppingBasket.map((item, index) => (
            <div key={index}>
              <p className="form-control w-100 h-25 align-content-center" type="text">{`${item.saladString}, Pris: ${item.totalPrice}kr`}</p>
            </div>
          ))
        )}
        </div>
      </div>
    );
  }
  
  export default ViewOrder;