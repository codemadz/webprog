export default async function inventoryLoader() {

  const inventory = await Promise.all([
    fetchCategory("foundations"),
    fetchCategory("proteins"),
    fetchCategory("dressings"),
    fetchCategory("extras"),
  ]);
  await new Promise(resolve => setTimeout(resolve, 500));
  return inventory;
}

function fetchCategory(category) {
  let url = `http://localhost:8080/${category}/`;
  return safeFetchJson(url)
    .then((names) => {
      let ingredients = names.map((name) => fetchIngredient(url, name));
      return Promise.all(ingredients).then((p) =>
        p.reduce(
          (prev, current, index) => ({ ...prev, [names[index]]: current }),
          {}
        )
      );
    });
};

function fetchIngredient(url, ingredient) {
  return safeFetchJson(url + ingredient);
};

function safeFetchJson(url) {
  return fetch(url)
  .then(response => {
     if(!response.ok) {
         throw new Error(`${url} returned status ${response.status}`);
     }
  return response.json();
  });
}


