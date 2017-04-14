import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from "ionic-angular";

import { RecipeModel } from "../../models/recipe";
import { EditRecipe } from "../edit-recipe/edit-recipe";
import { ShoppingListService } from "../../services/shopping-list";
import { RecipesService } from "../../services/recipes";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})

export class Recipe implements OnInit {
    recipe: RecipeModel;
    index: number;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,  // To retrieve recipe data
        private slService: ShoppingListService,
        private recipesService: RecipesService
    ) {

    }

    ngOnInit() {
        this.recipe = this.navParams.get("recipe");
        this.index = this.navParams.get("index");
    }

    onEditRecipe() {
        this.navCtrl.push(EditRecipe, {mode: "Edit", recipe: this.recipe, index: this.index});
    }

    onAddIngredients() {
        this.slService.addItems(this.recipe.ingredients);
    }

    onDeleteRecipe() {
        this.recipesService.removeRecipe(this.index);
        this.navCtrl.popToRoot();
    }

}
