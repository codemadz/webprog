import { useOutletContext } from "react-router-dom";

function ViewOrder() {
    const { shoppingBasket } = useOutletContext();

    return (
      <div className="row h-200 m-2 p-5 bg-light border rounded-3">
        <h2>Varukorgen</h2>
        {shoppingBasket.map((item, index) => (
          <div key={index}>
            <input className="form-control" type="text" value={`${item.saladString}, Pris: ${item.totalPrice}kr`} readOnly />
          </div>
        ))}
      </div>
    );
  }
  
  export default ViewOrder;