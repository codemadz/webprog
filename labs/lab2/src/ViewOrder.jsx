import { useOutletContext } from "react-router-dom";

function ViewOrder() {
    const { shoppingCart } = useOutletContext();

    return (
      <div className="w-100 h-100 mb-2 mt-2 p-4 bg-light border rounded-3" style={{ minHeight: '75vh', minWidth: '100vh'}}>
        <h2>Varukorgen</h2>
        <div className="p-2 border rounded-2">
        {shoppingCart.length === 0 ? (
          <p type="text">Varukorgen är just nu tom.</p>
        ) : (
          shoppingCart.map((salad, index) => (
            <div key={index}>
              <p className="form-control w-100 h-25 align-content-center" type="text">{`${Object.keys(salad.ingredients).join(", ")}, Pris: ${salad.getPrice()}kr`}</p>
            </div>
          ))
        )}
        </div>
      </div>
    );
  }
  
  export default ViewOrder;