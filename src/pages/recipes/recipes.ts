import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

import { EditRecipe } from "../edit-recipe/edit-recipe";
import { RecipeModel } from "../../models/recipe";
import { RecipesService } from "../../services/recipes";
import { Recipe } from "../recipe/recipe";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})

export class Recipes {
    recipes: RecipeModel[];

    constructor (
        private navCtrl: NavController,
        private recipesService: RecipesService
    ) {

    }

    ionViewWillEnter() {
        this.recipes = this.recipesService.getRecipes();
    }

    onNewRecipe() {
        this.navCtrl.push(EditRecipe, {mode: "New", })
    }

    onLoadRecipe(recipe: RecipeModel, index: number) {
            this.navCtrl.push(Recipe, {recipe: recipe, index: index});
    }

}
