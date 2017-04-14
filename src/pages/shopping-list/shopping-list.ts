import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../models/ingredient";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})

export class ShoppingList {
    listItems: Ingredient[];

    constructor(
        private shoppingService: ShoppingListService
    ) {

    }

    // Always want the page to load, even if cached, so using ionViewWillEnter
    ionViewWillEnter() {
        this.loadItems();
    }

    onAddItem(form: NgForm) {
        this.shoppingService.addItem(form.value.ingredientName, form.value.amount);
        form.reset(); // Empty input fields and reset validation state of the form
        this.loadItems(); // Get the latest version of the list
    }

    onRemoveItem(index: number) {
        this.shoppingService.removeItem(index);
        this.loadItems();
    }

    private loadItems() {
        this.listItems = this.shoppingService.getItems();
    }

}
