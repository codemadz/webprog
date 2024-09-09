'use strict';
/**
 * Reflection question 1
 * your answer goes here
 * 
 * The absense of a property basically means it is set to false.
 */

import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * 
 * The "Object.keys()" returns an array of the object's own enumerable property names.
 * It does not include inherited properties from the object's prototype chain.
 * forEach() is then used to iterate over this array, 
 * meaning it only works on properties directly present on the object.
 * 
 * "for...in" iterates over ALL enumerable properties, including both 
 * the object's own properties and any inherited enumerable properties from its prototype chain.
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
 
 const filteredIngredients = Object.keys(inv) //Gets the keys of the inventory object
 .filter(name => inv[name][prop]) //Filters out the ingredients that have the "prop"
 .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' })); //Sorts the ingredients alphabetically

 const options = filteredIngredients.map(name => { //Maps the ingredients to an option element
  const price = inv[name].price; //Gets the price of the ingredient
  return `<option value=${name} key=${name}> ${name}, ${price}kr</option>` //Returns the option element with the name and price
 });


return options;
}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {

  static instanceCounter = 0;

  constructor(arg) {
    this.id = 'salad_' + Salad.instanceCounter++;
    this.uuid = uuidv4();

    if (arg instanceof Salad) {
      this.ingredients = { ...arg.ingredients };
    } else {
      this.ingredients = {};
    }
  }
  add(name, properties) {
    this.ingredients[name] = properties; //Adds the name and properties to this ingredients object
    return this; //Returns the object for chainability
  }
  remove(name) {
    delete this.ingredients[name]; //Deletes the name and its properties in this ingredients object
    return this; //Returns the object for chainability
  }
  static parse(s) {
    if (typeof s !== 'string') { //Checks if the input is a string
      return console.log('Input is not a string');
    }

    const data = JSON.parse(s); //Parses the string to a JSON object

    if (Array.isArray(data)) { //Checks if the data is an array
      return data.map(saladInArray => {
        const salad = new Salad(); //Creates a new Salad object
        salad.ingredients = { ...saladInArray.ingredients }; //Copies the ingredients to the salad using the spread operator
        salad.uuid = saladInArray.uuid; //Preserves the uuid
        return salad;
      });
    } else {
      const salad = new Salad(); //Creates a new Salad
      salad.ingredients = { ...data.ingredients }; //Copies the ingredients to the salad
      salad.uuid = data.uuid; //Preserves the uuid
      return salad; //Returns the salad
    }
  }
}

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function() {
  return Object.values(this.ingredients) //Gets the values of the ingredients object
  .reduce((total, ingredients) => total + ingredients.price, 0); //Calculates the total price of the ingredients in the Salad
}

Salad.prototype.count = function(property) {
  return Object.values(this.ingredients) //Gets the values of the ingredients object
  .filter(ingredients => ingredients[property]) //Filters out the ingredients that have the property
  .length; //Returns the length of the filtered array
}

console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
//En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
//En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
//En ceasarsallad har 3 tillbehör

console.log('\n--- reflection question 3 ---------------------------------------')
/* Only functions (in this case Salad) have a prototype property.
This property holds the methods and properties shared by all instances created by that constructor.
Instances have an internal link to the prototype object of their constructor.
This forms the prototype chain, which is then used for inheritance.
A class is a constructor function with syntactic sugar, meaning it is easier for us to read while not changing the
prototype based inheritance model of JS.
*/
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\n--- Assignment 4 ---------------------------------------')

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

class GourmetSalad extends Salad {
  add(name, properties, size = 1) {
    const propertiesWithSize = { ...properties, size }; //Copies the properties and adds the size
    if (this.ingredients[name]) { //Checks if the ingredient already exists
      this.ingredients[name].size += size;  //Adds the size to the existing ingredient
    } else {
      this.ingredients[name] = propertiesWithSize; //Adds the ingredient to the ingredients object
    }
    return this;
  }

  getPrice() {
    return Object.values(this.ingredients).reduce((total, ingredient) => { //Gets the values of the ingredients object
      return total + ingredient.price * ingredient.size; //Calculates the total price of the ingredients in the Salad
    }, 0) //Initial value of the total
  }
}

let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

/**
 * Reflection question 4
 * Salad.instanceCounter is stored in the Salad class,
 * not in an instance of the class.
 */
/**
 * Reflection question 5
 * Yes, you can make the id property read-only.
 */
/**
 * Reflection question 6
 * Properties can be made private using the # prefix.
 */
