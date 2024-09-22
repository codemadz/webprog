function ViewOrder({ inventory, salads }) {
    return (
      <div className="row h-100 p-5 bg-light border rounded-3">
        <h2>Varukorgen</h2>
        {salads.map((salad, index) => {
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
  
          return (
            <div key={index}>
              <input className="form-control" type="text" value={`${saladString}, Pris: ${totalPrice}kr`} readOnly />
            </div>
          );
        })}
      </div>
    );
  }
  
  export default ViewOrder;