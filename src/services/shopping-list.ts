import { Ingredient } from "../models/ingredient";

export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }
    // addItem(ingredients: Ingredient[]) {
    //     this.ingredients.push(...ingredients);
    // }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);  // ... to deconstruct the array into individual elements so have a list of elements instead of an array of elements
    }

    getItems() {
        return this.ingredients.slice(); // Adding .slice() returns a copy of the array instead of full reference
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1)
    }
}
